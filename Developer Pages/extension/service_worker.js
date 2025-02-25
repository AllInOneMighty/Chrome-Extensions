"use strict";
var developer_pages;
(function (developer_pages) {
    const GROUP_PREFIX = 'group:';
    developer_pages.CLICKABLE_PREFIX = 'clickable:';
    const SEPARATOR_PREFIX = 'separator:';
    let ClickableMenuId;
    (function (ClickableMenuId) {
        ClickableMenuId["ABOUT"] = "about";
        ClickableMenuId["ALL_PAGES"] = "all-pages";
        ClickableMenuId["APP_SERVICE_INTERNAL"] = "app-service-internals";
        ClickableMenuId["APPS"] = "apps";
        ClickableMenuId["ATTRIBUTION_INTERNALS"] = "attribution-internals";
        ClickableMenuId["BOOKMARKS"] = "bookmarks";
        ClickableMenuId["BOOKMARKS_SIDE_PANEL"] = "bookmarks-side-panel";
        ClickableMenuId["COMPONENTS"] = "components";
        ClickableMenuId["CRASHES"] = "crashes";
        ClickableMenuId["CREDITS"] = "credits";
        ClickableMenuId["DEVICE_LOG"] = "device-log";
        ClickableMenuId["DEVTOOLS"] = "insepct";
        ClickableMenuId["DINO"] = "dino";
        ClickableMenuId["DISCARDS"] = "discards";
        ClickableMenuId["DOWNLOADS"] = "downloads";
        ClickableMenuId["EXTENSIONS"] = "extensions";
        ClickableMenuId["FLAGS"] = "flags";
        ClickableMenuId["HISTOGRAMS"] = "histograms";
        ClickableMenuId["HISTORY_CLUSTERS"] = "history-clusters";
        ClickableMenuId["HISTORY_VIEW"] = "history-view";
        ClickableMenuId["INTERSTITIALS"] = "interstitials";
        ClickableMenuId["LINUX_PROXY_CONFIG"] = "linux-proxy-config";
        ClickableMenuId["LOCAL_STATE"] = "local-state";
        ClickableMenuId["MANAGEMENT"] = "management";
        ClickableMenuId["MEDIA_ENGAGEMENT"] = "media-engagement";
        ClickableMenuId["NETWORK_ERRORS"] = "network-errors";
        ClickableMenuId["NETWORK_LOG_EXPORT"] = "network-log-export";
        ClickableMenuId["OMNIBOX"] = "omnibox";
        ClickableMenuId["PASSWORD_MANAGER"] = "password-manager";
        ClickableMenuId["POLICIES"] = "policies";
        ClickableMenuId["PREDICTORS"] = "predictors";
        ClickableMenuId["PROFILES"] = "profiles";
        ClickableMenuId["READING_LIST"] = "reading-list";
        ClickableMenuId["SAFE_BROWSING"] = "safe-browsing";
        ClickableMenuId["SANDBOX_STATUS"] = "sandbox-status";
        ClickableMenuId["SETTINGS"] = "settings";
        ClickableMenuId["SITE_ENGAGEMENT"] = "site-engagement";
        ClickableMenuId["SYSTEM"] = "system";
        ClickableMenuId["TERMS"] = "terms";
        ClickableMenuId["TRACING"] = "tracing";
        ClickableMenuId["UKM"] = "ukm";
        ClickableMenuId["USER_ACTIONS"] = "user-actions";
        ClickableMenuId["VERSION"] = "version";
        ClickableMenuId["WEBRTC_LOGS"] = "webrtc-logs";
        ClickableMenuId["WEBUI_GALLERY"] = "webui-gallery";
        ClickableMenuId["WEBUI_JAVASCRIPT_ERROR"] = "webui-javascript-error";
    })(ClickableMenuId = developer_pages.ClickableMenuId || (developer_pages.ClickableMenuId = {}));
    developer_pages.MENU_ID_TO_URL = {
        [ClickableMenuId.ABOUT]: 'about:help',
        [ClickableMenuId.ALL_PAGES]: 'about:chrome-urls',
        [ClickableMenuId.APP_SERVICE_INTERNAL]: 'about:app-service-internals',
        [ClickableMenuId.APPS]: 'about:apps',
        [ClickableMenuId.ATTRIBUTION_INTERNALS]: 'about:attribution-internals',
        [ClickableMenuId.BOOKMARKS]: 'about:bookmarks',
        [ClickableMenuId.BOOKMARKS_SIDE_PANEL]: 'about:bookmarks-side-panel.top-chrome',
        [ClickableMenuId.COMPONENTS]: 'about:components',
        [ClickableMenuId.CRASHES]: 'about:crashes',
        [ClickableMenuId.CREDITS]: 'about:credits',
        [ClickableMenuId.DEVICE_LOG]: 'about:device-log',
        [ClickableMenuId.DINO]: 'about:dino',
        [ClickableMenuId.DISCARDS]: 'about:discards',
        [ClickableMenuId.DOWNLOADS]: 'about:downloads',
        [ClickableMenuId.EXTENSIONS]: 'about:extensions',
        [ClickableMenuId.FLAGS]: 'about:flags',
        [ClickableMenuId.HISTOGRAMS]: 'about:histograms',
        [ClickableMenuId.HISTORY_CLUSTERS]: 'about:history-clusters-side-panel.top-chrome',
        [ClickableMenuId.HISTORY_VIEW]: 'about:history',
        [ClickableMenuId.DEVTOOLS]: 'about:inspect',
        [ClickableMenuId.INTERSTITIALS]: 'about:interstitials',
        [ClickableMenuId.LINUX_PROXY_CONFIG]: 'about:linux-proxy-config',
        [ClickableMenuId.LOCAL_STATE]: 'about:local-state',
        [ClickableMenuId.MANAGEMENT]: 'about:management',
        [ClickableMenuId.MEDIA_ENGAGEMENT]: 'about:media-engagement',
        [ClickableMenuId.NETWORK_ERRORS]: 'about:network-errors',
        [ClickableMenuId.NETWORK_LOG_EXPORT]: 'about:net-export',
        [ClickableMenuId.OMNIBOX]: 'about:omnibox',
        [ClickableMenuId.PASSWORD_MANAGER]: 'about:password-manager',
        [ClickableMenuId.POLICIES]: 'about:policy',
        [ClickableMenuId.PREDICTORS]: 'about:predictors',
        [ClickableMenuId.PROFILES]: 'about:profile-internals',
        [ClickableMenuId.READING_LIST]: 'about:read-later.top-chrome',
        [ClickableMenuId.SAFE_BROWSING]: 'about:safe-browsing',
        [ClickableMenuId.SANDBOX_STATUS]: 'about:sandbox',
        [ClickableMenuId.SETTINGS]: 'about:settings',
        [ClickableMenuId.SITE_ENGAGEMENT]: 'about:site-engagement',
        [ClickableMenuId.SYSTEM]: 'about:system',
        [ClickableMenuId.TERMS]: 'about:terms',
        [ClickableMenuId.TRACING]: 'about:tracing',
        [ClickableMenuId.UKM]: 'about:ukm',
        [ClickableMenuId.USER_ACTIONS]: 'about:user-actions',
        [ClickableMenuId.VERSION]: 'about:version',
        [ClickableMenuId.WEBRTC_LOGS]: 'about:webrtc-logs',
        [ClickableMenuId.WEBUI_GALLERY]: 'about:webui-gallery',
        [ClickableMenuId.WEBUI_JAVASCRIPT_ERROR]: 'about:webuijserror',
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
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.APPS, '📱 Apps', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.BOOKMARKS, '📑 Bookmarks', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.CRASHES, '💥 Crashes', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.DEVTOOLS, '🔍 DevTools', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.DOWNLOADS, '💾 Downloads', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.EXTENSIONS, '🧩 Extensions', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.FLAGS, '🚩 Flags', "browser-links");
developer_pages.addMenuGroup("history", '🕑 History', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.HISTORY_VIEW, 'View', "history");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.HISTORY_CLUSTERS, 'Clusters', "history");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.PASSWORD_MANAGER, '🔐 Password Manager', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.READING_LIST, '📖 Reading List', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.SETTINGS, '⚙ Settings', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.SITE_ENGAGEMENT, '📊 Site Engagement', "browser-links");
developer_pages.addSeparator("browser-links");
developer_pages.addMenuGroup("debug", 'Debug', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.COMPONENTS, 'Components', "debug");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.DEVICE_LOG, 'Device Log', "debug");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.DISCARDS, 'Discards', "debug");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.HISTOGRAMS, 'Histograms', "debug");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.LOCAL_STATE, 'Local State', "debug");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.MEDIA_ENGAGEMENT, 'Media Engagement', "debug");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.NETWORK_LOG_EXPORT, 'Network Log Export', "debug");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.OMNIBOX, 'Omnibox', "debug");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.POLICIES, 'Policies', "debug");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.PREDICTORS, 'Predictors', "debug");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.SAFE_BROWSING, 'Safe Browsing', "debug");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.SANDBOX_STATUS, 'Sandbox Status', "debug");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.SYSTEM, 'System', "debug");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.TRACING, 'Tracing', "debug");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.UKM, 'UKM', "debug");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.USER_ACTIONS, 'User Actions', "debug");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.WEBRTC_LOGS, 'WebRTC Logs', "debug");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.WEBUI_JAVASCRIPT_ERROR, 'WebUI JavaScript Error', "debug");
developer_pages.addMenuGroup("fun", 'Fun', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.DINO, '🦖 Dino', "fun");
developer_pages.addMenuGroup("internals", 'Internals', "browser-links");
developer_pages.addMenuGroup("reference", 'Reference', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.INTERSTITIALS, 'Interstitials', "reference");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.NETWORK_ERRORS, 'Network Errors', "reference");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.WEBUI_GALLERY, 'WebUI Gallery', "reference");
developer_pages.addMenuGroup("settings", 'Settings', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.MANAGEMENT, 'Management', "settings");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.PROFILES, 'Profiles', "settings");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.LINUX_PROXY_CONFIG, 'Proxy Configuration', "settings");
developer_pages.addSeparator("browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.ABOUT, 'About', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.CREDITS, 'Credits', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.TERMS, 'Terms', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.VERSION, 'Version', "browser-links");
developer_pages.addSeparator("browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.ALL_PAGES, 'All pages', "browser-links");
chrome.contextMenus.onClicked.addListener((info, _tab) => {
    const menuItemId = info.menuItemId;
    if (menuItemId.startsWith(developer_pages.CLICKABLE_PREFIX)) {
        const menuId = menuItemId.substring(developer_pages.CLICKABLE_PREFIX.length);
        developer_pages.openUrl(developer_pages.MENU_ID_TO_URL[menuId]);
    }
});
