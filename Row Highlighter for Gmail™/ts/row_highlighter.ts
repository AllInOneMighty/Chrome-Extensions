namespace row_highlighter {
  export function injectCss() {
    const head = document.querySelector('head');

    if (head != null) {
      // // Retrieve user settings and apply styles
      // chrome.extension.sendMessage({}, function(response) {
      // var storage = JSON.parse(response);

      // Create styles
      var script = document.createElement('style');

      // Gmail
      script.innerText += 'table.zt tr.zE:hover {background-color: #' +
      common.DEFAULT_COLORS[common.ColorId.EMAIL_UNREAD] + ' !important;} ';
      script.innerText += 'table.zt tr.yO:hover {background-color: #' +
          common.DEFAULT_COLORS[common.ColorId.EMAIL_READ] + ' !important;} ';

      // Add styles to head of main frame
      head.appendChild(script);
      // });
    }
  }
}  // namespace row_highlighter

row_highlighter.injectCss();