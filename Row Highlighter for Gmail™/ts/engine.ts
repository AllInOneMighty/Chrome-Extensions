namespace row_highlighter {
  const EMAIL_UNREAD_COLOR = 'FFEB86';
  const EMAIL_READ_COLOR = 'CDF39F';
  const CONTACTS_HOVER_COLOR = 'FFF2B2';

  export function injectCss() {
    const head = document.querySelector('head');

    if (head != null) {
      // // Retrieve user settings and apply styles
      // chrome.extension.sendMessage({}, function(response) {
      // var storage = JSON.parse(response);

      // Create styles
      var script = document.createElement('style');

      // Gmail
      script.innerText += 'table.zt tr.yO:hover {background-color: #' +
          EMAIL_UNREAD_COLOR + ' !important;} ';
      script.innerText += 'table.zt tr.zE:hover {background-color: #' +
          EMAIL_READ_COLOR + ' !important;} ';

      // Contacts
      script.innerText += 'div.XXcuqd div.zYQnTe:hover {background-color: #' +
          CONTACTS_HOVER_COLOR + ' !important;} ';

      // Add styles to head of main frame
      head.appendChild(script);
      // });
    }
  }
}

row_highlighter.injectCss();