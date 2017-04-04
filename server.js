'use strict';

const fs = require('fs');
const http = require('http');
const compression = require('compression');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();
const yr = require('./node_modules/yate/lib/runtime.js');
require('./build/app/app.yate.js');

const hostname = 'With love from ' + require('os').hostname() + ' pid=' + process.pid;
const counter = fs.readFileSync(__dirname + '/app/counter.html', 'utf8');

// docker run --rm -p 27017:27017 --name some-mongo -d mongo
mongoose.connect(process.env.DB || 'mongodb://localhost/test');
let db = mongoose.connection;
db.on('error', (err) => {
    throw new Error(err);
});

let pageSchema = new mongoose.Schema({
    path: String,
    title: String,
    keywords: String,
    pageContent: String,
    type: String
}, {collection: 'Pages'});
let Page = mongoose.model('Page', pageSchema);

let feedsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    name: String,
    title: String
}, {collection: 'Feeds'});
let FeedsModel = mongoose.model('Feeds', feedsSchema);
let feeds;
FeedsModel.find((err, feedsDB) => {
    if (err) {
        throw new Error(err);
    }

    feeds = feedsDB;
});

let feedSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    feedName: String,
    title: String,
    author: String,
    keywords: String,
    image: String,
    date: Date,
    caption: String,
    original: {
        title: String,
        author: String,
        image: String
    },
    name: String,
    pageContent: String,
    type: String
}, {collection: 'FeedPages'});
let Feed = mongoose.model('Feed', feedSchema);

app.set('x-powered-by', false);
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.OPENSHIFT_PORT || process.env.PORT || 3000);

app.use(cookieParser());
app.use(compression());

app.use('/public', express.static(__dirname + '/build/app', {
    index: false,
    // maxAge: ((process.env.DEBUG === 'false') ? 15552000000 : 15000)
}));

app.use('/images', express.static(__dirname + '/images', {
    index: false,
    maxAge: ((process.env.DEBUG === 'false') ? 60480000 : 180000)
}));

app.use('/api/bundles/feed', express.static(__dirname + '/build/bundles/feeds'));
app.use('/api/bundles/pages', express.static(__dirname + '/build/bundles/pages'));

app.get('/robots.txt', (req, res) => res.sendFile(__dirname + '/app/robots.txt'));

app.get(
    '/feed/:feed/:book',
    (req, res) => {
        Feed.findOne({feedName: req.params.feed, name: req.params.book}, (err, page) => {
            if (err || page === null) {
                return sendError(res);
            }

            res.send(yr.run('app', {
                page: {
                    'page-blocks': {
                        header: {
                            logo: true
                        },
                        book: true,
                        footer: true,
                        stat: true
                    },
                    'page-params': {
                        _page: page.type || 'page',
                        title: page.title,
                        param: page
                    },
                    'page-content': {
                        counter: counter,
                        body: page.pageContent,
                        keywords: page.keywords,
                        hostname: hostname
                    }
                }
            }));
        });
    }
);

app.get('/', (req, res) => {
    if (req.cookies.lang === 'en') {
        res.redirect('/en');
    } else {
        res.sendFile(__dirname + '/build/bundles/special/index-2.html');
    }
});

app.get(
    '/special/:project',
    (req, res) => fs.readFile(
        __dirname + '/build/bundles/special/' + req.params.project + '.html',
        {encoding: 'utf-8'},
        (err, data) => {
            if (err) {
                return sendError(res);
            }

            res.send(data);
        }
    )
);
app.get('/plus', (req, res) => res.redirect('/special/plus'));

app.get('/en', (req, res) => fs.readFile(
    __dirname + '/build/bundles/special/index-en-2.html',
    {encoding: 'utf-8'},
    (err, data) => {
        if (err) {
            return sendError(res);
        }

        res.send(data);
    })
);

app.use((req, res) => {
    if (req.method === 'GET') {
        Page.findOne({'path': req.path}, function (err, page) {
            if (err || page === null) {
                return sendError(res);
            }

            res.send(yr.run('app', {
                page: {
                    'page-blocks': {
                        header: {
                            logo: true
                        },
                        body: true,
                        footer: true,
                        stat: true
                    },
                    'page-params': {
                        _page: page.type || 'page',
                        title: page.title,
                        hostname: hostname
                    },
                    'page-content': {
                        counter: `<script>window.ips = '${req.headers['cf-connecting-ip']}';</script>` + counter,
                        body: page.pageContent,
                        keywords: page.keywords
                    }
                }
            }));
        });

    } else {
        sendError(res);
    }

});

http.createServer(app).listen(app.get('port'), () => {
    console.info(
        'DEBUG environment is set to ' +
        (Boolean((process.env.DEBUG === 'true') || (process.env.DEBUG === null)))
    );
    console.log('Server listening on port ' + app.get('port'));
});

function sendError(res) {
    return res.status(404).sendFile(__dirname + '/build/bundles/special/404.html');
}
