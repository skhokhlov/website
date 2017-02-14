'use strict';

(function (window, document) {
    window['blockjs'] = function (name, events) {
        var blocks = document.getElementsByClassName(name);
        var i = blocks.length;
        while (i--) {
            for (var event in Object.keys(events)) {
                if (Object.keys(events)[event] === 'load') {
                    events[Object.keys(events)[event]]();
                } else {
                    blocks[i].addEventListener(Object.keys(events)[event], events[Object.keys(events)[event]]);
                }
            }
        }
    };
})(window, document);
blockjs('header', {
    'load': function load() {
        var loc = window.location.pathname;

        if (loc === '/') {
            document.getElementsByClassName('header__nav-link_home')[0].classList.add('header__nav-link_active');
        } else if (loc === '/around-me' || loc === '/bookshelf' || /\/feed\/./.test(loc)) {
            document.getElementsByClassName('header__nav-link_aroundme')[0].classList.add('header__nav-link_active');
        } else if (loc === '/who-i-am') {
            document.getElementsByClassName('header__nav-link_whoiam')[0].classList.add('header__nav-link_active');
        }
    }
});