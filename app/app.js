(function (window) {
    var loc = window.location.pathname;
    switch (loc) {
        case '/':
            document.getElementsByClassName('nav__link_home')[0].classList.add('nav__link_active');
            break;
        case '/contacts':
            document.getElementsByClassName('nav__link_contacts')[0].classList.add('nav__link_active');
            break;
    }
})(window);
