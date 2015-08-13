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

    var j4 = [ 0, 'page' ];

    var j5 = [ 0, 'page-blocks', 0, '*' ];

    var j6 = [ 0, '*' ];

    var j7 = [ 1, 0 ];

    var j8 = [ 0, 'footer' ];

    var j9 = [ 0, 'body' ];

    var j10 = [ 0, 'content' ];

    var j11 = [ 0, 'pages' ];

    var j12 = [ 0, 'list', 0, 'pagelist' ];

    var j13 = [ 0, 'pagelist' ];

    var j14 = [ 0, 'title' ];

    // match /
    M.t0 = function t0(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += m.a(m, 0, selectNametest('page', c0, []), '', a0)
        r0 += closeAttrs(a0);
        r0 += "<div class=\"" + "i-stat" + "\">";
        r0 += "<noscript><img src=\"" + "//mc.yandex.ru/watch/206275" + "\" style=\"" + "position:absolute; left:-9999px;" + "\"/></noscript>";
        r0 += "</div>";

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
        r0 += m.a(m, 0, m.s(j5, c0), 'block', a0)
        r0 += closeAttrs(a0);
        r0 += "</div>";

        return r0;
    };
    M.t1.j = j4;
    M.t1.a = 0;

    // match .* : block
    M.t2 = function t2(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += m.a(m, 0, m.s(j7, c0), 'block-content', a0)

        return r0;
    };
    M.t2.j = j6;
    M.t2.a = 0;

    // match .* : block-content
    M.t3 = function t3(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += m.a(m, 0, selectNametest('*', c0, []), 'block', a0)

        return r0;
    };
    M.t3.j = j6;
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
    M.t4.j = j8;
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
        r0 += m.a(m, 0, m.s(j7, c0), 'block-content', a0)
        r0 += closeAttrs(a0);
        r0 += "</div>";

        return r0;
    };
    M.t5.j = j9;
    M.t5.a = 0;

    // match .body : block-content
    M.t6 = function t6(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<div class=\"" + "body__content" + "\">" + "html(  " + nodeset2xml( ( m.n(j10, m.v('v2', c0.doc.root)) ) ) + "  ) name()" + "</div>";

        return r0;
    };
    M.t6.j = j9;
    M.t6.a = 0;

    // match .pages : block-content
    M.t7 = function t7(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += m.a(m, 0, m.n(j11, m.v('v2', c0.doc.root)), '', a0)

        return r0;
    };
    M.t7.j = j11;
    M.t7.a = 0;

    // match .pages
    M.t8 = function t8(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<div";
        a0.a = {
            'class': new yr.scalarAttr("list")
        };
        a0.s = 'div';
        r0 += m.a(m, 0, m.s(j7, c0), 'list', a0)
        r0 += closeAttrs(a0);
        r0 += "</div>";

        return r0;
    };
    M.t8.j = j11;
    M.t8.a = 0;

    // match .pages : list
    M.t9 = function t9(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += m.a(m, 0, m.s(j12, c0), '', a0)

        return r0;
    };
    M.t9.j = j11;
    M.t9.a = 0;

    // match .pagelist
    M.t10 = function t10(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<p>" + nodeset2xml( ( selectNametest('title', c0, []) ) ) + "</p>";

        return r0;
    };
    M.t10.j = j13;
    M.t10.a = 0;

    M.matcher = {
        "": {
            "": [
                "t0"
            ],
            "page": [
                "t1"
            ],
            "pages": [
                "t8"
            ],
            "pagelist": [
                "t10"
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
            "pages": [
                "t7",
                "t3"
            ]
        },
        "list": {
            "pages": [
                "t9"
            ]
        }
    };
    M.imports = [];

    yr.register('app', M);

})();
