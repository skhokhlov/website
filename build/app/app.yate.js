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

    var j5 = [ 0, 'page' ];

    var j6 = [ 0, 'page-blocks', 0, '*' ];

    var j7 = [ 0, '*' ];

    var j8 = [ 1, 0 ];

    var j9 = [ 0, 'footer' ];

    var j10 = [ 0, 'body' ];

    var j11 = [ 0, 'book' ];

    var j12 = [ 0, 'param', 0, 'image' ];

    var j13 = [ 0, 'param', 0, 'author' ];

    var j14 = [ 0, 'param', 0, 'original' ];

    var j15 = [ 0, 'param', 0, 'original', 0, 'image' ];

    var j16 = [ 0, 'param', 0, 'original', 0, 'title' ];

    var j17 = [ 0, 'param', 0, 'original', 0, 'author' ];

    var j18 = [ 0, 'param', 0, 'caption' ];

    var j19 = [ 0, 'pages' ];

    var j20 = [ 0, 'list', 0, 'pagelist' ];

    var j21 = [ 0, 'pagelist' ];

    // match /
    M.t0 = function t0(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<!DOCTYPE html>";
        r0 += "<html>";
        r0 += "<head>";
        r0 += "<title>" + nodeset2xml( ( m.n(j4, m.v('v0', c0.doc.root)) ) ) + "</title>";
        r0 += "<link rel=\"" + "stylesheet" + "\" href=\"" + "/public/app.css" + "\"/>";
        r0 += "</head>";
        r0 += "<body";
        a0.a = {
            'class': new yr.scalarAttr("page")
        };
        a0.s = 'body';
        r0 += m.a(m, 0, selectNametest('page', c0, []), '', a0)
        r0 += closeAttrs(a0);
        r0 += "</body>";
        r0 += "</html>";

        return r0;
    };
    M.t0.j = 1;
    M.t0.a = 1;

    // match .page
    M.t1 = function t1(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<div";
        a0.a = {
            'class': new yr.scalarAttr("page__content")
        };
        a0.s = 'div';
        r0 += m.a(m, 0, m.s(j6, c0), 'block', a0)
        r0 += closeAttrs(a0);
        r0 += "</div>";

        return r0;
    };
    M.t1.j = j5;
    M.t1.a = 0;

    // match .* : block
    M.t2 = function t2(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += m.a(m, 0, m.s(j8, c0), 'block-content', a0)

        return r0;
    };
    M.t2.j = j7;
    M.t2.a = 0;

    // match .* : block-content
    M.t3 = function t3(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += m.a(m, 0, selectNametest('*', c0, []), 'block', a0)

        return r0;
    };
    M.t3.j = j7;
    M.t3.a = 0;

    // match .footer : block-content
    M.t4 = function t4(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<div";
        a0.a = {
        };
        a0.s = 'div';
        var r1 = '';
        var a1 = { a: {} };
        r1 += "footer";
        a0.a[ "class" ] = new yr.scalarAttr(r1);
        r0 += closeAttrs(a0);
        r0 += "<p>" + "© Сергей Хохлов" + "</p>";
        r0 += "</div>";

        return r0;
    };
    M.t4.j = j9;
    M.t4.a = 0;

    // match .body : block
    M.t5 = function t5(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<div";
        a0.a = {
            'class': new yr.scalarAttr("body")
        };
        a0.s = 'div';
        r0 += m.a(m, 0, m.s(j8, c0), 'block-content', a0)
        r0 += closeAttrs(a0);
        r0 += "</div>";

        return r0;
    };
    M.t5.j = j10;
    M.t5.a = 0;

    // match .body : block-content
    M.t6 = function t6(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<div class=\"" + "body__content" + "\">";
        r0 += nodeset2scalar( m.n(j10, m.v('v2', c0.doc.root)) );
        r0 += "</div>";

        return r0;
    };
    M.t6.j = j10;
    M.t6.a = 0;

    // match .book : block-content
    M.t7 = function t7(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<article class=\"" + "book" + "\">";
        r0 += "<section class=\"" + "book__name" + "\">";
        if (nodeset2boolean( m.n(j12, m.v('v0', c0.doc.root)) )) {
            r0 += "<img class=\"" + "image book__image" + "\" src=\"" + nodeset2attrvalue( ( m.n(j12, m.v('v0', c0.doc.root)) ) ) + "\"/>";
        }
        r0 += "<h1 class=\"" + "book__title title title_h1" + "\">" + nodeset2xml( ( m.n(j4, m.v('v0', c0.doc.root)) ) ) + "</h1>";
        r0 += "<p class=\"" + "book__author" + "\">" + nodeset2xml( ( m.n(j13, m.v('v0', c0.doc.root)) ) ) + "</p>";
        r0 += "</section>";
        if (nodeset2boolean( m.n(j14, m.v('v0', c0.doc.root)) )) {
            r0 += "<section class=\"" + "book__original" + "\">";
            r0 += "<p class=\"" + "book__blocktitle" + "\">" + "В оригинале:" + "</p>";
            if (nodeset2boolean( m.n(j15, m.v('v0', c0.doc.root)) )) {
                r0 += "<img class=\"" + "image book__image book__image_original" + "\" src=\"" + nodeset2attrvalue( ( m.n(j15, m.v('v0', c0.doc.root)) ) ) + "\"/>";
            }
            r0 += "<h2 class=\"" + "book__title book__title_original title title_h2" + "\">" + nodeset2xml( ( m.n(j16, m.v('v0', c0.doc.root)) ) ) + "</h2>";
            r0 += "<p class=\"" + "book__author book__author_original" + "\">" + nodeset2xml( ( m.n(j17, m.v('v0', c0.doc.root)) ) ) + "</p>";
            r0 += "</section>";
        }
        r0 += "<section class=\"" + "book__body" + "\">";
        r0 += "<section class=\"" + "book__caption" + "\">";
        r0 += "<p class=\"" + "book__blocktitle" + "\">" + "От автора:" + "</p>";
        r0 += "<p>" + nodeset2xml( ( m.n(j18, m.v('v0', c0.doc.root)) ) ) + "</p>";
        r0 += "</section>";
        r0 += "<section class=\"" + "book__comment" + "\">";
        r0 += nodeset2scalar( m.n(j10, m.v('v2', c0.doc.root)) );
        r0 += "</section>";
        r0 += "</section>";
        r0 += "</article>";

        return r0;
    };
    M.t7.j = j11;
    M.t7.a = 0;

    // match .pages : block-content
    M.t8 = function t8(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += m.a(m, 0, m.n(j19, m.v('v2', c0.doc.root)), '', a0)

        return r0;
    };
    M.t8.j = j19;
    M.t8.a = 0;

    // match .pages
    M.t9 = function t9(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<div";
        a0.a = {
            'class': new yr.scalarAttr("list")
        };
        a0.s = 'div';
        r0 += m.a(m, 0, m.s(j8, c0), 'list', a0)
        r0 += closeAttrs(a0);
        r0 += "</div>";

        return r0;
    };
    M.t9.j = j19;
    M.t9.a = 0;

    // match .pages : list
    M.t10 = function t10(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += m.a(m, 0, m.s(j20, c0), '', a0)

        return r0;
    };
    M.t10.j = j19;
    M.t10.a = 0;

    // match .pagelist
    M.t11 = function t11(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<p>" + nodeset2xml( ( selectNametest('title', c0, []) ) ) + "</p>";

        return r0;
    };
    M.t11.j = j21;
    M.t11.a = 0;

    M.matcher = {
        "": {
            "": [
                "t0"
            ],
            "page": [
                "t1"
            ],
            "pages": [
                "t9"
            ],
            "pagelist": [
                "t11"
            ]
        },
        "block": {
            "*": [
                "t2"
            ],
            "body": [
                "t5",
                "t2"
            ]
        },
        "block-content": {
            "*": [
                "t3"
            ],
            "footer": [
                "t4",
                "t3"
            ],
            "body": [
                "t6",
                "t3"
            ],
            "book": [
                "t7",
                "t3"
            ],
            "pages": [
                "t8",
                "t3"
            ]
        },
        "list": {
            "pages": [
                "t10"
            ]
        }
    };
    M.imports = [];

    yr.register('app', M);

})();
