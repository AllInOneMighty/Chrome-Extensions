"use strict";
var row_highlighter;
(function (row_highlighter) {
    let userSettings;
    function loadUserSettings(value) {
        if (typeof (value) === 'object') {
            userSettings = value;
        }
        else {
            userSettings = {};
        }
    }
    row_highlighter.loadUserSettings = loadUserSettings;
    function getColor(colorId) {
        return userSettings[colorId] || common.DEFAULT_COLORS[colorId];
    }
    function injectCss() {
        const head = document.querySelector('head');
        if (head != null) {
            const script = document.createElement('style');
            script.innerText += 'table.zt tr.zE:hover {background-color: ' +
                getColor("email-unread-color") + ' !important;} ';
            script.innerText += 'table.zt tr.yO:hover {background-color: ' +
                getColor("email-read-color") + ' !important;} ';
            head.appendChild(script);
        }
    }
    row_highlighter.injectCss = injectCss;
})(row_highlighter || (row_highlighter = {}));
chrome.storage.sync.get().then((value) => {
    row_highlighter.loadUserSettings(value);
    row_highlighter.injectCss();
});
