// List of special pages: http://src.chromium.org/svn/trunk/src/chrome/common/url_constants.cc
// Don't use URLs just made for testing (as explained in the source)

chrome.contextMenus.create({
	"title": "Developer pages",
	"contexts": ["all"],
	"onclick": function() {chrome.tabs.create({"url":"about:chrome-urls"})}
});