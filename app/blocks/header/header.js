blockjs('header', {
    'load': () => {
        const loc = window.location.pathname;

        if (loc === '/') {
            document.getElementsByClassName('header__nav-link_home')[0].classList.add('header__nav-link_active');

        } else if (loc === '/around-me' || loc === '/bookshelf' || /\/feed\/./.test(loc)) {
            document.getElementsByClassName('header__nav-link_aroundme')[0].classList.add('header__nav-link_active');

        } else if (loc === '/who-i-am') {
            document.getElementsByClassName('header__nav-link_whoiam')[0].classList.add('header__nav-link_active');

        }
    }
});
