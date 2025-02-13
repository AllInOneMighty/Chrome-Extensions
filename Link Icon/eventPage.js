chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request == 'getUserSettings') {
      sendResponse(JSON.stringify(localStorage));
    }
  }
);

var lastActivatedTabId = null;
chrome.tabs.onActivated.addListener(function(activeInfo) {
  if (lastActivatedTabId != null) {
    chrome.tabs.sendMessage(lastActivatedTabId, 'tabs.onActivated');
  }
  lastActivatedTabId = activeInfo.tabId;
});