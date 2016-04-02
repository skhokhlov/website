const page = require('page');
const yr = require('./../node_modules/yate/lib/runtime.js');
require('./../build/app/app.yate.js');

checkPath(window, document);

page('/feed/:feed/:book', (ctx) => {
    request(`/api/bundles/feed/${ctx.params.feed}/${ctx.params.book}.json`, (err, res) => {
        if (err) {
            page.stop();
            document.location = ctx.pathname;
        }

        res = JSON.parse(res);
        document.title = res.title;
        document.getElementsByClassName('page')[0].innerHTML = yr.run('app', {
            page: {
                'page-blocks': {
                    header: {
                        logo: true
                    },
                    book: true,
                    footer: true
                },
                'page-params': {
                    _page: res.type || 'page',
                    title: res.title,
                    param: res
                },
                'page-content': {
                    body: res.pageContent,
                    keywords: res.keywords
                }
            }
        });
        checkPath(window, document);
    });
});

page('/', (ctx) => {
    document.location = '/';
});

page('*', (ctx) => {
    request('/api/bundles/pages' + ctx.pathname + '.json', (err, res) => {
        if (err) {
            page.stop();
            document.location = ctx.pathname;
        }

        res = JSON.parse(res);
        document.title = res.title;
        document.getElementsByClassName('page')[0].innerHTML = yr.run('app', {
            page: {
                'page-blocks': {
                    header: {
                        logo: true
                    },
                    body: true,
                    footer: true
                },
                'page-params': {
                    _page: res.type || 'page',
                    title: res.title
                },
                'page-content': {
                    body: res.pageContent,
                    keywords: res.keywords
                }
            }
        });
        checkPath(window, document);
    });
});

page();

function checkPath(window, d) {
    var loc = window.location.pathname;
    if (loc === '/') {
        d.getElementsByClassName('nav__link_home')[0].classList.add('nav__link_active');

    } else if (loc === '/around-me' || loc === '/bookshelf' || /\/feed\/./.test(loc)) {
        d.getElementsByClassName('nav__link_aroundme')[0].classList.add('nav__link_active');

    } else if (loc === '/contacts') {
        d.getElementsByClassName('nav__link_contacts')[0].classList.add('nav__link_active');

    } else if (loc === '/who-i-am') {
        d.getElementsByClassName('nav__link_whoiam')[0].classList.add('nav__link_active');

    }
}

function request(url, callback) {
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.onload = function () {
        if (req.status === 200) {
            callback(false, req.response);

        } else {
            callback(req.statusText, undefined);
        }
    };
    req.onerror = function () {
        callback('Network Error');
    };
    req.send(null);
}
