'use strict';

var fs = require('fs');
var http = require('http');
var express = require('express');

var app = express();
var yr = require('./node_modules/yate/lib/runtime.js');
require('./build/app/app.yate.js');

app.use('/public', express.static(__dirname + '/build/app', {
    index: false,
    // maxAge: ((process.env.DEBUG === 'false') ? 15552000000 : 15000)
}));

app.use('/images', express.static(__dirname + '/images', {
    index: false,
    maxAge: ((process.env.DEBUG === 'false') ? 60480000 : 180000)
}));

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.OPENSHIFT_PORT || process.env.VCAP_APP_PORT || process.env.PORT || 3000);

app.get('/feed/:feed/:book', function (req, res) {
    fs.readFile('./build/bundles/feeds/' + req.params.feed + '/' + req.params.book + '.json',
        {encoding: 'utf-8'}, function (err, data) {
            if (err) {
                return sendError(res);
            }

            var page = JSON.parse(data);

            res.send(yr.run('app', {
                page: {
                    'page-blocks': {
                        header: {
                            logo: true
                        },
                        book: true,
                        footer: true
                    },
                    'page-params': {
                        _page: page.type || 'page',
                        title: page.title,
                        param: page
                    },
                    'page-content': {
                        body: page.pageContent
                    }
                }
            }));
        });
});

app.get('/', function (req, res) {
    fs.readFile('./build/bundles/pages/index.json', {encoding: 'utf-8'}, function (err, data) {
        if (err) {
            return sendError(res);
        }

        var page = JSON.parse(data);

        res.send(yr.run('app', {
            page: {
                'page-blocks': {
                    header: {
                        logo: true
                    },
                    body: true,
                    footer: true
                },
                'page-params': {
                    _page: page.type || 'page',
                    title: page.title
                },
                'page-content': {
                    body: page.pageContent
                }
            }
        }));
    });
});

app.get('/special/:project', function (req, res) {
    fs.readFile('./build/bundles/special/' + req.params.project + '.html',
        {encoding: 'utf-8'}, function (err, data) {
            if (err) {
                return sendError(res);
            }

            res.send(data);
        });
});

app.use(function (req, res) {
    if (req.method === 'GET') {
        fs.readFile('./build/bundles/pages/' + req.path + '.json', {encoding: 'utf-8'}, function (err, data) {
            if (err) {
                return sendError(res);
            }

            var page = JSON.parse(data);

            res.send(yr.run('app', {
                page: {
                    'page-blocks': {
                        header: {
                            logo: true
                        },
                        body: true,
                        footer: true
                    },
                    'page-params': {
                        _page: page.type || 'page',
                        title: page.title
                    },
                    'page-content': {
                        body: page.pageContent
                    }
                }
            }));
        });
    } else {
        sendError(res);
    }

});

http.createServer(app).listen(app.get('port'), function () {
    console.info('DEBUG environment is set to ' +
    (Boolean((process.env.DEBUG === 'true') || (process.env.DEBUG == null))));
    console.log('Server listening on port ' + app.get('port'));
});

function sendError(res) {
    return res.status(404).sendFile(__dirname + '/app/404.html');
}
