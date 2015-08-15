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

    var j0 = [ ];

    var j1 = [ 0, 'pages' ];

    var j2 = [ 0, 'image' ];

    var j3 = [ 0, 'author' ];

    var j4 = [ 0, 'caption' ];

    // match /
    M.t0 = function t0(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<section class=\"" + "feed feed_preview" + "\">";
        r0 += "<div class=\"" + "list list_inline" + "\">";
        var items0 = selectNametest('pages', c0, []);
        for (var i1 = 0, l1 = items0.length; i1 < l1; i1++) {
            var c1 = items0[ i1 ];
            r0 += "<div class=\"" + "list__item feed__item" + "\">";
            r0 += "<img class=\"" + "image list__image feed__image feed__image_preview" + "\" src=\"" + nodeset2attrvalue( ( selectNametest('image', c1, []) ) ) + "\"/>";
            r0 += "<article>";
            r0 += "<p>" + nodeset2xml( ( selectNametest('author', c1, []) ) ) + "</p>";
            r0 += "<p>" + nodeset2xml( ( selectNametest('caption', c1, []) ) ) + "</p>";
            r0 += "</article>";
            r0 += "</div>";
        }
        r0 += "</div>";
        r0 += "</section>";

        return r0;
    };
    M.t0.j = 1;
    M.t0.a = 1;

    M.matcher = {
        "": {
            "": [
                "t0"
            ]
        }
    };
    M.imports = [];

    yr.register('feed', M);

})();
