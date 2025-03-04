namespace row_highlighter {
  // User settings
  let userSettings: Record<string, any>;

  export function loadUserSettings(value: {[key: string]: any;}) {
    if (typeof (value) === 'object') {
      userSettings = value;
    } else {
      userSettings = {};
    }
  }

  function getColor(colorId: common.ColorId) {
    return userSettings[colorId] || common.DEFAULT_COLORS[colorId];
  }

  export function injectCss() {
    const head = document.querySelector('head');

    if (head != null) {
      // Create styles
      const script = document.createElement('style');

      // Gmail
      script.innerText += 'table.zt tr.zE:hover {background-color: ' +
          getColor(common.ColorId.EMAIL_UNREAD) + ' !important;} ';
      script.innerText += 'table.zt tr.yO:hover {background-color: ' +
          getColor(common.ColorId.EMAIL_READ) + ' !important;} ';

      // Add styles to head of main frame
      head.appendChild(script);
      // });
    }
  }
}  // namespace row_highlighter

// Retrieve user settings asynchronously. Some user settings might not be taken
// in account on the first link.
chrome.storage.sync.get().then((value) => {
  row_highlighter.loadUserSettings(value);
  row_highlighter.injectCss();
});