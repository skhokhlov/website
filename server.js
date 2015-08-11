var fs = require('fs');
var http = require('http');
var express = require('express');
var app = express();

app.set('port', 3000 || process.env.PORT);

app.get('/books', function (req, res) {
    fs.readFile('./build/feeds/books.json', {encoding: 'utf-8'}, function (err, data) {
        if (err) {
            return res.status(404).send('404');
        }

        var feed = JSON.parse(data);

        res.send(feed.pageContent)
    });
});

app.get('/books/:book', function (req, res) {
    fs.readFile('./build/feeds/books/' + req.params.book + '.md.json', {encoding: 'utf-8'}, function (err, data) {
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
