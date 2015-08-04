var fs = require('fs');
var http = require('http');
var express = require('express');
var app = express();

app.set('port', 3000 || process.env.PORT);

app.get('/books/:book', function (req, res) {
    fs.exists('./build/feeds/books/' + req.params.book + '.html', function (exists) {
        if (exists) {
            res.status(200).sendFile(__dirname + '/build/feeds/books/' + req.params.book + '.html');

        } else {

        }
    });
});

http.createServer(app).listen(app.get('port'), function () {
    console.info('DEBUG environment is set to ' +
    (Boolean((process.env.DEBUG === 'true') || (process.env.DEBUG == null))));
    console.log('Server listening on port ' + app.get('port'));
});
