chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    sendResponse(JSON.stringify(localStorage));
  }
);