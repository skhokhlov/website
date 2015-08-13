var fs = require('fs');
var http = require('http');
var express = require('express');

var app = express();
var yr = require('./node_modules/yate/lib/runtime.js');
require('./build/app/app.yate.js');

app.set('port', 3000 || process.env.PORT);

app.get('/books', function (req, res) {
    fs.readFile('./build/bundles/feeds/books.json', {encoding: 'utf-8'}, function (err, data) {
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
        }))
    });
});

app.get('/books/:book', function (req, res) {
    fs.readFile('./build/bundles/feeds/books/' + req.params.book + '.md.json', {encoding: 'utf-8'}, function (err, data) {
        if (err) {
            return res.status(404).send('404');
        }

        res.send(JSON.parse(data).pageContent);
    });
});

http.createServer(app).listen(app.get('port'), function () {
    console.info('DEBUG environment is set to ' +
    (Boolean((process.env.DEBUG === 'true') || (process.env.DEBUG == null))));
    console.log('Server listening on port ' + app.get('port'));
});
