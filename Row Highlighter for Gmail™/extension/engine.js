"use strict";
var row_highlighter;
(function (row_highlighter) {
    const EMAIL_UNREAD_COLOR = 'FFEB86';
    const EMAIL_READ_COLOR = 'CDF39F';
    const CONTACTS_HOVER_COLOR = 'FFF2B2';
    function injectCss() {
        const head = document.querySelector('head');
        if (head != null) {
            var script = document.createElement('style');
            script.innerText += 'table.zt tr.yO:hover {background-color: #' +
                EMAIL_UNREAD_COLOR + ' !important;} ';
            script.innerText += 'table.zt tr.zE:hover {background-color: #' +
                EMAIL_READ_COLOR + ' !important;} ';
            script.innerText += 'div.XXcuqd div.zYQnTe:hover {background-color: #' +
                CONTACTS_HOVER_COLOR + ' !important;} ';
            head.appendChild(script);
        }
    }
    row_highlighter.injectCss = injectCss;
})(row_highlighter || (row_highlighter = {}));
row_highlighter.injectCss();
