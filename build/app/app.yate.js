var yr = yr || require('yate/lib/runtime.js');

(function() {

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

    var j0 = [ 0, 'page', 0, 'page-params' ];

    //  var params : nodeset
    M.v0 = function(m, c0, i0, l0) {
        return m.s(j0, c0.doc.root);
    };

    var j1 = [ 0, '_page' ];

    //  var page : nodeset
    M.v1 = function(m, c0, i0, l0) {
        return m.n(j1, m.v('v0', c0.doc.root));
    };

    var j2 = [ 0, 'page', 0, 'page-content' ];

    //  var content : nodeset
    M.v2 = function(m, c0, i0, l0) {
        return m.s(j2, c0.doc.root);
    };

    var j3 = [ ];

    var j4 = [ 0, 'title' ];

    var j5 = [ 0, 'keywords' ];

    var j6 = [ 0, 'page' ];

    var j7 = [ 0, 'hostname' ];

    var j8 = [ 0, '*' ];

    var j9 = [ 1, 0 ];

    var j10 = [ 0, 'body' ];

    var j11 = [ 0, 'book' ];

    var j12 = [ 0, 'param', 0, 'image' ];

    var j13 = [ 0, 'param', 0, 'author' ];

    var j14 = [ 0, 'param', 0, 'original' ];

    var j15 = [ 0, 'param', 0, 'original', 0, 'author' ];

    var j16 = [ 0, 'param', 0, 'original', 0, 'title' ];

    var j17 = [ 0, 'param', 0, 'caption' ];

    var j18 = [ 0, 'counter' ];

    var j19 = [ 0, 'footer' ];

    var j20 = [ 0, 'header' ];

    var j21 = [ 0, 'page-blocks', 0, '*' ];

    // match /
    M.t0 = function t0(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<!DOCTYPE html>";
        r0 += "<html>";
        r0 += "<head>";
        r0 += "<meta name=\"" + "viewport" + "\" content=\"" + "width=device-width, initial-scale=1" + "\"/>";
        r0 += "<title>" + nodeset2xml( ( m.n(j4, m.v('v0', c0.doc.root)) ) ) + "</title>";
        r0 += "<link rel=\"" + "stylesheet" + "\" href=\"" + "/public/app.css" + "\"/>";
        r0 += "<link type=\"" + "image/x-icon" + "\" rel=\"" + "shortcut icon" + "\" href=\"" + "/images/icon/icon-me.ico" + "\"/>";
        r0 += "<meta name=\"" + "keywords" + "\" content=\"" + nodeset2attrvalue( ( m.n(j5, m.v('v2', c0.doc.root)) ) ) + "\"/>";
        r0 += "</head>";
        r0 += "<body";
        a0.a = {
        };
        a0.s = 'body';
        r0 += m.a(m, 0, selectNametest('page', c0, []), '', a0)
        r0 += closeAttrs(a0);
        r0 += "<script async=\"" + "async" + "\" src=\"" + "/public/app.js" + "\"></script>";
        r0 += "</body>";
        r0 += "</html>";
        r0 += "\n<!-- " + nodeset2scalar( m.n(j7, m.v('v0', c0.doc.root)) ) + " -->";

        return r0;
    };
    M.t0.j = 1;
    M.t0.a = 1;

    // match .* : block
    M.t1 = function t1(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += m.a(m, 0, m.s(j9, c0), 'block-content', a0)

        return r0;
    };
    M.t1.j = j8;
    M.t1.a = 0;

    // match .* : block-content
    M.t2 = function t2(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += m.a(m, 0, selectNametest('*', c0, []), 'block', a0)

        return r0;
    };
    M.t2.j = j8;
    M.t2.a = 0;

    // match .body : block
    M.t3 = function t3(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<div";
        a0.a = {
            'class': new yr.scalarAttr("body")
        };
        a0.s = 'div';
        r0 += m.a(m, 0, m.s(j9, c0), 'block-content', a0)
        r0 += closeAttrs(a0);
        r0 += "</div>";

        return r0;
    };
    M.t3.j = j10;
    M.t3.a = 0;

    // match .body : block-content
    M.t4 = function t4(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<div class=\"" + "body__content" + "\">";
        r0 += nodeset2scalar( m.n(j10, m.v('v2', c0.doc.root)) );
        r0 += "</div>";

        return r0;
    };
    M.t4.j = j10;
    M.t4.a = 0;

    // match .book : block-content
    M.t5 = function t5(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<div class=\"" + "book" + "\" itemscope=\"" + "itemscope" + "\" itemtype=\"" + "http://schema.org/Book" + "\">";
        r0 += "<p><a href=\"" + "/bookshelf" + "\" class=\"" + "link" + "\">" + "Книжная полка" + "</a></p>";
        r0 += "<div class=\"" + "layout" + "\">";
        r0 += "<div class=\"" + "book__name" + "\">";
        if (nodeset2boolean( m.n(j12, m.v('v0', c0.doc.root)) )) {
            r0 += "<div class=\"" + "book__section" + "\"><img class=\"" + "image book__image" + "\" src=\"" + nodeset2attrvalue( ( m.n(j12, m.v('v0', c0.doc.root)) ) ) + "\" itemprop=\"" + "image" + "\"/></div>";
        }
        r0 += "<div class=\"" + "book__section" + "\">";
        r0 += "<h1 class=\"" + "book__title title title_h1" + "\" itemprop=\"" + "name" + "\">" + nodeset2xml( ( m.n(j4, m.v('v0', c0.doc.root)) ) ) + "</h1>";
        r0 += "<p class=\"" + "title book__author" + "\" itemprop=\"" + "author" + "\">" + nodeset2xml( ( m.n(j13, m.v('v0', c0.doc.root)) ) ) + "</p>";
        if (nodeset2boolean( m.n(j14, m.v('v0', c0.doc.root)) )) {
            r0 += "<div class=\"" + "book__original" + "\">";
            r0 += "<p><span>" + "В оригинале:" + "</span><br/>";
            r0 += "<span class=\"" + "book__author book__author_original" + "\">" + nodeset2xml( ( m.n(j15, m.v('v0', c0.doc.root)) ) ) + ". " + "</span>";
            r0 += "<span class=\"" + "book__title book__title_original" + "\">" + nodeset2xml( ( m.n(j16, m.v('v0', c0.doc.root)) ) ) + "</span>";
            r0 += "</p>";
            r0 += "</div>";
        }
        r0 += "</div>";
        r0 += "</div>";
        r0 += "</div>";
        r0 += "<article class=\"" + "book__body" + "\" itemprop=\"" + "review" + "\">";
        r0 += nodeset2scalar( m.n(j10, m.v('v2', c0.doc.root)) );
        r0 += "</article>";
        if (nodeset2boolean( m.n(j17, m.v('v0', c0.doc.root)) )) {
            r0 += "<div class=\"" + "book__caption" + "\" itemprop=\"" + "about" + "\">";
            r0 += "<h2 class=\"" + "title title_h2" + "\">" + "От автора" + "</h2>";
            r0 += "<p>";
            r0 += nodeset2scalar( m.n(j17, m.v('v0', c0.doc.root)) );
            r0 += "</p>";
            r0 += "</div>";
        }
        r0 += "</div>";

        return r0;
    };
    M.t5.j = j11;
    M.t5.a = 0;

    // match .counter : block-content
    M.t6 = function t6(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<div class=\"" + "i-counter" + "\">";
        r0 += nodeset2scalar( m.n(j18, m.v('v2', c0.doc.root)) );
        r0 += "</div>";

        return r0;
    };
    M.t6.j = j18;
    M.t6.a = 0;

    // match .footer : block-content
    M.t7 = function t7(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<footer";
        a0.a = {
        };
        a0.s = 'footer';
        var r1 = '';
        var a1 = { a: {} };
        r1 += "footer layout";
        a0.a[ "class" ] = new yr.scalarAttr(r1);
        r0 += closeAttrs(a0);
        r0 += "<div class=\"" + "footer__col footer__col_left" + "\">";
        r0 += "<p>" + "Электропочта: " + "<a class=\"" + "link footer__link" + "\" href=\"" + "mailto:sergey@skhokhlov.ru" + "\">" + "sergey@skhokhlov.ru" + "</a></p>";
        r0 += "</div>";
        r0 += "</footer>";

        return r0;
    };
    M.t7.j = j19;
    M.t7.a = 0;

    // match .header : block
    M.t8 = function t8(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<header class=\"" + "header" + "\">";
        r0 += "<nav class=\"" + "header__nav" + "\">";
        r0 += "<a class=\"" + "header__nav-link header__nav-link_home" + "\" href=\"" + "/" + "\">";
        r0 += "<h1 class=\"" + "header__nav-title" + "\">";
        r0 += "<span>" + "Сергей Хохлов" + "</span>";
        r0 += "</h1>";
        r0 += "</a>";
        r0 += "<a class=\"" + "header__nav-link header__nav-link_aroundme" + "\" href=\"" + "/around-me" + "\">" + "Вокруг" + "</a>";
        r0 += "<a class=\"" + "header__nav-link header__nav-link_whoiam" + "\" href=\"" + "/who-i-am" + "\">" + "Внутри" + "</a>";
        r0 += "</nav>";
        r0 += m.a(m, 0, m.s(j9, c0), 'block-content', a0)
        r0 += "</header>";

        return r0;
    };
    M.t8.j = j20;
    M.t8.a = 0;

    // match .header : block-content
    M.t9 = function t9(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<div class=\"" + "linker" + "\"></div>";

        return r0;
    };
    M.t9.j = j20;
    M.t9.a = 0;

    // match .page
    M.t10 = function t10(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<div";
        a0.a = {
            'class': new yr.scalarAttr("page")
        };
        a0.s = 'div';
        if (cmpSN("page_black", m.v('v1', c0.doc.root))) {
            var tmp0 = a0.a[ "class" ];
            if (tmp0) {
                a0.a[ "class" ] = tmp0.addscalar(" page_black");
            } else {
                a0.a[ "class" ] = new yr.scalarAttr(" page_black");
            }
        }
        r0 += closeAttrs(a0);
        r0 += "<div";
        a0.a = {
            'class': new yr.scalarAttr("page__content")
        };
        a0.s = 'div';
        r0 += m.a(m, 0, m.s(j21, c0), 'block', a0)
        r0 += closeAttrs(a0);
        r0 += "</div>";
        r0 += "</div>";

        return r0;
    };
    M.t10.j = j6;
    M.t10.a = 0;

    M.matcher = {
        "": {
            "": [
                "t0"
            ],
            "page": [
                "t10"
            ]
        },
        "block": {
            "*": [
                "t1"
            ],
            "body": [
                "t3",
                "t1"
            ],
            "header": [
                "t8",
                "t1"
            ]
        },
        "block-content": {
            "*": [
                "t2"
            ],
            "body": [
                "t4",
                "t2"
            ],
            "book": [
                "t5",
                "t2"
            ],
            "counter": [
                "t6",
                "t2"
            ],
            "footer": [
                "t7",
                "t2"
            ],
            "header": [
                "t9",
                "t2"
            ]
        }
    };
    M.imports = [];

    yr.register('app', M);

})();
