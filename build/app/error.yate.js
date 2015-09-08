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

    var j1 = [ 0, 'code' ];

    var j2 = [ 0, 'title' ];

    var j3 = [ 0, 'head' ];

    // match /
    M.t0 = function t0(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<!DOCTYPE html>";
        r0 += "<html>";
        r0 += "<head>";
        r0 += "<title>" + nodeset2xml( ( selectNametest('code', c0, []) ) ) + " " + nodeset2xml( ( selectNametest('title', c0, []) ) ) + "</title>";
        r0 += "<link rel=\"" + "stylesheet" + "\" href=\"" + "/public/app.css" + "\"/>";
        r0 += "<link type=\"" + "image/x-icon" + "\" rel=\"" + "shortcut icon" + "\" href=\"" + "/images/icon/icon.ico" + "\"/>";
        r0 += "</head>";
        r0 += "<body class=\"" + "page" + "\">";
        r0 += "<h2 class=\"" + "title" + "\">";
        r0 += simpleScalar('head', c0);
        r0 += "</h2>";
        r0 += "<h1 class=\"" + "title" + "\">" + nodeset2xml( ( selectNametest('title', c0, []) ) ) + "</h1>";
        r0 += "</body>";
        r0 += "</html>";

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

    yr.register('error', M);

})();
