(function (window, d) {
    var loc = window.location.pathname;
    if (loc === '/') {
        d.getElementsByClassName('nav__link_home')[0].classList.add('nav__link_active');

    } else if (loc === '/around-me' || loc === '/bookshelf' || /\/feed\/./.test(loc)) {
        d.getElementsByClassName('nav__link_aroundme')[0].classList.add('nav__link_active');

    } else if (loc === '/contacts') {
        d.getElementsByClassName('nav__link_contacts')[0].classList.add('nav__link_active');

    } else if (loc === '/who-i-am' || /\/inside-me\/./.test(loc)) {
        d.getElementsByClassName('nav__link_whoiam')[0].classList.add('nav__link_active');

    }
})(window, document);
