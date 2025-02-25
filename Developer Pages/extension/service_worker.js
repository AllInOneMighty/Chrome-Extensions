"use strict";
var developer_pages;
(function (developer_pages) {
    const GROUP_PREFIX = 'group:';
    developer_pages.CLICKABLE_PREFIX = 'clickable:';
    const SEPARATOR_PREFIX = 'separator:';
    let ClickableMenuId;
    (function (ClickableMenuId) {
        ClickableMenuId["ABOUT"] = "about";
        ClickableMenuId["APP_SERVICE_INTERNAL"] = "app-service-internals";
        ClickableMenuId["APPS"] = "apps";
        ClickableMenuId["ATTRIBUTION_INTERNALS"] = "attribution-internals";
        ClickableMenuId["BOOKMARKS"] = "bookmarks";
        ClickableMenuId["BOOKMARKS_SIDE_PANEL"] = "bookmarks-side-panel";
        ClickableMenuId["CRASHES"] = "crashes";
        ClickableMenuId["CREDITS"] = "credits";
        ClickableMenuId["DINO"] = "dino";
        ClickableMenuId["DOWNLOADS"] = "downloads";
        ClickableMenuId["EXTENSIONS"] = "extensions";
        ClickableMenuId["FLAGS"] = "flags";
        ClickableMenuId["HISTORY_CLUSTERS"] = "history-clusters";
        ClickableMenuId["HISTORY_VIEW"] = "history-view";
        ClickableMenuId["INSPECT"] = "insepct";
        ClickableMenuId["INTERSTITIALS"] = "interstitials";
        ClickableMenuId["LINUX_PROXY_CONFIG"] = "linux-proxy-config";
        ClickableMenuId["MANAGEMENT"] = "management";
        ClickableMenuId["NETWORK_ERRORS"] = "network-errors";
        ClickableMenuId["PASSWORD_MANAGER"] = "password-manager";
        ClickableMenuId["PROFILES"] = "profiles";
        ClickableMenuId["READING_LIST"] = "reading-list";
        ClickableMenuId["SETTINGS"] = "settings";
        ClickableMenuId["SITE_ENGAGEMENT"] = "site-engagement";
        ClickableMenuId["SYSTEM"] = "system";
        ClickableMenuId["TERMS"] = "terms";
        ClickableMenuId["VERSION"] = "version";
    })(ClickableMenuId = developer_pages.ClickableMenuId || (developer_pages.ClickableMenuId = {}));
    developer_pages.MENU_ID_TO_URL = {
        [ClickableMenuId.ABOUT]: 'about:help',
        [ClickableMenuId.APP_SERVICE_INTERNAL]: 'about:app-service-internals',
        [ClickableMenuId.APPS]: 'about:apps',
        [ClickableMenuId.ATTRIBUTION_INTERNALS]: 'about:attribution-internals',
        [ClickableMenuId.BOOKMARKS]: 'about:bookmarks',
        [ClickableMenuId.BOOKMARKS_SIDE_PANEL]: 'about:bookmarks-side-panel.top-chrome',
        [ClickableMenuId.CRASHES]: 'about:crashes',
        [ClickableMenuId.CREDITS]: 'about:credits',
        [ClickableMenuId.DINO]: 'about:dino',
        [ClickableMenuId.DOWNLOADS]: 'about:downloads',
        [ClickableMenuId.EXTENSIONS]: 'about:extensions',
        [ClickableMenuId.FLAGS]: 'about:flags',
        [ClickableMenuId.HISTORY_CLUSTERS]: 'about:history-clusters-side-panel.top-chrome',
        [ClickableMenuId.HISTORY_VIEW]: 'about:history',
        [ClickableMenuId.INSPECT]: 'about:inspect',
        [ClickableMenuId.INTERSTITIALS]: 'about:interstitials',
        [ClickableMenuId.LINUX_PROXY_CONFIG]: 'about:linux-proxy-config',
        [ClickableMenuId.MANAGEMENT]: 'about:management',
        [ClickableMenuId.NETWORK_ERRORS]: 'about:network-errors',
        [ClickableMenuId.PASSWORD_MANAGER]: 'about:password-manager',
        [ClickableMenuId.PROFILES]: 'about:profile-internals',
        [ClickableMenuId.READING_LIST]: 'about:read-later.top-chrome',
        [ClickableMenuId.SETTINGS]: 'about:settings',
        [ClickableMenuId.SITE_ENGAGEMENT]: 'about:site-engagement',
        [ClickableMenuId.SYSTEM]: 'about:system',
        [ClickableMenuId.TERMS]: 'about:terms',
        [ClickableMenuId.VERSION]: 'about:version',
    };
    let nextSeparatorId = 1;
    function addMenuGroup(id, title, parentId) {
        chrome.contextMenus.create({
            'id': GROUP_PREFIX + id,
            'title': title,
            'parentId': parentId != undefined ? GROUP_PREFIX + parentId : undefined,
            'contexts': ['all'],
        });
    }
    developer_pages.addMenuGroup = addMenuGroup;
    function addClickableMenu(id, title, parentId) {
        chrome.contextMenus.create({
            'id': developer_pages.CLICKABLE_PREFIX + id,
            'title': title,
            'parentId': GROUP_PREFIX + parentId,
            'contexts': ['all'],
        });
    }
    developer_pages.addClickableMenu = addClickableMenu;
    function addSeparator(parentId) {
        chrome.contextMenus.create({
            'id': SEPARATOR_PREFIX + nextSeparatorId,
            'type': 'separator',
            'parentId': GROUP_PREFIX + parentId
        });
        nextSeparatorId++;
    }
    developer_pages.addSeparator = addSeparator;
    function openUrl(url) {
        chrome.tabs.create({ 'url': url });
    }
    developer_pages.openUrl = openUrl;
})(developer_pages || (developer_pages = {}));
developer_pages.addMenuGroup("browser-links", 'Browser Links');
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.APPS, 'Apps', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.BOOKMARKS, 'Bookmarks', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.CRASHES, 'Crashes', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.DOWNLOADS, 'Downloads', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.EXTENSIONS, 'Extensions', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.FLAGS, 'Flags', "browser-links");
developer_pages.addMenuGroup("history", 'History', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.HISTORY_VIEW, 'View', "history");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.HISTORY_CLUSTERS, 'Clusters', "history");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.INSPECT, 'Inspect', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.PASSWORD_MANAGER, 'Password Manager', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.READING_LIST, 'Reading List', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.SETTINGS, 'Settings', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.SITE_ENGAGEMENT, 'Site Engagement', "browser-links");
developer_pages.addSeparator("browser-links");
developer_pages.addMenuGroup("debug", 'Debug', "browser-links");
developer_pages.addMenuGroup("fun", 'Fun', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.DINO, 'Dino', "fun");
developer_pages.addMenuGroup("internals", 'Internals', "browser-links");
developer_pages.addMenuGroup("reference", 'Reference', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.INTERSTITIALS, 'Interstitials', "reference");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.NETWORK_ERRORS, 'Network Errors', "reference");
developer_pages.addMenuGroup("settings", 'Settings', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.MANAGEMENT, 'Management', "settings");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.PROFILES, 'Profiles', "settings");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.LINUX_PROXY_CONFIG, 'Proxy Configuration', "settings");
developer_pages.addSeparator("browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.ABOUT, 'About', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.CREDITS, 'Credits', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.TERMS, 'Terms', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.VERSION, 'Version', "browser-links");
chrome.contextMenus.onClicked.addListener((info, _tab) => {
    const menuItemId = info.menuItemId;
    if (menuItemId.startsWith(developer_pages.CLICKABLE_PREFIX)) {
        const menuId = menuItemId.substring(developer_pages.CLICKABLE_PREFIX.length);
        developer_pages.openUrl(developer_pages.MENU_ID_TO_URL[menuId]);
    }
});
