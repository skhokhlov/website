var after = require('after');
var request = require('supertest');

require('../server.js');
request = request('http://localhost:' + process.env.PORT || 3000);

describe('router', function () {

    describe('methods', function () {
        it('should return correct status code on /', function (done) {
            var cb = after(3, done);

            request
                .get('/')
                .expect(200, cb);

            request
                .delete('/')
                .expect(404, cb);

            request
                .post('/')
                .expect(404, cb);
        });

        it('should return correct status code on a page', function (done) {
            var cb = after(3, done);

            request
                .get('/contacts')
                .expect(200, cb);

            request
                .delete('/contacts')
                .expect(404, cb);

            request
                .post('/contacts')
                .expect(404, cb);
        });

        it('should return correct status code on feed', function (done) {
            var cb = after(3, done);

            request
                .get('/feed/books/how-we-decide')
                .expect(200, cb);

            request
                .delete('/feed/books/how-we-decide')
                .expect(404, cb);

            request
                .post('/feed/books/how-we-decide')
                .expect(404, cb);
        });

        it('should return correct status code on specials', function (done) {
            var cb = after(3, done);

            request
                .get('/special/plus')
                .expect(200, cb);

            request
                .delete('/special/plus')
                .expect(404, cb);

            request
                .post('/special/plus')
                .expect(404, cb);
        });

        it('should return correct status code on a nonexistent page', function (done) {
            var cb = after(3, done);

            request
                .get('/nonexistent')
                .expect(404, cb);

            request
                .delete('/nonexistent')
                .expect(404, cb);

            request
                .post('/nonexistent')
                .expect(404, cb);
        });
    });

});
