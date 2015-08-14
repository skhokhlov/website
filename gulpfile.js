'use strict';

var fs = require('fs');
var gulp = require('gulp');

var jscs = require('gulp-jscs');
var marked = require('marked');
var yaml = require('js-yaml');
var minify = require('html-minifier').minify;

var renderer = new marked.Renderer();
renderer.heading = function (text, level) {
    var escapedText = text.toLowerCase().replace(/ /g, '-');

    return '<h' + level + ' class="title title_h' + level + '"><a name="' +
        escapedText +
        '" class="title__anchor" href="#' +
        escapedText +
        '"><span class="title__link title__link_anchor"></span></a>' +
        text + '</h' + level + '>';
};
renderer.link = function (href, title, text) {
    return '<a href="' + href + '" class="link" title="' + title + '">' + text + '</a>';
};
renderer.image = function (href, title, text) {
    var titleAtr = '';
    var altAtr = '';

    if (title == null) {
        if (text != null) {
            titleAtr = ' title="' + text + '" ';
            altAtr = ' alt="' + text + '" ';
        }

    } else {
        titleAtr = ' title="' + title + '" ';

        if (text != null) {
            altAtr = ' alt="' + text + '" ';

        } else {
            altAtr = ' alt="' + title + '" ';
        }
    }

    return '<img src="' + href + '" class="image" ' + titleAtr + altAtr + '/>';
};

var minifyOptions = {
    removeComments: true,
    collapseWhitespace: true,
    keepClosingSlash: true
};

gulp.task('feeds', function () {
    /**
     * Перебирает ленты
     */
    fs.readdir('./bundles/feeds', function (err, files) {
        if (err) {
            throw new Error(err);
        }

        files.forEach(function (element) {
            /**
             * Перебирает страницы в ленте
             */
            fs.readdir('./bundles/feeds/' + element, function (subErr, subFiles) {
                if (subErr) {
                    throw new Error(subErr);
                }

                var listOfPages = [];

                subFiles.forEach(function (subElement) {
                    /**
                     * Разборка страницы ленты
                     */
                    fs.readFile('./bundles/feeds/' + element + '/' + subElement,
                        {encoding: 'utf-8'}, function (ssErr, ssData) {
                            if (ssErr) {
                                throw new Error(ssErr);
                            }

                            /**
                             * Проверка на технический файл ленты
                             */
                            if (!/^_/.test(subElement)) {
                                parsePage(ssData, function (err, params, html) {
                                    if (err) {
                                        throw new Error(err);
                                    }

                                    listOfPages.push(params);

                                    var build = params;
                                    build.pageContent = html;

                                    /**
                                     * Сохрание скомпилированного файла страницы
                                     */
                                    fs.writeFile('./build/bundles/feeds/' + element + '/' + subElement + '.json',
                                        JSON.stringify(build), {encoding: 'utf-8'}, function (err) {
                                            if (err) {
                                                throw new Error(err);
                                            }
                                        });

                                });
                            }

                            /**
                             * Сохрание массива с параметрами страниц ленты
                             */
                            if (listOfPages.length === (subFiles.length - 1)) {
                                var feed = {
                                    pages: listOfPages,
                                    name: element
                                };
                                fs.readFile('./bundles/feeds/' + element + '/_' + element + '.md',
                                    {encoding: 'utf-8'}, function (err, sssData) {
                                        if (err) {
                                            throw new Error(err);
                                        }

                                        feed.pageContent = marked(sssData, {renderer: renderer});

                                        fs.writeFile('./build/bundles/feeds/' + element + '.json', JSON.stringify(feed),
                                            {encoding: 'utf-8'}, function (err) {
                                                if (err) {
                                                    throw new Error(err);
                                                }
                                            });
                                    });

                            }
                        });
                });
            });
        });
    });
});

gulp.task('pages', ['feeds'], function () {
    (function parseDir(path){
        fs.readdir('./bundles/pages/' + path, function (err, data) {
            if (err) {
                throw new Error(err);
            }

            data.forEach(function (element) {
                if (fs.lstatSync('./bundles/pages/' + path + element).isDirectory()) {
                    parseDir(path + element + '/');

                } else {
                    fs.readFile('./bundles/pages/' + path + element, {encoding: 'utf-8'}, function (err, ssData) {
                        if (err) {
                            throw new Error(err);
                        }

                        if (/\.md/.test(element)) {
                            parsePage(ssData, function (err, params, html) {
                                if (err) {
                                    throw new Error(err);
                                }

                                var build = params;
                                build.pageContent = html;

                                /**
                                 * Сохрание скомпилированного файла страницы
                                 */
                                fs.writeFile('./build/bundles/pages/' + path + element + '.json',
                                    JSON.stringify(build), {encoding: 'utf-8'}, function (err) {
                                        if (err) {
                                            throw new Error(err);
                                        }
                                    });
                            });
                        }
                    });
                }
            });
        });

    })('/');
});

gulp.task('js', function () {
    gulp.src('./**')
        .pipe(jscs({
            fix: false,
            preset: 'yandex'
        }));
});

gulp.task('default', ['js', 'pages'], function () {
});

/**
 * sync page parsing and building
 * @param data
 * @param callback
 */
function parsePage(data, callback) {
    /**
     * Разделение файла по строкам
     */
    var splitted = data.split('\n');

    /**
     * На странице должна быть обязательная часть с параметрами,
     * начинающаяся и завершающаяся с помошью ---
     */
    if (splitted[0] !== '---') {
        return callback('Missing ---');
    }

    var endOfParams = false;
    var params = ''; // Часть страницы с параметрами в YAML
    var content = ''; // Основная чать странцы

    for (var i = 1; i < splitted.length; ++i) {
        if (splitted[i] === '---') {
            endOfParams = true;

        } else if (endOfParams) {
            content += splitted[i] + '\n';

        } else {
            params += splitted[i] + '\n';
        }
    }

    if (!endOfParams) {
        return callback('Missing second ---');
    }

    return callback(null, yaml.safeLoad(params), minify(marked(content, {renderer: renderer}), minifyOptions));
}
