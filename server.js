'use strict';

const fs = require('fs');
const http = require('http');
const compression = require('compression');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const yr = require('./node_modules/yate/lib/runtime.js');
require('./build/app/app.yate.js');

const hostname = `With love from ${require('os').hostname()} pid=${process.pid}`;
const counter = fs.readFileSync(`${__dirname}/app/counter.html`, 'utf8');

app.set('x-powered-by', false);
app.set('port', process.env.PORT || 3000);

app.use(cookieParser());
app.use(compression());

app.use('/public', express.static(`${__dirname}/build/app`, {
    index: false
}));

app.use('/images', express.static(`${__dirname}/images`, {
    index: false,
    maxAge: ((process.env.NODE_ENV === 'production') ? 60480000 : 180000)
}));

app.use('/api/bundles/feed', express.static(`${__dirname}/build/bundles/feeds`));
app.use('/api/bundles/pages', express.static(`${__dirname}/build/bundles/pages`));

app.get('/robots.txt', (req, res) => res.sendFile(`${__dirname}/app/robots.txt`));

app.get(
    '/feed/:feed/:book',
    (req, res) => fs.readFile(
        `${__dirname}/build/bundles/feeds/${req.params.feed}/${req.params.book}.json`,
        {encoding: 'utf-8'},
        (err, data) => {
            if (err) {
                return sendError(res);
            }

            let page = JSON.parse(data);

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
        }
    )
);

app.get('/', (req, res) => {
    if (req.cookies.lang === 'en') {
        res.redirect('/en');
    } else {
        res.sendFile(`${__dirname}/build/bundles/special/index-2.html`);
    }
});

app.get(
    '/special/:project',
    (req, res) => fs.readFile(
        `${__dirname}/build/bundles/special/${req.params.project}.html`,
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
    `${__dirname}/build/bundles/special/index-en-2.html`,
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
        fs.readFile(`${__dirname}/build/bundles/pages/${req.path}.json`,
            {encoding: 'utf-8'}, (err, data) => {
                if (err) {
                    return sendError(res);
                }

                let page = JSON.parse(data);
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
    console.info(`Debug environment is set to ${!Boolean(process.env.NODE_ENV === 'production')}`);
    console.log(`Server listening on port ${app.get('port')}`);
});

function sendError(res) {
    return res.status(404).sendFile(`${__dirname}/build/bundles/special/404.html`);
}
