'use strict';

const fs = require('fs');
const gulp = require('gulp');
const execSync = require('child_process').execSync;

const jscs = require('gulp-jscs');
const marked = require('marked');
const yaml = require('js-yaml');
const minify = require('html-minifier').minify;
const jshint = require('gulp-jshint');
const stylus = require('gulp-stylus');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
//const imagemin = require('gulp-imagemin');
const yr = require('./node_modules/yate/lib/runtime.js');

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
    return '<a href="' + href + '" class="link" title="' + (title || text) + '">' + text + '</a>';
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
renderer.hr = function () {
    return '<hr class="hr"/>';
};

const minifyOptions = {
    removeComments: true,
    collapseWhitespace: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    keepClosingSplash: true
};

gulp.task('feeds', ['yate'], function () {
    /**
     * Перебирает ленты
     */
    var feeds = fs.readdirSync('./bundles/feeds');
    feeds.forEach(function (feed) {
        var listOfPages = [];

        console.log('feeds: build: \'' + feed + '\'');

        /**
         * Перебирает страницы в ленте
         */
        var pages = fs.readdirSync('./bundles/feeds/' + feed);
        pages.forEach(function (page) {
            /**
             * Разборка страницы ленты
             */
            var content = fs.readFileSync('./bundles/feeds/' + feed + '/' + page, {encoding: 'utf-8'});
            parsePage(content, function (err, params, html) {
                if (err) {
                    throw new Error(err);
                }

                var build = params;
                build.name = removeEx(page);

                console.log('feeds: build: \'' + feed + '\' page: \'' + build.name + '\'');

                listOfPages.push(build);

                build.pageContent = html;

                /**
                 * Сохрание собранного файла страницы
                 */
                fs.writeFileSync('./build/bundles/feeds/' + feed + '/' + removeEx(page) + '.json',
                    JSON.stringify(build), {encoding: 'utf-8'});

            });
        });

        /**
         * Сохрание массива с параметрами страниц ленты
         */
        var feedParam = {
            pages: listOfPages,
            name: feed
        };

        require('./build/app/feed.yate.js');
        feedParam.render = {
            compact: yr.run('feed', {
                pages: listOfPages,
                name: feed,
                type: 'compact'
            }),
            full: yr.run('feed', {
                pages: listOfPages,
                name: feed,
                type: 'full'
            })
        };

        fs.writeFileSync('./build/bundles/feeds/' + removeEx(feed) + '.json',
            JSON.stringify(feedParam), {encoding: 'utf-8'});
    });
});

gulp.task('pages', ['feeds'], function () {
    (function parseDir(path) {
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

                                console.log('pages: build: \'' + path + element.replace('.md', '') + '\'');

                                // TODO: сделать автоматическим

                                var build = params;
                                build.pageContent = html
                                    .replace(new RegExp('{ feeds.books.full }', 'g'),
                                    JSON.parse(fs.readFileSync('build/bundles/feeds/books.json',
                                        {encoding: 'utf-8'})).render.full)
                                    .replace(new RegExp('{ feeds.books.compact }', 'g'),
                                    JSON.parse(fs.readFileSync('build/bundles/feeds/books.json',
                                        {encoding: 'utf-8'})).render.compact);

                                /**
                                 * Сохрание собранного файла страницы
                                 */
                                fs.writeFile('./build/bundles/pages/' + path + element.replace('.md', '') + '.json',
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

gulp.task('specials', function () {
    (function parseDir(path) {
        fs.readdir('./bundles/special/' + path, function (err, data) {
            if (err) {
                throw new Error(err);
            }

            data.forEach(function (element) {
                if (fs.lstatSync('./bundles/special/' + path + element).isDirectory()) {
                    parseDir(path + element + '/');

                } else {
                    fs.readFile('./bundles/special/' + path + element, {encoding: 'utf-8'}, function (err, ssData) {
                        if (err) {
                            throw new Error(err);
                        }

                        if (/\.html/.test(element)) {
                            console.log('specials: build: \'' + path + element + '\'');

                            /**
                             * Сохрание скомпилированного файла страницы
                             */
                            fs.writeFile('./build/bundles/special/' + path + element,
                                minify(ssData, minifyOptions), {encoding: 'utf-8'}, function (err) {
                                    if (err) {
                                        throw new Error(err);
                                    }
                                });
                        }
                    });
                }
            });
        });

    })('/');
});

gulp.task('js', function () {
    gulp.src(['./**'])
        .pipe(jscs({
            preset: 'yandex'
        }));

    gulp.src(['./*.js'])
        .pipe(jshint({
            esnext: true
        }))
        .pipe(jshint.reporter('default'));

    gulp.src(['./app/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest('build/app/'));

});

gulp.task('yate', function () {
    yate('app/app.yate', 'build/app/app.yate.js');
    yate('app/feed.yate', 'build/app/feed.yate.js');
});

gulp.task('css', function () {
    gulp.src(['app/app.styl'])
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('build/app'));
});

//gulp.task('images', function () {
//    gulp.src('images/**')
//        .pipe(imagemin({
//            progressive: true
//        }))
//        .pipe(gulp.dest('images'));
//});

gulp.task('default', ['js', 'css', 'pages', 'specials']);

gulp.task('production', ['default'/*, 'images'*/]);

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

/**
 *
 * @param input
 * @param output
 * @returns {*}
 */
function yate(input, output) {
    return execSync('./node_modules/.bin/yate ' + input + ' > ' + output);
}

/**
 *
 * @param name
 * @returns {XML|string|void}
 */
function removeEx(name) {
    return name.replace('.md', '');
}
