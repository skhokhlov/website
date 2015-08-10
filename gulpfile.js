var fs = require('fs');
var gulp = require('gulp');
var markdown = require('gulp-markdown');

var marked = require('marked');
var yaml = require('js-yaml');

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

gulp.task('pages', function () {
    fs.readdir('./feeds', function (err, files) {
        if (err) {
            throw new Error(err);
        }

        files.forEach(function (element) {
            fs.readdir('./feeds/' + element, function(subErr, subFiles){
                if (subErr) {
                    throw new Error(subErr);
                }

               subFiles.forEach(function(subElement){
                   fs.readFile('./feeds/'+ element + '/' + subElement, {encoding: 'utf-8'}, function (ssErr, ssData) {
                       if (ssErr) {
                           throw new Error(ssErr);
                       }

                       var splited = ssData.split('\n');

                       if (splited[0] !== '---') {
                           throw new Error('Missing ---');
                       }

                       var endOfParams = false;
                       var params = '';
                       var content = '';

                       for (var i = 1; i < splited.length; ++i) {
                           if (splited[i] === '---') {
                               endOfParams = true;

                           } else if (endOfParams) {
                               content += splited[i] + '\n';

                           } else {
                               params += splited[i] + '\n';
                           }
                       }

                       if (!endOfParams) {
                           throw new Error('Missing second ---');
                       }

                       var build = yaml.safeLoad(params);
                       build.pageContent = marked(content, {renderer: renderer});

                       fs.writeFile('./build/feeds/' + element+ '/' + subElement + '.json', JSON.stringify(build), {encoding: 'utf-8'}, function (err) {
                           if (err) {
                               throw new Error(err);
                           }
                       });

                   });
               })
            });
        });
    });
});

gulp.task('default', function () {
    //return gulp.src('feeds/books/*.md')
    //    .pipe(markdown())
    //    .pipe(gulp.dest('build/feeds/books'));
});
