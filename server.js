'use strict';

var fs = require('fs');
var http = require('http');
var express = require('express');

var app = express();
var yr = require('./node_modules/yate/lib/runtime.js');
require('./build/app/app.yate.js');

app.set('port', 3000 || process.env.PORT);

app.get('/feed/:feed', function (req, res) {
    fs.readFile('./build/bundles/feeds/' + req.params.feed + '.json', {encoding: 'utf-8'}, function (err, data) {
        if (err) {
            return res.status(404).send('404');
        }

        var feed = JSON.parse(data);

        res.send(yr.run('app', {
            page: {
                'page-blocks': {
                    header: {
                        logo: true,
                        body: true
                    },
                    footer: true
                },
                'page-params': {
                    _page: 'home',
                    title: 'Homepage of World Fly'
                },
                'page-content': {
                    content: feed.pageContent,
                    pages: feed.pages
                }
            }
        }));
    });
});

app.get('/feed/:feed/:book', function (req, res) {
    fs.readFile('./build/bundles/feeds/' + req.params.feed + '/' + req.params.book + '.json',
        {encoding: 'utf-8'}, function (err, data) {
            if (err) {
                return res.status(404).send('404');
            }

            res.send(JSON.parse(data).pageContent);
        });
});

app.get('/:page', function (req, res) {
    fs.readFile('./build/bundles/pages/' + req.params.page + '.json', {encoding: 'utf-8'}, function (err, data) {
        if (err) {
            return res.status(404).send('404');
        }

        var page = JSON.parse(data);

        res.send(yr.run('app', {
            page: {
                'page-blocks': {
                    header: {
                        logo: true,
                        body: true
                    },
                    footer: true
                },
                'page-params': {
                    _page: 'home',
                    title: 'Homepage of World Fly'
                },
                'page-content': {
                    content: page.pageContent
                }
            }
        }));
    });
});

http.createServer(app).listen(app.get('port'), function () {
    console.info('DEBUG environment is set to ' +
    (Boolean((process.env.DEBUG === 'true') || (process.env.DEBUG == null))));
    console.log('Server listening on port ' + app.get('port'));
});
