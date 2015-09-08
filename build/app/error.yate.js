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
        r0 += "<div class=\"" + "page__content" + "\">";
        r0 += "<header class=\"" + "header" + "\">";
        r0 += "<nav class=\"" + "nav" + "\">";
        r0 += "<a class=\"" + "nav__link nav__link_home" + "\" href=\"" + "/" + "\">";
        r0 += "<span style=\"" + "padding-right:0.5em;" + "\">" + "Сергей Хохлов" + "</span>";
        r0 += "<svg style=\"" + "width: 20px;position: relative;height: 20px;top: 3px;" + "\" height=\"" + "32" + "\" viewBox=\"" + "0 0 32 32" + "\" width=\"" + "32" + "\" xmlns=\"" + "http://www.w3.org/2000/svg" + "\"><g fill=\"" + "none" + "\" stroke=\"" + "#FFF" + "\" stroke-linecap=\"" + "round" + "\" stroke-linejoin=\"" + "round" + "\" stroke-miterlimit=\"" + "10" + "\" stroke-width=\"" + "2" + "\"><path d=\"" + "M649 138h26v18h-14M653 156h-4v-14M661 156l-8 6v-6" + "\"></path></g><path d=\"" + "M21.947 16.332C23.22 14.915 24 13.05 24 11c0-4.41-3.59-8-8-8s-8 3.59-8 8 3.59 8 8 8c1.555 0 3.003-.453 4.233-1.224 4.35 1.64 7.345 5.62 7.726 10.224H4.04c.26-3.1 1.713-5.99 4.078-8.05.417-.364.46-.995.097-1.412-.362-.416-.994-.46-1.41-.097C3.75 21.104 2 24.95 2 29c0 .553.448 1 1 1h26c.553 0 1-.447 1-1 0-5.486-3.18-10.385-8.053-12.668zM10 11c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6-6-2.69-6-6z" + "\"></path></svg>";
        r0 += "</a>";
        r0 += "<a class=\"" + "nav__link nav__link_aroundme" + "\" href=\"" + "/around-me" + "\">" + "Вокруг меня" + "</a>";
        r0 += "<a class=\"" + "nav__link nav__link_whoiam" + "\" href=\"" + "/who-i-am" + "\">" + "Кто я" + "</a>";
        r0 += "<a class=\"" + "nav__link nav__link_contacts" + "\" href=\"" + "/contacts" + "\">" + "Контакты" + "</a>";
        r0 += "</nav>";
        r0 += "</header>";
        r0 += "<div class=\"" + "body" + "\">";
        r0 += "<div class=\"" + "body__content" + "\">";
        r0 += "<h2 class=\"" + "title" + "\">";
        r0 += simpleScalar('head', c0);
        r0 += "</h2>";
        r0 += "<h1 class=\"" + "title" + "\">" + nodeset2xml( ( selectNametest('title', c0, []) ) ) + "</h1>";
        r0 += "<p><a href=\"" + "/" + "\" class=\"" + "link" + "\">" + "На главную" + "</a></p>";
        r0 += "</div>";
        r0 += "</div>";
        r0 += "<footer";
        a0.a = {
        };
        a0.s = 'footer';
        var r1 = '';
        var a1 = { a: {} };
        r1 += "footer layout";
        a0.a[ "class" ] = new yr.scalarAttr(r1);
        r0 += closeAttrs(a0);
        r0 += "<div class=\"" + "footer__col layout__col layout__col_size_50p footer__col_left" + "\">";
        r0 += "<p>" + "Электропочта: " + "<a class=\"" + "link footer__link" + "\" href=\"" + "mailto:sergeyakhokhlov@gmail.com" + "\">" + "sergeyakhokhlov@gmail.com" + "</a></p>";
        r0 += "</div>";
        r0 += "<div class=\"" + "footer__col layout__col layout__col_size_50p footer__col_right" + "\">";
        r0 += "<p>" + "© Сергей Хохлов" + "</p>";
        r0 += "</div>";
        r0 += "</footer>";
        r0 += "</div>";
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
