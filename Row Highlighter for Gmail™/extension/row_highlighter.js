"use strict";
var row_highlighter;
(function (row_highlighter) {
    function injectCss() {
        const head = document.querySelector('head');
        if (head != null) {
            var script = document.createElement('style');
            script.innerText += 'table.zt tr.zE:hover {background-color: #' +
                common.DEFAULT_COLORS["email-unread-color"] + ' !important;} ';
            script.innerText += 'table.zt tr.yO:hover {background-color: #' +
                common.DEFAULT_COLORS["email-read-color"] + ' !important;} ';
            head.appendChild(script);
        }
    }
    row_highlighter.injectCss = injectCss;
})(row_highlighter || (row_highlighter = {}));
row_highlighter.injectCss();
