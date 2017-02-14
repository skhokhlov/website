(function (window, document) {
    window['blockjs'] = (name, events) => {
        const blocks = document.getElementsByClassName(name);
        let i = blocks.length;
        while (i--) {
            for (let event in Object.keys(events)) {
                if (Object.keys(events)[event] === 'load') {
                    events[Object.keys(events)[event]]();
                } else {
                    blocks[i].addEventListener(Object.keys(events)[event], events[Object.keys(events)[event]]);
                }
            }
        }
    };

})(window, document);
