var fs = require('fs');
var http = require('http');
var express = require('express');
var app = express();
var marked = require('marked');

var renderer = new marked.Renderer();

renderer.heading = function (text, level) {
    var escapedText = text.toLowerCase();

    return '<h' + level + '><a name="' +
        escapedText +
        '" class="anchor" href="#' +
        escapedText +
        '"><span class="header-link"></span></a>' +
        text + '</h' + level + '>';
};

app.set('port', 3000 || process.env.PORT);

app.get('/books', function (req, res) {

    feed('books').then(function(response){
        res.send(response);
    });
});

app.get('/books/:book', function (req, res) {
    fs.readFile('./feeds/books/' + req.params.book + '.md', {encoding: 'utf-8'}, function (err, data) {
        if (err) {
            return res.status(404).send('404');
        }

        res.status(200).send(marked(data, {renderer: renderer}));
    });
});

http.createServer(app).listen(app.get('port'), function () {
    console.info('DEBUG environment is set to ' +
    (Boolean((process.env.DEBUG === 'true') || (process.env.DEBUG == null))));
    console.log('Server listening on port ' + app.get('port'));
});


function feed(name) {
    new Promise(function (resolve, reject) {
        var path = './feeds/' + name;
        var response = {};
        fs.readdir(path, function (err, files) {
            if (err) {
                return reject(err);
            }

            files.forEach(function (element, index) {
                response[element] = {};
                response[element].index = index;
            });
            resolve(response);

        });
    })
}
