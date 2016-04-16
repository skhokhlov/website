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

const renderer = new marked.Renderer();
renderer.heading = (text, level) => {
    let escapedText = text.toLowerCase().replace(/ /g, '-');
    return `<h${level} id="${escapedText}" class="title title_h${level}">
            <a name="${escapedText}" class="title__anchor" href="#${escapedText}">
                <span class="title__link title__link_anchor"></span>
            </a>${text}</h${level}>`;
};
renderer.link = (href, title, text) => `<a href="${href}" class="link" title="${title || text}">${text}</a>`;
renderer.image = (href, title, text) => `<img src="${href}" class="image" title="${title || text}" alt="${text || title}" />`;
renderer.hr = () => '<hr class="hr"/>';

const minifyOptions = {
    removeComments: true,
    collapseWhitespace: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    keepClosingSplash: true
};

gulp.task('feeds', ['yate'], () => {
    /**
     * Перебирает ленты
     */
    require('./build/app/feed.yate.js');

    let feeds = fs.readdirSync('./bundles/feeds');
    feeds.forEach((feed) => {
        let listOfPages = [];

        console.log('feeds: \'' + feed + '\'');

        /**
         * Перебирает страницы в ленте
         */
        let pages = fs.readdirSync('./bundles/feeds/' + feed);
        pages.forEach((page) => {
            /**
             * Разборка страницы ленты
             */
            let content = parsePage(fs.readFileSync('./bundles/feeds/' + feed + '/' + page, {encoding: 'utf-8'}));
            content.params.name = page.replace('.md', '');
            console.log('feeds: \'' + feed + '\' page: \'' + content.params.name + '\'');
            listOfPages.push(content.params);

            let build = content.params;
            build.pageContent = content.pageContent;

            /**
             * Сохрание собранного файла страницы
             */
            fs.writeFileSync(
                './build/bundles/feeds/' + feed + '/' + page.replace('.md', '') + '.json',
                JSON.stringify(build),
                {encoding: 'utf-8'}
            );

        });

        /**
         * Сохрание массива с параметрами страниц ленты
         */
        let feedParam = {
            pages: listOfPages,
            name: feed
        };

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

        fs.writeFileSync(
            './build/bundles/feeds/' + feed.replace('.md', '') + '.json',
            JSON.stringify(feedParam),
            {encoding: 'utf-8'}
        );
    });
});

gulp.task('pages', ['feeds'], () => {
    require('./build/app/app.yate.js');

    (function parseDir(path) {
        let pages = fs.readdirSync('./bundles/pages/' + path);
        pages.forEach((element) => {
            if (fs.lstatSync('./bundles/pages/' + path + element).isDirectory()) {
                parseDir(path + element + '/');

            } else if (/\.md/.test(element)) {
                let page = parsePage(fs.readFileSync('./bundles/pages/' + path + element, {encoding: 'utf-8'}));
                let booksFeed = JSON.parse(fs.readFileSync('build/bundles/feeds/books.json', {encoding: 'utf-8'}));
                page.pageContent = page.pageContent
                    .replace(new RegExp('{ feeds.books.full }', 'g'), booksFeed.render.full)
                    .replace(new RegExp('{ feeds.books.compact }', 'g'), booksFeed.render.compact);

                console.log('pages: \'' + path + element.replace('.md', '') + '\'');

                let build = page.params;
                build.pageContent = page.pageContent;
                /**
                 * Сохрание собранного файла страницы
                 */
                fs.writeFileSync(
                    './build/bundles/pages/' + path + element.replace('.md', '') + '.json',
                    JSON.stringify(build),
                    {encoding: 'utf-8'}
                );
            }

        });
    })('/');
});

gulp.task('specials', () => {
    (function parseDir(path) {
        let dir = fs.readdirSync('./bundles/special/' + path);
        dir.forEach((element) => {
            if (fs.lstatSync('./bundles/special/' + path + element).isDirectory()) {
                parseDir(path + element + '/');

            } else if (/\.html/.test(element)) {
                let file = fs.readFileSync('./bundles/special/' + path + element, {encoding: 'utf-8'});

                console.log('specials: \'' + path + element + '\'');

                /**
                 * Сохрание собранного файла страницы
                 */
                fs.writeFileSync(
                    './build/bundles/special' + path + element,
                    minify(file, minifyOptions),
                    {encoding: 'utf-8'}
                );
            }
        });
    })('/');
});

gulp.task('js', () => {
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

gulp.task('yate', () => {
    yate('app/app.yate', 'build/app/app.yate.js');
    yate('app/feed.yate', 'build/app/feed.yate.js');
});

gulp.task('css', () => {
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
 */
function parsePage(data) {
    let splitted = data.split('\n');

    /**
     * На странице должна быть обязательная часть с параметрами,
     * начинающаяся и завершающаяся с помошью ---
     */
    if (splitted[0] !== '---') {
        throw new Error('Missing ---');
    }

    let endOfParams = false;
    let params = ''; // Часть страницы с параметрами в YAML
    let content = ''; // Основная чать странцы

    for (let i = 1; i < splitted.length; ++i) {
        if (splitted[i] === '---') {
            endOfParams = true;

        } else if (endOfParams) {
            content += splitted[i] + '\n';

        } else {
            params += splitted[i] + '\n';
        }
    }

    if (!endOfParams) {
        throw new Error('Missing second ---');
    }

    return {
        params: yaml.safeLoad(params),
        pageContent: minify(marked(content, {renderer: renderer}), minifyOptions)
    };
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
