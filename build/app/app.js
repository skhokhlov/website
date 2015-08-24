(function (window) {
    var loc = window.location.pathname;
    if (loc === '/') {
        document.getElementsByClassName('nav__link_home')[0].classList.add('nav__link_active');

    } else if (loc === '/around-me' || loc === '/bookshelf' || /\/feed\/./.test(loc)) {
        document.getElementsByClassName('nav__link_aroundme')[0].classList.add('nav__link_active');

    } else if (loc === '/contacts') {
        document.getElementsByClassName('nav__link_contacts')[0].classList.add('nav__link_active');

    } else if (loc === '/who-i-am') {
        document.getElementsByClassName('nav__link_whoiam')[0].classList.add('nav__link_active');

    }
})(window);
