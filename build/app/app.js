(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var page = require('page');
var yr = require('./../node_modules/yate/lib/runtime.js');
require('./../build/app/app.yate.js');

var random = function random(strings) {
    return Math.random() < 0.5 ? strings[0] : strings[1];
};

checkPath(window, document);

page('/feed/:feed/:book', function (ctx) {
    request('/api/bundles/feed/' + ctx.params.feed + '/' + ctx.params.book + '.json', function (err, res) {
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

page('/', function (ctx) {
    document.location = '/';
});

page('*', function (ctx) {
    request('/api/bundles/pages' + ctx.pathname + '.json', function (err, res) {
        if (err) {
            document.title = 'Страница не найдена';
            return document.getElementsByClassName('page')[0].innerHTML = yr.run('app', {
                page: {
                    'page-blocks': {
                        header: {
                            logo: true
                        },
                        body: true,
                        footer: true
                    },
                    'page-params': {
                        _page: 'error',
                        title: 'Страница не найдена'
                    },
                    'page-content': {
                        body: '<h2 class="title">' + random(['Бегите, глупцы!', '&mdash;&nbsp;Будь здесь и&nbsp;сейчас<br/>&mdash;&nbsp;Не&nbsp;сегодня, дорогой']) + '</h2><h1 class="title">Страница не найдена</h1>' + '<p>Если вы уверены, что здесь должно что-то быть, ' + '<a href="mailto:sergey@skhokhlov.ru" class="link">сообщите мне об этом: sergey@skhokhlov.ru</a>.</p>'
                    }
                }
            });
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

},{"./../build/app/app.yate.js":2,"./../node_modules/yate/lib/runtime.js":7,"page":4}],2:[function(require,module,exports){
'use strict';

var yr = yr || require('yate/lib/runtime.js');

(function () {

    var cmpNN = yr.cmpNN;
    var cmpSN = yr.cmpSN;
    var nodeset2xml = yr.nodeset2xml;
    var nodeset2boolean = yr.nodeset2boolean;
    var nodeset2attrvalue = yr.nodeset2attrvalue;
    var nodeset2scalar = yr.nodeset2scalar;
    var scalar2attrvalue = yr.scalar2attrvalue;
    var xml2attrvalue = yr.xml2attrvalue;
    var scalar2xml = yr.scalar2xml;
    var xml2scalar = yr.xml2scalar;
    var simpleScalar = yr.simpleScalar;
    var simpleBoolean = yr.simpleBoolean;
    var selectNametest = yr.selectNametest;
    var closeAttrs = yr.closeAttrs;

    var M = new yr.Module();

    var j0 = [0, 'page', 0, 'page-params'];

    //  var params : nodeset
    M.v0 = function (m, c0, i0, l0) {
        return m.s(j0, c0.doc.root);
    };

    var j1 = [0, '_page'];

    //  var page : nodeset
    M.v1 = function (m, c0, i0, l0) {
        return m.n(j1, m.v('v0', c0.doc.root));
    };

    var j2 = [0, 'page', 0, 'page-content'];

    //  var content : nodeset
    M.v2 = function (m, c0, i0, l0) {
        return m.s(j2, c0.doc.root);
    };

    var j3 = [];

    var j4 = [0, 'page'];

    var j5 = [0, 'wrap'];

    var j6 = [0, 'title'];

    var j7 = [0, 'keywords'];

    var j8 = [0, 'hostname'];

    var j9 = [0, 'page-blocks', 0, '*'];

    var j10 = [0, '*'];

    var j11 = [1, 0];

    var j12 = [0, 'footer'];

    var j13 = [0, 'body'];

    var j14 = [0, 'book'];

    var j15 = [0, 'param', 0, 'image'];

    var j16 = [0, 'param', 0, 'author'];

    var j17 = [0, 'param', 0, 'original'];

    var j18 = [0, 'param', 0, 'original', 0, 'author'];

    var j19 = [0, 'param', 0, 'original', 0, 'title'];

    var j20 = [0, 'param', 0, 'caption'];

    var j21 = [0, 'header'];

    var j22 = [0, 'stat'];

    var j23 = [0, 'counter'];

    // match /
    M.t0 = function t0(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [c0];

        if (nodeset2boolean(m.n(j5, m.v('v0', c0.doc.root)))) {
            r0 += closeAttrs(a0);
            r0 += "<!DOCTYPE html>";
            r0 += "<html>";
            r0 += "<head>";
            r0 += "<title>" + nodeset2xml(m.n(j6, m.v('v0', c0.doc.root))) + "</title>";
            r0 += "<link rel=\"" + "stylesheet" + "\" href=\"" + "/public/app.css" + "\"/>";
            r0 += "<link type=\"" + "image/x-icon" + "\" rel=\"" + "shortcut icon" + "\" href=\"" + "/images/icon/icon.ico" + "\"/>";
            r0 += "<meta name=\"" + "keywords" + "\" content=\"" + nodeset2attrvalue(m.n(j7, m.v('v2', c0.doc.root))) + "\"/>";
            r0 += "</head>";
            r0 += "<body";
            a0.a = {
                'class': new yr.scalarAttr("page")
            };
            a0.s = 'body';
            r0 += m.a(m, 0, selectNametest('page', c0, []), '', a0);
            r0 += closeAttrs(a0);
            r0 += "<script async=\"" + "async" + "\" src=\"" + "/public/app.js" + "\"></script>";
            r0 += "</body>";
            r0 += "</html>";
            r0 += "\n<!-- " + nodeset2scalar(m.n(j8, m.v('v0', c0.doc.root))) + " -->";
        } else {
            r0 += m.a(m, 0, selectNametest('page', c0, []), '', a0);
        }

        return r0;
    };
    M.t0.j = 1;
    M.t0.a = 1;

    // match .page
    M.t1 = function t1(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [c0];

        r0 += closeAttrs(a0);
        r0 += "<div";
        a0.a = {
            'class': new yr.scalarAttr("page__content")
        };
        a0.s = 'div';
        r0 += m.a(m, 0, m.s(j9, c0), 'block', a0);
        r0 += closeAttrs(a0);
        r0 += "</div>";

        return r0;
    };
    M.t1.j = j4;
    M.t1.a = 0;

    // match .* : block
    M.t2 = function t2(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [c0];

        r0 += m.a(m, 0, m.s(j11, c0), 'block-content', a0);

        return r0;
    };
    M.t2.j = j10;
    M.t2.a = 0;

    // match .* : block-content
    M.t3 = function t3(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [c0];

        r0 += m.a(m, 0, selectNametest('*', c0, []), 'block', a0);

        return r0;
    };
    M.t3.j = j10;
    M.t3.a = 0;

    // match .footer : block-content
    M.t4 = function t4(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [c0];

        r0 += closeAttrs(a0);
        r0 += "<footer";
        a0.a = {};
        a0.s = 'footer';
        var r1 = '';
        var a1 = { a: {} };
        r1 += "footer layout";
        a0.a["class"] = new yr.scalarAttr(r1);
        r0 += closeAttrs(a0);
        r0 += "<div class=\"" + "footer__col footer__col_left" + "\">";
        r0 += "<p>" + "Электропочта: " + "<a class=\"" + "link footer__link" + "\" href=\"" + "mailto:sergey@skhokhlov.ru" + "\">" + "sergey@skhokhlov.ru" + "</a></p>";
        r0 += "</div>";
        r0 += "</footer>";

        return r0;
    };
    M.t4.j = j12;
    M.t4.a = 0;

    // match .body : block
    M.t5 = function t5(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [c0];

        r0 += closeAttrs(a0);
        r0 += "<div";
        a0.a = {
            'class': new yr.scalarAttr("body")
        };
        a0.s = 'div';
        r0 += m.a(m, 0, m.s(j11, c0), 'block-content', a0);
        r0 += closeAttrs(a0);
        r0 += "</div>";

        return r0;
    };
    M.t5.j = j13;
    M.t5.a = 0;

    // match .body : block-content
    M.t6 = function t6(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [c0];

        r0 += closeAttrs(a0);
        r0 += "<div class=\"" + "body__content" + "\">";
        r0 += nodeset2scalar(m.n(j13, m.v('v2', c0.doc.root)));
        r0 += "</div>";

        return r0;
    };
    M.t6.j = j13;
    M.t6.a = 0;

    // match .book : block-content
    M.t7 = function t7(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [c0];

        r0 += closeAttrs(a0);
        r0 += "<div class=\"" + "book" + "\" itemscope=\"" + "itemscope" + "\" itemtype=\"" + "http://schema.org/Book" + "\">";
        r0 += "<p><a href=\"" + "/bookshelf" + "\" class=\"" + "link" + "\">" + "Книжная полка" + "</a></p>";
        r0 += "<div class=\"" + "layout" + "\">";
        r0 += "<div class=\"" + "book__name" + "\">";
        if (nodeset2boolean(m.n(j15, m.v('v0', c0.doc.root)))) {
            r0 += "<div class=\"" + "book__section" + "\"><img class=\"" + "image book__image" + "\" src=\"" + nodeset2attrvalue(m.n(j15, m.v('v0', c0.doc.root))) + "\" itemprop=\"" + "image" + "\"/></div>";
        }
        r0 += "<div class=\"" + "book__section" + "\">";
        r0 += "<h1 class=\"" + "book__title title title_h1" + "\" itemprop=\"" + "name" + "\">" + nodeset2xml(m.n(j6, m.v('v0', c0.doc.root))) + "</h1>";
        r0 += "<p class=\"" + "title book__author" + "\" itemprop=\"" + "author" + "\">" + nodeset2xml(m.n(j16, m.v('v0', c0.doc.root))) + "</p>";
        if (nodeset2boolean(m.n(j17, m.v('v0', c0.doc.root)))) {
            r0 += "<div class=\"" + "book__original" + "\">";
            r0 += "<p><span>" + "В оригинале:" + "</span><br/>";
            r0 += "<span class=\"" + "book__author book__author_original" + "\">" + nodeset2xml(m.n(j18, m.v('v0', c0.doc.root))) + ". " + "</span>";
            r0 += "<span class=\"" + "book__title book__title_original" + "\">" + nodeset2xml(m.n(j19, m.v('v0', c0.doc.root))) + "</span>";
            r0 += "</p>";
            r0 += "</div>";
        }
        r0 += "</div>";
        r0 += "</div>";
        r0 += "</div>";
        r0 += "<article class=\"" + "book__body" + "\" itemprop=\"" + "review" + "\">";
        r0 += nodeset2scalar(m.n(j13, m.v('v2', c0.doc.root)));
        r0 += "</article>";
        if (nodeset2boolean(m.n(j20, m.v('v0', c0.doc.root)))) {
            r0 += "<div class=\"" + "book__caption" + "\" itemprop=\"" + "about" + "\">";
            r0 += "<h2 class=\"" + "title title_h2" + "\">" + "Аннотация" + "</h2>";
            r0 += "<p>";
            r0 += nodeset2scalar(m.n(j20, m.v('v0', c0.doc.root)));
            r0 += "</p>";
            r0 += "</div>";
        }
        r0 += "</div>";

        return r0;
    };
    M.t7.j = j14;
    M.t7.a = 0;

    // match .header : block-content
    M.t8 = function t8(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [c0];

        r0 += closeAttrs(a0);
        r0 += "<header class=\"" + "header" + "\">";
        r0 += "<nav class=\"" + "nav" + "\">";
        r0 += "<a class=\"" + "nav__link nav__link_home" + "\" href=\"" + "/" + "\">";
        r0 += "<h1 class=\"" + "nav__title" + "\">";
        r0 += "<span>" + "Сергей Хохлов" + "</span>";
        r0 += "<svg class=\"" + "nav__pic" + "\" style=\"" + "width: 20px;position: relative;height: 20px;top: 3px;" + "\" height=\"" + "32" + "\" viewBox=\"" + "0 0 32 32" + "\" width=\"" + "32" + "\" xmlns=\"" + "http://www.w3.org/2000/svg" + "\"><g fill=\"" + "none" + "\" stroke=\"" + "#FFF" + "\" stroke-linecap=\"" + "round" + "\" stroke-linejoin=\"" + "round" + "\" stroke-miterlimit=\"" + "10" + "\" stroke-width=\"" + "2" + "\"><path d=\"" + "M649 138h26v18h-14M653 156h-4v-14M661 156l-8 6v-6" + "\"></path></g><path d=\"" + "M21.947 16.332C23.22 14.915 24 13.05 24 11c0-4.41-3.59-8-8-8s-8 3.59-8 8 3.59 8 8 8c1.555 0 3.003-.453 4.233-1.224 4.35 1.64 7.345 5.62 7.726 10.224H4.04c.26-3.1 1.713-5.99 4.078-8.05.417-.364.46-.995.097-1.412-.362-.416-.994-.46-1.41-.097C3.75 21.104 2 24.95 2 29c0 .553.448 1 1 1h26c.553 0 1-.447 1-1 0-5.486-3.18-10.385-8.053-12.668zM10 11c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6-6-2.69-6-6z" + "\"></path></svg>";
        r0 += "</h1>";
        r0 += "</a>";
        r0 += "<a class=\"" + "nav__link nav__link_aroundme" + "\" href=\"" + "/around-me" + "\">" + "Вокруг меня" + "</a>";
        r0 += "<a class=\"" + "nav__link nav__link_whoiam" + "\" href=\"" + "/who-i-am" + "\">" + "Кто я" + "</a>";
        r0 += "</nav>";
        r0 += "</header>";

        return r0;
    };
    M.t8.j = j21;
    M.t8.a = 0;

    // match .stat : block-content
    M.t9 = function t9(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [c0];

        r0 += closeAttrs(a0);
        r0 += "<div class=\"" + "i-stat" + "\">";
        r0 += nodeset2scalar(m.n(j23, m.v('v2', c0.doc.root)));
        r0 += "</div>";

        return r0;
    };
    M.t9.j = j22;
    M.t9.a = 0;

    M.matcher = {
        "": {
            "": ["t0"],
            "page": ["t1"]
        },
        "block": {
            "*": ["t2"],
            "body": ["t5", "t2"]
        },
        "block-content": {
            "*": ["t3"],
            "footer": ["t4", "t3"],
            "body": ["t6", "t3"],
            "book": ["t7", "t3"],
            "header": ["t8", "t3"],
            "stat": ["t9", "t3"]
        }
    };
    M.imports = [];

    yr.register('app', M);
})();

},{"yate/lib/runtime.js":7}],3:[function(require,module,exports){
module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

},{}],4:[function(require,module,exports){
(function (process){
  /* globals require, module */

  'use strict';

  /**
   * Module dependencies.
   */

  var pathtoRegexp = require('path-to-regexp');

  /**
   * Module exports.
   */

  module.exports = page;

  /**
   * Detect click event
   */
  var clickEvent = ('undefined' !== typeof document) && document.ontouchstart ? 'touchstart' : 'click';

  /**
   * To work properly with the URL
   * history.location generated polyfill in https://github.com/devote/HTML5-History-API
   */

  var location = ('undefined' !== typeof window) && (window.history.location || window.location);

  /**
   * Perform initial dispatch.
   */

  var dispatch = true;


  /**
   * Decode URL components (query string, pathname, hash).
   * Accommodates both regular percent encoding and x-www-form-urlencoded format.
   */
  var decodeURLComponents = true;

  /**
   * Base path.
   */

  var base = '';

  /**
   * Running flag.
   */

  var running;

  /**
   * HashBang option
   */

  var hashbang = false;

  /**
   * Previous context, for capturing
   * page exit events.
   */

  var prevContext;

  /**
   * Register `path` with callback `fn()`,
   * or route `path`, or redirection,
   * or `page.start()`.
   *
   *   page(fn);
   *   page('*', fn);
   *   page('/user/:id', load, user);
   *   page('/user/' + user.id, { some: 'thing' });
   *   page('/user/' + user.id);
   *   page('/from', '/to')
   *   page();
   *
   * @param {string|!Function|!Object} path
   * @param {Function=} fn
   * @api public
   */

  function page(path, fn) {
    // <callback>
    if ('function' === typeof path) {
      return page('*', path);
    }

    // route <path> to <callback ...>
    if ('function' === typeof fn) {
      var route = new Route(/** @type {string} */ (path));
      for (var i = 1; i < arguments.length; ++i) {
        page.callbacks.push(route.middleware(arguments[i]));
      }
      // show <path> with [state]
    } else if ('string' === typeof path) {
      page['string' === typeof fn ? 'redirect' : 'show'](path, fn);
      // start [options]
    } else {
      page.start(path);
    }
  }

  /**
   * Callback functions.
   */

  page.callbacks = [];
  page.exits = [];

  /**
   * Current path being processed
   * @type {string}
   */
  page.current = '';

  /**
   * Number of pages navigated to.
   * @type {number}
   *
   *     page.len == 0;
   *     page('/login');
   *     page.len == 1;
   */

  page.len = 0;

  /**
   * Get or set basepath to `path`.
   *
   * @param {string} path
   * @api public
   */

  page.base = function(path) {
    if (0 === arguments.length) return base;
    base = path;
  };

  /**
   * Bind with the given `options`.
   *
   * Options:
   *
   *    - `click` bind to click events [true]
   *    - `popstate` bind to popstate [true]
   *    - `dispatch` perform initial dispatch [true]
   *
   * @param {Object} options
   * @api public
   */

  page.start = function(options) {
    options = options || {};
    if (running) return;
    running = true;
    if (false === options.dispatch) dispatch = false;
    if (false === options.decodeURLComponents) decodeURLComponents = false;
    if (false !== options.popstate) window.addEventListener('popstate', onpopstate, false);
    if (false !== options.click) {
      document.addEventListener(clickEvent, onclick, false);
    }
    if (true === options.hashbang) hashbang = true;
    if (!dispatch) return;
    var url = (hashbang && ~location.hash.indexOf('#!')) ? location.hash.substr(2) + location.search : location.pathname + location.search + location.hash;
    page.replace(url, null, true, dispatch);
  };

  /**
   * Unbind click and popstate event handlers.
   *
   * @api public
   */

  page.stop = function() {
    if (!running) return;
    page.current = '';
    page.len = 0;
    running = false;
    document.removeEventListener(clickEvent, onclick, false);
    window.removeEventListener('popstate', onpopstate, false);
  };

  /**
   * Show `path` with optional `state` object.
   *
   * @param {string} path
   * @param {Object=} state
   * @param {boolean=} dispatch
   * @param {boolean=} push
   * @return {!Context}
   * @api public
   */

  page.show = function(path, state, dispatch, push) {
    var ctx = new Context(path, state);
    page.current = ctx.path;
    if (false !== dispatch) page.dispatch(ctx);
    if (false !== ctx.handled && false !== push) ctx.pushState();
    return ctx;
  };

  /**
   * Goes back in the history
   * Back should always let the current route push state and then go back.
   *
   * @param {string} path - fallback path to go back if no more history exists, if undefined defaults to page.base
   * @param {Object=} state
   * @api public
   */

  page.back = function(path, state) {
    if (page.len > 0) {
      // this may need more testing to see if all browsers
      // wait for the next tick to go back in history
      history.back();
      page.len--;
    } else if (path) {
      setTimeout(function() {
        page.show(path, state);
      });
    }else{
      setTimeout(function() {
        page.show(base, state);
      });
    }
  };


  /**
   * Register route to redirect from one path to other
   * or just redirect to another route
   *
   * @param {string} from - if param 'to' is undefined redirects to 'from'
   * @param {string=} to
   * @api public
   */
  page.redirect = function(from, to) {
    // Define route from a path to another
    if ('string' === typeof from && 'string' === typeof to) {
      page(from, function(e) {
        setTimeout(function() {
          page.replace(/** @type {!string} */ (to));
        }, 0);
      });
    }

    // Wait for the push state and replace it with another
    if ('string' === typeof from && 'undefined' === typeof to) {
      setTimeout(function() {
        page.replace(from);
      }, 0);
    }
  };

  /**
   * Replace `path` with optional `state` object.
   *
   * @param {string} path
   * @param {Object=} state
   * @param {boolean=} init
   * @param {boolean=} dispatch
   * @return {!Context}
   * @api public
   */


  page.replace = function(path, state, init, dispatch) {
    var ctx = new Context(path, state);
    page.current = ctx.path;
    ctx.init = init;
    ctx.save(); // save before dispatching, which may redirect
    if (false !== dispatch) page.dispatch(ctx);
    return ctx;
  };

  /**
   * Dispatch the given `ctx`.
   *
   * @param {Context} ctx
   * @api private
   */
  page.dispatch = function(ctx) {
    var prev = prevContext,
      i = 0,
      j = 0;

    prevContext = ctx;

    function nextExit() {
      var fn = page.exits[j++];
      if (!fn) return nextEnter();
      fn(prev, nextExit);
    }

    function nextEnter() {
      var fn = page.callbacks[i++];

      if (ctx.path !== page.current) {
        ctx.handled = false;
        return;
      }
      if (!fn) return unhandled(ctx);
      fn(ctx, nextEnter);
    }

    if (prev) {
      nextExit();
    } else {
      nextEnter();
    }
  };

  /**
   * Unhandled `ctx`. When it's not the initial
   * popstate then redirect. If you wish to handle
   * 404s on your own use `page('*', callback)`.
   *
   * @param {Context} ctx
   * @api private
   */
  function unhandled(ctx) {
    if (ctx.handled) return;
    var current;

    if (hashbang) {
      current = base + location.hash.replace('#!', '');
    } else {
      current = location.pathname + location.search;
    }

    if (current === ctx.canonicalPath) return;
    page.stop();
    ctx.handled = false;
    location.href = ctx.canonicalPath;
  }

  /**
   * Register an exit route on `path` with
   * callback `fn()`, which will be called
   * on the previous context when a new
   * page is visited.
   */
  page.exit = function(path, fn) {
    if (typeof path === 'function') {
      return page.exit('*', path);
    }

    var route = new Route(path);
    for (var i = 1; i < arguments.length; ++i) {
      page.exits.push(route.middleware(arguments[i]));
    }
  };

  /**
   * Remove URL encoding from the given `str`.
   * Accommodates whitespace in both x-www-form-urlencoded
   * and regular percent-encoded form.
   *
   * @param {string} val - URL component to decode
   */
  function decodeURLEncodedURIComponent(val) {
    if (typeof val !== 'string') { return val; }
    return decodeURLComponents ? decodeURIComponent(val.replace(/\+/g, ' ')) : val;
  }

  /**
   * Initialize a new "request" `Context`
   * with the given `path` and optional initial `state`.
   *
   * @constructor
   * @param {string} path
   * @param {Object=} state
   * @api public
   */

  function Context(path, state) {
    if ('/' === path[0] && 0 !== path.indexOf(base)) path = base + (hashbang ? '#!' : '') + path;
    var i = path.indexOf('?');

    this.canonicalPath = path;
    this.path = path.replace(base, '') || '/';
    if (hashbang) this.path = this.path.replace('#!', '') || '/';

    this.title = document.title;
    this.state = state || {};
    this.state.path = path;
    this.querystring = ~i ? decodeURLEncodedURIComponent(path.slice(i + 1)) : '';
    this.pathname = decodeURLEncodedURIComponent(~i ? path.slice(0, i) : path);
    this.params = {};

    // fragment
    this.hash = '';
    if (!hashbang) {
      if (!~this.path.indexOf('#')) return;
      var parts = this.path.split('#');
      this.path = parts[0];
      this.hash = decodeURLEncodedURIComponent(parts[1]) || '';
      this.querystring = this.querystring.split('#')[0];
    }
  }

  /**
   * Expose `Context`.
   */

  page.Context = Context;

  /**
   * Push state.
   *
   * @api private
   */

  Context.prototype.pushState = function() {
    page.len++;
    history.pushState(this.state, this.title, hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
  };

  /**
   * Save the context state.
   *
   * @api public
   */

  Context.prototype.save = function() {
    history.replaceState(this.state, this.title, hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
  };

  /**
   * Initialize `Route` with the given HTTP `path`,
   * and an array of `callbacks` and `options`.
   *
   * Options:
   *
   *   - `sensitive`    enable case-sensitive routes
   *   - `strict`       enable strict matching for trailing slashes
   *
   * @constructor
   * @param {string} path
   * @param {Object=} options
   * @api private
   */

  function Route(path, options) {
    options = options || {};
    this.path = (path === '*') ? '(.*)' : path;
    this.method = 'GET';
    this.regexp = pathtoRegexp(this.path,
      this.keys = [],
      options);
  }

  /**
   * Expose `Route`.
   */

  page.Route = Route;

  /**
   * Return route middleware with
   * the given callback `fn()`.
   *
   * @param {Function} fn
   * @return {Function}
   * @api public
   */

  Route.prototype.middleware = function(fn) {
    var self = this;
    return function(ctx, next) {
      if (self.match(ctx.path, ctx.params)) return fn(ctx, next);
      next();
    };
  };

  /**
   * Check if this route matches `path`, if so
   * populate `params`.
   *
   * @param {string} path
   * @param {Object} params
   * @return {boolean}
   * @api private
   */

  Route.prototype.match = function(path, params) {
    var keys = this.keys,
      qsIndex = path.indexOf('?'),
      pathname = ~qsIndex ? path.slice(0, qsIndex) : path,
      m = this.regexp.exec(decodeURIComponent(pathname));

    if (!m) return false;

    for (var i = 1, len = m.length; i < len; ++i) {
      var key = keys[i - 1];
      var val = decodeURLEncodedURIComponent(m[i]);
      if (val !== undefined || !(hasOwnProperty.call(params, key.name))) {
        params[key.name] = val;
      }
    }

    return true;
  };


  /**
   * Handle "populate" events.
   */

  var onpopstate = (function () {
    var loaded = false;
    if ('undefined' === typeof window) {
      return;
    }
    if (document.readyState === 'complete') {
      loaded = true;
    } else {
      window.addEventListener('load', function() {
        setTimeout(function() {
          loaded = true;
        }, 0);
      });
    }
    return function onpopstate(e) {
      if (!loaded) return;
      if (e.state) {
        var path = e.state.path;
        page.replace(path, e.state);
      } else {
        page.show(location.pathname + location.hash, undefined, undefined, false);
      }
    };
  })();
  /**
   * Handle "click" events.
   */

  function onclick(e) {

    if (1 !== which(e)) return;

    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    if (e.defaultPrevented) return;



    // ensure link
    // use shadow dom when available
    var el = e.path ? e.path[0] : e.target;
    while (el && 'A' !== el.nodeName) el = el.parentNode;
    if (!el || 'A' !== el.nodeName) return;



    // Ignore if tag has
    // 1. "download" attribute
    // 2. rel="external" attribute
    if (el.hasAttribute('download') || el.getAttribute('rel') === 'external') return;

    // ensure non-hash for the same path
    var link = el.getAttribute('href');
    if (!hashbang && el.pathname === location.pathname && (el.hash || '#' === link)) return;



    // Check for mailto: in the href
    if (link && link.indexOf('mailto:') > -1) return;

    // check target
    if (el.target) return;

    // x-origin
    if (!sameOrigin(el.href)) return;



    // rebuild path
    var path = el.pathname + el.search + (el.hash || '');

    // strip leading "/[drive letter]:" on NW.js on Windows
    if (typeof process !== 'undefined' && path.match(/^\/[a-zA-Z]:\//)) {
      path = path.replace(/^\/[a-zA-Z]:\//, '/');
    }

    // same page
    var orig = path;

    if (path.indexOf(base) === 0) {
      path = path.substr(base.length);
    }

    if (hashbang) path = path.replace('#!', '');

    if (base && orig === path) return;

    e.preventDefault();
    page.show(orig);
  }

  /**
   * Event button.
   */

  function which(e) {
    e = e || window.event;
    return null === e.which ? e.button : e.which;
  }

  /**
   * Check if `href` is the same origin.
   */

  function sameOrigin(href) {
    var origin = location.protocol + '//' + location.hostname;
    if (location.port) origin += ':' + location.port;
    return (href && (0 === href.indexOf(origin)));
  }

  page.sameOrigin = sameOrigin;

}).call(this,require('_process'))
},{"_process":6,"path-to-regexp":5}],5:[function(require,module,exports){
var isarray = require('isarray')

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {String} str
 * @return {Array}
 */
function parse (str) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var res

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      continue
    }

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
    }

    var prefix = res[2]
    var name = res[3]
    var capture = res[4]
    var group = res[5]
    var suffix = res[6]
    var asterisk = res[7]

    var repeat = suffix === '+' || suffix === '*'
    var optional = suffix === '?' || suffix === '*'
    var delimiter = prefix || '/'
    var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      pattern: escapeGroup(pattern)
    })
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index)
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path)
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {String}   str
 * @return {Function}
 */
function compile (str) {
  return tokensToFunction(parse(str))
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^' + tokens[i].pattern + '$')
    }
  }

  return function (obj) {
    var path = ''
    var data = obj || {}

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token

        continue
      }

      var value = data[token.name]
      var segment

      if (value == null) {
        if (token.optional) {
          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received "' + value + '"')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encodeURIComponent(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      segment = encodeURIComponent(value)

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {String} str
 * @return {String}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {String} group
 * @return {String}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {RegExp} re
 * @param  {Array}  keys
 * @return {RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {String}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {RegExp} path
 * @param  {Array}  keys
 * @return {RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        pattern: null
      })
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {Array}  path
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {String} path
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function stringToRegexp (path, keys, options) {
  var tokens = parse(path)
  var re = tokensToRegExp(tokens, options)

  // Attach keys back to the regexp.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] !== 'string') {
      keys.push(tokens[i])
    }
  }

  return attachKeys(re, keys)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {Array}  tokens
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function tokensToRegExp (tokens, options) {
  options = options || {}

  var strict = options.strict
  var end = options.end !== false
  var route = ''
  var lastToken = tokens[tokens.length - 1]
  var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken)

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
    } else {
      var prefix = escapeString(token.prefix)
      var capture = token.pattern

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*'
      }

      if (token.optional) {
        if (prefix) {
          capture = '(?:' + prefix + '(' + capture + '))?'
        } else {
          capture = '(' + capture + ')?'
        }
      } else {
        capture = prefix + '(' + capture + ')'
      }

      route += capture
    }
  }

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?'
  }

  if (end) {
    route += '$'
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithSlash ? '' : '(?=\\/|$)'
  }

  return new RegExp('^' + route, flags(options))
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(String|RegExp|Array)} path
 * @param  {Array}                 [keys]
 * @param  {Object}                [options]
 * @return {RegExp}
 */
function pathToRegexp (path, keys, options) {
  keys = keys || []

  if (!isarray(keys)) {
    options = keys
    keys = []
  } else if (!options) {
    options = {}
  }

  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys, options)
  }

  if (isarray(path)) {
    return arrayToRegexp(path, keys, options)
  }

  return stringToRegexp(path, keys, options)
}

},{"isarray":3}],6:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],7:[function(require,module,exports){
//  ---------------------------------------------------------------------------------------------------------------  //
//  yate runtime
//  ---------------------------------------------------------------------------------------------------------------  //

var yr = {};

(function() {

yr.log = function() {};

//  TODO:
//  Пустой массив. Можно использовать везде, где предполается,
//  что он read-only. Например, когда из select() возвращается пустой нодесет и т.д.
//  var emptyA = [];

var modules = {};

//  ---------------------------------------------------------------------------------------------------------------  //

//  Кешируем регулярки для лучшей производительности.
//  (http://jsperf.com/entityify-test/2)
//
var RE_AMP = /&/g;
var RE_LT = /</g;
var RE_GT = />/g;
var RE_QUOTE = /"/g;

var RE_E_AMP = /&amp;/g;
var RE_E_LT = /&lt;/g;
var RE_E_GT = /&gt;/g;

yr.text2xml = function(s) {
    if (s == null) { return ''; }

    //  NOTE: Странное поведение Safari в этом месте.
    //  Иногда сюда попадает объект, которые != null, но при этом у него
    //  нет метода toString. По идее, такого быть просто не может.
    //  Попытки пронаблюдать этот объект (при помощи console.log и т.д.)
    //  приводят к тому, что он "нормализуется" и баг пропадает.
    //  Вообще, любые операции, которые неявно приводят его к строке, например,
    //  тоже приводят к нормализации и пропаданию бага.
    //
    //  Поэтому, вместо `s.toString()` используем `('' + s)`.
    //
    return ('' + s)
        .replace(RE_AMP, '&amp;')
        .replace(RE_LT, '&lt;')
        .replace(RE_GT, '&gt;');
};

yr.xml2text = function(s) {
    //  NOTE: См. коммент про Safari выше.

    if (s == null) { return ''; }

    return ('' + s)
        .replace(RE_E_LT, '<')
        .replace(RE_E_GT, '>')
        .replace(RE_E_AMP, '&');
};

yr.text2attr = function(s) {
    //  NOTE: См. коммент про Safari выше.

    if (s == null) { return ''; }

    return ('' + s)
        .replace(RE_AMP, '&amp;')
        .replace(RE_QUOTE, '&quot;')
        .replace(RE_LT, '&lt;')
        .replace(RE_GT, '&gt;');
};

yr.xml2attr = function(s) {
    //  NOTE: См. коммент про Safari выше.

    if (s == null) { return ''; }

    return ('' + s)
        .replace(RE_QUOTE, '&quot;')
        .replace(RE_LT, '&lt;')
        .replace(RE_GT, '&gt;');
};

//  ---------------------------------------------------------------------------------------------------------------  //

yr.register = function(id, module) {
    if ( yr.isRegistered(id) ) {
        throw Error('Module "' + id + '" already exists');
    }

    //  Резолвим ссылки на импортируемые модули.

    var ids = module.imports || [];
    /// module.id = id;
    //  Для удобства добавляем в imports сам модуль.
    var imports = [ module ];
    for (var i = 0, l = ids.length; i < l; i++) {
        var module_ = modules[ ids[i] ];
        if (!module_) {
            throw Error('Module "' + ids[i] + '" doesn\'t exist');
        } else {
            imports = imports.concat(module_.imports);
        }
    }
    //  В результате мы дерево импортов превратили в плоский список.
    module.imports = imports;

    modules[id] = module;
};

//  ---------------------------------------------------------------------------------------------------------------  //

yr.isRegistered = function (id) {
    return !!modules[id];
};

//  ---------------------------------------------------------------------------------------------------------------  //

// Вызов модуля
// id - идентификатор модуля (String)
// data - данные для отрисовки (Object, Array, String, Number)
// mode - мода для поиска шаблонов в ней (String)
// args - параметры вызова шаблона (Array)
// nodeName - имя для корневой ноды (String)
//
// yr.run('moduleId', {'name': 'Vasya'}, 'profile', null, 'user')
//
yr.run = function(id, data, mode, args, nodeName) {
    mode = mode || '';

    var module = modules[id];
    if (!module) {
        throw 'Module "' + id + '" is undefined';
    }

    var doc = new Doc(data, nodeName);
    var r;

    if (args) {
        r = module.a.apply(module, [module, 0, [doc.root], mode, { a: {} }].concat(args));
    } else {
        r = module.a(module, 0, [ doc.root ], mode, { a: {} } );
    }

    return r;
};

//  ---------------------------------------------------------------------------------------------------------------  //

yr.join = function join(left, right) {
    return left.concat(right);
};

//  ---------------------------------------------------------------------------------------------------------------  //

yr.nodeValue = function nodeValue(node) {
    var data = node.data;
    return (typeof data === 'object') ? '': data;
};

yr.nodeName = function nodeName(nodeset) {
    var node = nodeset[0];

    return (node) ? node.name : '';
};

//  ---------------------------------------------------------------------------------------------------------------  //

yr.simpleScalar = function simpleScalar(name, context) {
    var data = context.data;
    if (!data) { return ''; }

    if (name === '*') {
        for (var key in data) {
            return yr.simpleScalar(key, context);
        }
        return '';
    }

    var r = data[name];

    if (typeof r === 'object') {
        return '';
    }

    return (r === undefined) ? '' : r;
};

yr.simpleBoolean = function simpleBoolean(name, context) {
    var data = context.data;
    if (!data) { return false; }

    if (name === '*') {
        for (var key in data) {
            var r = yr.simpleBoolean(key, context);
            if (r) { return true; }
        }
        return false;
    }

    var r = data[name];

    if (!r) { return false; }

    if (Array.isArray(r)) {
        return r.length;
    }

    return true;
};

//  ---------------------------------------------------------------------------------------------------------------  //

yr.nodeset2scalar = function nodeset2scalar(nodeset) {
    if (!nodeset.length) { return ''; }

    var data = nodeset[0].data;
    return (typeof data == 'object') ? '': data;
};

yr.nodeset2boolean = function nodeset2boolean(nodeset) {
    if (! (nodeset && nodeset.length > 0) ) {
        return false;
    }

    return !!nodeset[0].data;
};

yr.nodeset2xml = function nodeset2xml(nodeset) {
    return yr.scalar2xml( yr.nodeset2scalar(nodeset) );
};

yr.nodeset2attrvalue = function nodeset2attrvalue(nodeset) {
    return yr.scalar2attrvalue( yr.nodeset2scalar(nodeset) );
};

yr.scalar2xml = yr.text2xml;
yr.xml2scalar = yr.xml2text;

//  FIXME: Откуда вообще взялась идея, что xml в атрибуты нужно кастить не так, как скаляры?!
//  Смотри #157. Не нужно квотить амперсанд, потому что он уже заквочен.
yr.xml2attrvalue = yr.xml2attr;

yr.scalar2attrvalue = yr.text2attr;

yr.object2nodeset = function object2nodeset(object) {
    return [ ( new Doc(object) ).root ];
};

yr.array2nodeset = function array2nodeset(array) {
    var object = {
        'item': array
    };
    return [ ( new Doc(object) ).root ];
};

//  Сравниваем скаляр left с нодесетом right.
yr.cmpSN = function cmpSN(left, right) {
    for (var i = 0, l = right.length; i < l; i++) {
        if ( left == yr.nodeValue( right[i] ) ) {
            return true;
        }
    }
    return false;
};

//  Сравниваем два нодесета.
yr.cmpNN = function cmpNN(left, right) {
    var m = right.length;

    if (m === 0) { return false; }
    if (m === 1) { return yr.cmpSN( yr.nodeValue( right[0] ), left ); }

    var values = [];

    var rv = yr.nodeValue( right[0] );
    for (var i = 0, l = left.length; i < l; i++) {
        var lv = yr.nodeValue( left[i] );
        if (lv == rv) { return true; }
        values[i] = lv;
    }

    for (var j = 1; j < m; j++) {
        rv = yr.nodeValue( right[j] );
        for (var i = 0, l = left.length; i < l; i++) {
            if ( values[i] == rv ) { return true; }
        }
    }

    return false;
};

//  ---------------------------------------------------------------------------------------------------------------  //

yr.shortTags = {
    br: true,
    col: true,
    embed: true,
    hr: true,
    img: true,
    input: true,
    link: true,
    meta: true,
    param: true,
    wbr: true
};

yr.closeAttrs = function closeAttrs(a) {
    var name = a.s;

    if (name) {
        var r = '';
        var attrs = a.a;

        for (var attr in attrs) {
            r += ' ' + attr + '="' + attrs[attr].quote() + '"';
        }
        /*
        for (var attr in attrs) {
            if ( attrs.hasOwnProperty(attr) ) {
                var v = attrs[attr];
                if (v.quote) {
                    r += ' ' + attr + '="' + v.quote() + '"';
                } else {
                    yr.log({
                        id: 'NO_QUOTE',
                        message: "Attr doesn't have quote() method",
                        data: {
                            key: attr,
                            value: v
                        }
                    });
                }
            } else {
                yr.log({
                    id: 'BAD_PROTOTYPE',
                    message: 'Object prototype is corrupted',
                    data: {
                        key: attr,
                        value: v
                    }
                });
            }
        }
        */
        r += (yr.shortTags[name]) ? '/>' : '>';
        a.s = null;

        return r;
    }

    return '';
};

yr.copyAttrs = function copyAttrs(to, from) {
    for (var key in from) {
        to[key] = from[key];
    }
};

//  ---------------------------------------------------------------------------------------------------------------  //

yr.scalarAttr = function(s) {
    //  NOTE: См. коммент про Safari выше.

    this.s = (s == null) ? '' : ('' + s);
};

yr.scalarAttr.prototype.quote = function() {
    return yr.text2attr(this.s);
};

function quoteAmp(s) {
    return s.replace(/&/g, '&amp;');
}

yr.scalarAttr.prototype.addxml = function(xml) {
    return new yr.xmlAttr( quoteAmp(this.s) + xml );
};

yr.scalarAttr.prototype.addscalar = function(xml) {
    return new yr.scalarAttr( this.s + xml );
};

yr.xmlAttr = function(s) {
    //  NOTE: См. коммент про Safari выше.

    this.s = (s == null) ? '' : ('' + s);
};

yr.xmlAttr.prototype.quote = function() {
    return yr.xml2attr(this.s);
};

yr.xmlAttr.prototype.addscalar = function(scalar) {
    return new yr.xmlAttr( this.s + quoteAmp(scalar) );
};

//  ---------------------------------------------------------------------------------------------------------------  //

yr.slice = function(s, from, to) {
    //  NOTE: См. коммент про Safari выше.

    s = '' + s;
    return (to) ? s.slice(from, to) : s.slice(from);
};

yr.exists = function(nodeset) {
    return nodeset.length > 0;
};

yr.grep = function(nodeset, predicate) {
    var r = [];
    for (var index = 0, count = nodeset.length; index < count; index++) {
        var node = nodeset[index];
        if (predicate(node, index, count)) {
            r.push(node);
        }
    }
    return r;
};

yr.byIndex = function(nodeset, i) {
    return nodeset.slice(i, i + 1);
};

//  ---------------------------------------------------------------------------------------------------------------  //

yr.sort = function(nodes, by, desc) {
    var values = [];
    for (var i = 0, l = nodes.length; i < l; i++) {
        var node = nodes[i];
        var value = by(node, i, l);
        values.push({
            node: node,
            value: value
        });
    }

    var greater = (desc) ? -1 : +1;
    var less = (desc) ? +1 : -1;

    var sorted = values.sort(function(a, b) {
        var va = a.value;
        var vb = b.value;
        if (va < vb) { return less; }
        if (va > vb) { return greater; }
        return 0;
    });

    var r = [];
    for (var i = 0, l = sorted.length; i < l; i++) {
        r.push( sorted[i].node );
    }

    return r;
};

//  ---------------------------------------------------------------------------------------------------------------  //

yr.nodeset2data = function(nodes) {
    var l = nodes.length;
    if (l === 0) {
        return '';
    }

    if (l === 1) {
        return nodes[0].data;
    }

    var data = [];
    for (var i = 0; i < l; i++) {
        data.push( nodes[i].data );
    }

    return data;
};

//  ---------------------------------------------------------------------------------------------------------------  //

yr.externals = {};


//  ---------------------------------------------------------------------------------------------------------------  //
//  Module
//  ---------------------------------------------------------------------------------------------------------------  //


var Module = function() {};

//  ---------------------------------------------------------------------------------------------------------------  //

//  NOTE: ex applyValue.
Module.prototype.a = function applyValue(M, start, nodeset, mode, a0) {
    var r = '';

    //  Достаем аргументы, переданные в apply, если они там есть.
    var args;
    if (arguments.length > 5) {
        args = Array.prototype.slice.call(arguments, 5);
    }

    var imports = M.imports;

    //  Идем по нодесету.
    for (var i0 = 0, l0 = nodeset.length; i0 < l0; i0++) {
        var c0 = nodeset[i0];

        //  Для каждой ноды ищем подходящий шаблон.
        //  Сперва ищем в текущем модуле ( imports[0] ),
        //  затем идем далее по списку импортов.

        //  Если мы найдем шаблон, в found будет его id, а в module -- модуль,
        //  в котором находится этот шаблон.
        var found = false;
        var module;

        var i2 = start;
        var l2 = imports.length;
        var template;
        while (!found && i2 < l2) {
            module = imports[i2++];

            //  matcher представляем собой двухуровневый объект,
            //  на первом уровне ключами являются моды,
            //  на втором -- имена нод.
            //  Значения на втором уровне -- список id-шников шаблонов.
            var names = module.matcher[mode];

            if (names) {
                //  FIXME: Тут неправильно. Если шаблоны для c0.name будут,
                //  но ни один из них не подойдет, то шаблоны для '*' не применятся вообще.
                //  FIXME: Плюс шаблоны на '*' всегда имеют более низкий приоритет.
                var templates = names[c0.name] || names['*'];
                if (templates) {
                    var i3 = 0;
                    var l3 = templates.length;
                    while (!found && i3 < l3) {
                        var tid = templates[i3++];
                        template = module[tid];

                        var selector = template.j;
                        if (selector) {
                            //  В template.j лежит id селектора (jpath'а).
                            //  В tempalte.a флаг о том, является ли jpath абсолютным.
                            if ( module.matched(selector, template.a, c0, i0, l0) ) {
                                found = tid;
                            }
                        } else {
                            var selectors = template.s;
                            var abs = template.a;
                            //  В template.s лежит массив с id-шниками селекторов.
                            for (var i4 = 0, l4 = selectors.length; i4 < l4; i4++) {
                                if ( module.matched(selectors[i4], abs[i4], c0, i0, l0) ) {
                                    found = tid;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }

        if (found) {
            //  Шаблон нашли, применяем его.
            if (args) {
                //  Шаблон позвали с параметрами, приходится изгаляться.
                r += template.apply( M, [M, c0, i0, l0, a0].concat(args) );
            } else {
                r += template(M, c0, i0, l0, a0);
            }
        }
    }

    return r;
};

//  ---------------------------------------------------------------------------------------------------------------  //

Module.prototype.matched = function matched(jpath, abs, c0, i0, l0) {
    if (jpath === 1) {
        //  Это jpath '/'
        return !c0.parent;
    }

    var l = jpath.length;
    //  i (и l) всегда будет четное.
    var i = l - 2;
    while (i >= 0) {
        if (!c0) { return false; }

        var step = jpath[i];
        //  Тут step может быть либо 0 (nametest), либо 2 (predicate).
        //  Варианты 1 (dots) и 3 (index) в jpath'ах в селекторах запрещены.
        switch (step) {
            case 0:
                //  Nametest.
                var name = jpath[i + 1];
                if (name !== '*' && name !== c0.name) { return false; }
                c0 = c0.parent;
                break;

            case 2:
            case 4:
                //  Predicate or guard.
                var predicate = jpath[i + 1];
                if ( !predicate(this, c0, i0, l0) ) { return false; }
                break;
        }

        i -= 2;
    }

    if (abs && c0.parent) {
        return false;
    }

    return true;
};

//  ---------------------------------------------------------------------------------------------------------------  //

//  NOTE: ex selectN.
Module.prototype.s = function selectN(jpath, node) {
    return this.n( jpath, [ node ] );
};

//  NOTE: ex selectNs.
Module.prototype.n = function selectNs(jpath, nodeset) {

    var current = nodeset;
    var m = current.length;

    var result;
    for (var i = 0, n = jpath.length; i < n; i += 2) {
        result = [];

        var type = jpath[i];
        var step = jpath[i + 1];

        switch (type) {

            case 0: // Это nametest (.foo или .*), в step 'foo' или '*'.
                for (var j = 0; j < m; j++) {
                    yr.selectNametest(step, current[j], result);
                }
                break;

            case 1: // Это dots (., .., ...), в step количество шагов минус один ( . -- 0, .. -- 1, ... -- 2 и т.д. ).
                for (var j = 0; j < m; j++) {
                    var k = 0;
                    var node = current[j];
                    while (k < step && node) {
                        node = node.parent;
                        k++;
                    }
                    if (node) {
                        result.push(node);
                    }
                }
                break;

            case 2: // Это filter, в step предикат.
                for (var j = 0; j < m; j++) {
                    var node = current[j];
                    if (step(this, node, j, m)) { // Предикат принимает четыре параметра: module, node, index и count.
                        result.push(node);
                    }
                }
                break;

            case 3: // Это index, в step индекс нужного элемента.
                var node = current[ step ];
                result = (node) ? [ node ] : [];
                break;

            case 4:
                //  Это глобальный гвард.
                if (m > 0) {
                    var node = current[0];
                    if ( step(this, node.doc.root, 0, 1) ) {
                        result = result.concat(current);
                    }
                }

        }

        current = result;
        m = current.length;

        if (!m) { return []; }
    }

    return result;
};

yr.selectNametest = function selectNametest(step, context, result) {

    var data = context.data;

    if (!data || typeof data !== 'object') { return result; }

    if (step === '*') {
        if (Array.isArray(data)) {
            for (var i = 0, l = data.length; i < l; i++) {
                yr.selectNametest(i, context, result);
            }
        } else {
            for (step in data) {
                yr.selectNametest(step, context, result);
            }
        }
        return result;
    }

    data = data[step];
    if (data === undefined) { return result; }

    var doc = context.doc;
    if (Array.isArray(data)) {
        for (var i = 0, l = data.length; i < l; i++) {
            result.push({
                data: data[i],
                parent: context,
                name: step,
                //  FIXME: Не нравится мне этот doc.
                doc: doc
            });
        }
    } else {
        result.push({
            data: data,
            parent: context,
            name: step,
            //  FIXME: Не нравится мне этот doc.
            doc: doc
        });
    }

    return result;
};

yr.document = function(nodeset) {
    var doc;
    if (!nodeset.length) {
        doc = new Doc( {} );
    } else {
        doc = new Doc( nodeset[0].data );
    }
    return [ doc.root ];
};

yr.subnode = function(name, data, context) {
    var doc = context.doc;

    if (Array.isArray(data)) {
        var nodeset = [];
        for (var i = 0, l = data.length; i < l; i++) {
            nodeset.push({
                data: data[i],
                name: name,
                parent: context,
                doc: doc
            });
        }
        return nodeset;
    }

    return [
        {
            data: data,
            name: name,
            parent: context,
            doc: doc
        }
    ];
};

//  ---------------------------------------------------------------------------------------------------------------  //

//  Глобальные переменные у нас "ленивые" с кэшированием.
//  В this[name] находится только лишь функция,
//  вычисляющая нужное значение.
//
//  NOTE: ex vars
Module.prototype.v = function vars(id, c0) {
    var vars = c0.doc._vars;
    var value = vars[id];
    if (value === undefined) {
        var var_ = this.findSymbol(id);
        value = (typeof var_ === 'function') ? var_(this, c0, 0, 1) : var_;
        vars[id] = value;
    }
    return value;
};

//  FIXME: Тут еще бывает a0, а иногда не бывает.
//
//  NOTE: ex funcs
Module.prototype.f = function funcs(id, c0, i0, l0, v0) {
    var func = this.findSymbol(id);

    if (arguments.length > 5) {
        //  Два и более аргументов.
        var args = Array.prototype.slice.call(arguments);
        args[0] = this;
        return func.apply(this, args);
    }

    if (v0 !== undefined) {
        //  Один аргумент.
        return func(this, c0, i0, l0, v0);
    }

    //  Без аргументов.
    return func(this, c0, i0, l0);
};

//  NOTE: ex keys.
Module.prototype.k = function keys(id, use, c0, multiple) {
    var keys = c0.doc._keys;

    var key = this.findSymbol(id);

    var cache = keys[id];
    if (!cache) {
        cache = this._initKey(key, id, use, c0);
    }

    var values = cache.values;
    var nodes = cache.nodes;

    var that = this;

    if (multiple) {
        //  В use -- нодесет.
        var r;

        if (cache.xml) {
            r = '';
            for (var i = 0, l = use.length; i < l; i++) {
                var c0 = use[i];
                r += getValue( yr.nodeValue(c0) );
            }
        } else {
            r = [];
            for (var i = 0, l = use.length; i < l; i++) {
                var c0 = use[i];
                r = r.concat( getValue( yr.nodeValue(c0) ) );
            }
        }

        return r;

    } else {
        //  В use -- скаляр.
        var value = values[use];
        if (value === undefined) {
            value = getValue(use);
        }

        return value;

    }

    function getValue(use) {
        var nodes_ = nodes[use];

        var r;
        if (cache.xml) {
            r = '';
            if (nodes_) {
                for (var i = 0, l = nodes_.length; i < l; i++) {
                    var node = nodes_[i];
                    //  FIXME: Нельзя ли тут последний параметр сделать общим,
                    //  а не создавать его для каждого элемента цикла?
                    r += key.b( that, node.c, node.i, node.l, {} );
                }
            }
        } else {
            r = [];
            if (nodes_) {
                for (var i = 0, l = nodes_.length; i < l; i++) {
                    var node = nodes_[i];
                    r = r.concat( key.b(that, node.c, node.i, node.l) );
                }
            }
        }

        values[use] = r;

        return r;
    }

};

Module.prototype._initKey = function(key, id, use, c0) {
    var keys = c0.doc._keys;
    var cache = keys[id] = {};

    //  Тело ключ имеет тип xml.
    cache.xml = (key.bt === 'xml');

    //  Вычисляем нодесет с нодами, которые матчатся ключом.
    var matched = key.n(this, c0);
    //  Хранилище для этих нод.
    var nodes = cache.nodes = {};

    //  Значение use ключа может возвращать нодесет или скаляр.
    if (key.ut === 'nodeset') {
        for (var i0 = 0, l0 = matched.length; i0 < l0; i0++) {
            var c1 = matched[i0];
            //  Тип use_ -- nodeset.
            var use_ = key.u(this, c1, i0, l0);

            for (var j = 0, m = use_.length; j < m; j++) {
                store( yr.nodeValue( use_[j] ), { c: c1, i: i0, l: l0 } );
            }
        }

    } else {
        for (var i0 = 0, l0 = matched.length; i0 < l0; i0++) {
            var c1 = matched[i0];
            //  Тип use_ -- nodeset.
            var use_ = key.u(this, c1, i0, l0);

            store( use_, { c: c1, i: i0, l: l0 } );
        }

    }

    //  Хранилище для уже вычисленных значений ключа.
    cache.values = {};

    return cache;

    //  Сохраняем ноду по соответствующему ключу.
    //  Одному ключу может соответствовать несколько нод.
    function store(key, info) {
        var items = nodes[key];
        if (!items) {
            items = nodes[key] = [];
        }
        items.push(info);
    }


};

//  ---------------------------------------------------------------------------------------------------------------  //

Module.prototype.findSymbol = function(id) {
    var imports = this.imports;
    for (var i = 0, l = imports.length; i < l; i++) {
        var module = imports[i];
        var symbol = module[id];
        if (symbol !== undefined) { return symbol; }
    }
};

//  ---------------------------------------------------------------------------------------------------------------  //

function Doc(data, nodeName) {
    //  FIXME: Что тут использовать? Array.isArray?
    if (Array.isArray(data)) {
        data = {
            //  FIXME: Сделать название поля ('item') настраеваемым.
            'item': data
        };
    }

    this.root = {
        data: data,
        parent: null,
        name: nodeName || '',
        doc: this
    };

    this._vars = {};
    this._keys = {};
}

//  ---------------------------------------------------------------------------------------------------------------  //



yr.Module = Module;

//  ---------------------------------------------------------------------------------------------------------------  //

})();

//  ---------------------------------------------------------------------------------------------------------------  //

//  NOTE: Для использования из node.js.
//  При этом недостаточно просто проверить window/document.
//  Потому что в тестах runtime грузится не как модуль (пока что, надеюсь),
//  но просто эвалится, поэтому в нем module не определен.
//
if (typeof module !== 'undefined') {
    module.exports = yr;
}


},{}]},{},[1]);
