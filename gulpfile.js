var fs = require('fs');
var gulp = require('gulp');

var jscs = require('gulp-jscs');
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
    /**
     * Перебирает ленты
     */
    fs.readdir('./feeds', function (err, files) {
        if (err) {
            throw new Error(err);
        }

        files.forEach(function (element) {
            /**
             * Перебирает страницы в ленте
             */
            fs.readdir('./feeds/' + element, function (subErr, subFiles) {
                if (subErr) {
                    throw new Error(subErr);
                }

                var listOfPages = [];

                subFiles.forEach(function (subElement, index) {
                    /**
                     * Разборка страницы ленты
                     */
                    fs.readFile('./feeds/' + element + '/' + subElement, {encoding: 'utf-8'}, function (ssErr, ssData) {
                        if (ssErr) {
                            throw new Error(ssErr);
                        }

                        /**
                         * Разделение файла по строкам
                         */
                        var splited = ssData.split('\n');

                        /**
                         * На странице должна быть обязательная часть с параметрами,
                         * начинающаяся и завершающаяся с помошью ---
                         */
                        if (splited[0] !== '---') {
                            throw new Error('Missing ---');
                        }

                        var endOfParams = false;
                        var params = ''; // Часть страницы с параметрами в YAML
                        var content = ''; // Основная чать странцы

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
                        listOfPages.push(JSON.stringify(build));
                        build.pageContent = marked(content, {renderer: renderer});

                        /**
                         * Сохрание скомпилированного файла страницы
                         */
                        fs.writeFile('./build/feeds/' + element + '/' + subElement + '.json', JSON.stringify(build),
                            {encoding: 'utf-8'}, function (err) {
                                if (err) {
                                    throw new Error(err);
                                }
                            });

                        /**
                         * Сохрание массива с параметрами страниц ленты
                         */
                        if (listOfPages.length === subFiles.length) {
                            fs.writeFile('./build/feeds/' + element + '.json', '[' + listOfPages.join() + ']',
                                {encoding: 'utf-8'}, function (err) {
                                    if (err) {
                                        throw new Error(err);
                                    }
                                });
                        }

                    });
                });
            });
        });
    });
});

gulp.task('js', function () {
    gulp.src('./**')
        .pipe(jscs({
            fix: false,
            preset: 'yandex',
            excludeFiles: ['node_modules/**']
        }));
});

gulp.task('default', function () {
});
