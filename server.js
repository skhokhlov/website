'use strict';

var fs = require('fs');
var http = require('http');
var express = require('express');

var app = express();
var yr = require('./node_modules/yate/lib/runtime.js');
require('./build/app/app.yate.js');

var counter = '<script> (function (d, w, c) { (w[c] = w[c] || []).push(function() { ' +
    'try { w.yaCounter28136448 = new Ya.Metrika({ ' +
    'id:28136448, ' +
    'clickmap:true, ' +
    'trackLinks:true, ' +
    'accurateTrackBounce:true, ' +
    'webvisor:true, ' +
    'trackHash:true ' +
    '}); } catch(e) { } }); ' +
    'var n = d.getElementsByTagName("script")[0], ' +
    's = d.createElement("script"), ' +
    'f = function () { n.parentNode.insertBefore(s, n); }; ' +
    's.type = "text/javascript"; ' +
    's.async = true;' +
    's.src = "https://mc.yandex.ru/metrika/watch.js"; ' +
    'if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } ' +
    '})(document, window, "yandex_metrika_callbacks");' +
    '</script>' +
    '<noscript><img src="https://mc.yandex.ru/watch/28136448" style="position:absolute; left:-9999px;" /></noscript>';

app.use('/public', express.static(__dirname + '/build/app', {
    index: false,
    // maxAge: ((process.env.DEBUG === 'false') ? 15552000000 : 15000)
}));

app.use('/images', express.static(__dirname + '/images', {
    index: false,
    maxAge: ((process.env.DEBUG === 'false') ? 60480000 : 180000)
}));

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.OPENSHIFT_PORT ||
process.env.VCAP_APP_PORT || process.env.PORT || 3000);

app.get('/robots.txt', function (req, res) {
    res.status(200).sendFile(__dirname + '/app/robots.txt');
});

app.get('/feed/:feed/:book', function (req, res) {
    fs.readFile(__dirname + '/build/bundles/feeds/' + req.params.feed + '/' + req.params.book + '.json',
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
                        body: page.pageContent
                    }
                }
            }));
        });
});

app.get('/', function (req, res) {
    fs.readFile(__dirname + '/build/bundles/pages/index.json', {encoding: 'utf-8'}, function (err, data) {
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
                    footer: true,
                    stat: true
                },
                'page-params': {
                    _page: page.type || 'page',
                    title: page.title
                },
                'page-content': {
                    counter: counter,
                    body: page.pageContent
                }
            }
        }));
    });
});

app.get('/special/:project', function (req, res) {
    fs.readFile(__dirname + '/build/bundles/special/' + req.params.project + '.html',
        {encoding: 'utf-8'}, function (err, data) {
            if (err) {
                return sendError(res);
            }

            res.send(data);
        });
});

app.use(function (req, res) {
    if (req.method === 'GET') {
        fs.readFile(__dirname + '/build/bundles/pages/' + req.path + '.json',
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
                            body: true,
                            footer: true,
                            stat: true
                        },
                        'page-params': {
                            _page: page.type || 'page',
                            title: page.title
                        },
                        'page-content': {
                            counter: counter,
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
    function random(strings) {
        if (Math.random() < 0.5) {
            return strings[0];
        } else {
            return strings[1];
        }
    }

    return res.status(404).send(yr.run('app', {
        page: {
            'page-blocks': {
                header: {
                    logo: true
                },
                body: true,
                footer: true
            },
            'page-params': {
                _page: 'error',
                title: 'Страница не найдена'
            },
            'page-content': {
                body: '<h2 class="title">' +
                random([
                    'Бегите, глупцы!',
                    '&mdash;&nbsp;Будь здесь и&nbsp;сейчас<br/>&mdash;&nbsp;Не&nbsp;сегодня, дорогой'
                ]) +
                '</h2><h1 class="title">Страница не найдена</h1>' +
                '<p>Если вы уверены, что здесь должно что-то быть, ' +
                '<a href="mailto:sergey@skhokhlov.ru" class="link">сообщите мне об этом: sergey@skhokhlov.ru</a>.</p>'
            }
        }
    }));
}
