"use strict";
var developer_pages;
(function (developer_pages) {
    const GROUP_PREFIX = 'group:';
    developer_pages.CLICKABLE_PREFIX = 'clickable:';
    const SEPARATOR_PREFIX = 'separator:';
    let ClickableMenuId;
    (function (ClickableMenuId) {
        ClickableMenuId["ABOUT"] = "about";
        ClickableMenuId["ACCESSIBILITY"] = "accessibility";
        ClickableMenuId["ALL_PAGES"] = "all-pages";
        ClickableMenuId["APP_SERVICE_INTERNAL"] = "app-service-internals";
        ClickableMenuId["APPS"] = "apps";
        ClickableMenuId["ATTRIBUTION_INTERNALS"] = "attribution-internals";
        ClickableMenuId["AUTOFILL_INTERNALS"] = "autofill-internals";
        ClickableMenuId["BLOB_INTERNALS"] = "blob-internals";
        ClickableMenuId["BLUETOOTH_INTERNALS"] = "bluetooth-internals";
        ClickableMenuId["BOOKMARKS"] = "bookmarks";
        ClickableMenuId["BOOKMARKS_SIDE_PANEL"] = "bookmarks-side-panel";
        ClickableMenuId["COMMERCE_INTERNALS"] = "commerce-internals";
        ClickableMenuId["COMPONENTS"] = "components";
        ClickableMenuId["CONNECTORS_INTERNALS"] = "connectors-internals";
        ClickableMenuId["CRASHES"] = "crashes";
        ClickableMenuId["CREDITS"] = "credits";
        ClickableMenuId["DATA_SHARING_INTERNALS"] = "data-sharing-internals";
        ClickableMenuId["DEVICE_LOG"] = "device-log";
        ClickableMenuId["DEVTOOLS"] = "insepct";
        ClickableMenuId["DINO"] = "dino";
        ClickableMenuId["DISCARDS"] = "discards";
        ClickableMenuId["DOWNLOAD_INTERNALS"] = "download-internals";
        ClickableMenuId["DOWNLOADS"] = "downloads";
        ClickableMenuId["EXTENSIONS"] = "extensions";
        ClickableMenuId["EXTENSIONS_INTERNALS"] = "extensions-internals";
        ClickableMenuId["FAMILY_LINK_USER_INTERNALS"] = "family-link-user-internals";
        ClickableMenuId["FLAGS"] = "flags";
        ClickableMenuId["GCM_INTERNALS"] = "gcm-internals";
        ClickableMenuId["GPU"] = "gpu";
        ClickableMenuId["HISTOGRAMS"] = "histograms";
        ClickableMenuId["HISTORY_CLUSTERS"] = "history-clusters";
        ClickableMenuId["HISTORY_VIEW"] = "history-view";
        ClickableMenuId["INDEXEDDB_INTERNALS"] = "indexeddb-internals";
        ClickableMenuId["INTERSTITIALS"] = "interstitials";
        ClickableMenuId["LINUX_PROXY_CONFIG"] = "linux-proxy-config";
        ClickableMenuId["LOCAL_STATE"] = "local-state";
        ClickableMenuId["LOCATION_INTERNALS"] = "location-internals";
        ClickableMenuId["MANAGEMENT"] = "management";
        ClickableMenuId["MEDIA_ENGAGEMENT"] = "media-engagement";
        ClickableMenuId["MEDIA_INTERNALS"] = "media-internals";
        ClickableMenuId["MEDIA_ROUTER_INTERNALS"] = "media-router-internals";
        ClickableMenuId["MEMORY_INTERNALS"] = "memory-internals";
        ClickableMenuId["METRICS_INTERNALS"] = "metrics-internals";
        ClickableMenuId["NET_INTERNALS"] = "net-internals";
        ClickableMenuId["NETWORK_ERRORS"] = "network-errors";
        ClickableMenuId["NETWORK_LOG_EXPORT"] = "network-log-export";
        ClickableMenuId["NTP_TILES_INTERNALS"] = "ntp-tiles-internals";
        ClickableMenuId["OMNIBOX"] = "omnibox";
        ClickableMenuId["ON_DEVICE_INTERNALS"] = "on-device-internals";
        ClickableMenuId["ON_DEVICE_TRANSLATION_INTERNALS"] = "on-device-translation-internals";
        ClickableMenuId["OPTIMIZATION_GUIDE_INTERNALS"] = "optimization-guide-internals";
        ClickableMenuId["PASSWORD_MANAGER"] = "password-manager";
        ClickableMenuId["PASSWORD_MANAGER_INTERNALS"] = "password-manager-internals";
        ClickableMenuId["POLICIES"] = "policies";
        ClickableMenuId["PREDICTORS"] = "predictors";
        ClickableMenuId["PREFERENCES_INTERNALS"] = "prefs-internals";
        ClickableMenuId["PRIVATE_AGGREGATION_INTERNALS"] = "private-aggregation-internals";
        ClickableMenuId["PROCESS_INTERNALS"] = "process-internals";
        ClickableMenuId["PROFILES"] = "profiles";
        ClickableMenuId["QUOTA_INTERNALS"] = "quota-internals";
        ClickableMenuId["READING_LIST"] = "reading-list";
        ClickableMenuId["SAFE_BROWSING"] = "safe-browsing";
        ClickableMenuId["SANDBOX_STATUS"] = "sandbox-status";
        ClickableMenuId["SEGMENTATION_INTERNALS"] = "segmentation-internals";
        ClickableMenuId["SERVICEWORKER_INTERNALS"] = "serviceworker-internals";
        ClickableMenuId["SESSION_SERVICE"] = "session-service";
        ClickableMenuId["SETTINGS"] = "settings";
        ClickableMenuId["SIGNIN_INTERNALS"] = "signin-internals";
        ClickableMenuId["SITE_ENGAGEMENT"] = "site-engagement";
        ClickableMenuId["SYNC_INTERNALS"] = "sync-internals";
        ClickableMenuId["SYSTEM"] = "system";
        ClickableMenuId["TERMS"] = "terms";
        ClickableMenuId["TOPICS_INTERNALS"] = "topics-internals";
        ClickableMenuId["TRACES_INTERNALS"] = "traces-internals";
        ClickableMenuId["TRACING"] = "tracing";
        ClickableMenuId["TRANSLATE_INTERNALS"] = "translate-internals";
        ClickableMenuId["UKM"] = "ukm";
        ClickableMenuId["USB_INTERNALS"] = "usb-internals";
        ClickableMenuId["USER_ACTIONS"] = "user-actions";
        ClickableMenuId["USER_EDUCATION_INTERNALS"] = "user-education-internals";
        ClickableMenuId["WEB_APP_INTERNALS"] = "web-app-internals";
        ClickableMenuId["WEBRTC_INTERNALS"] = "webrtc-internals";
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
    function addGroupMenu(id, title, parentId) {
        chrome.contextMenus.create({
            'id': GROUP_PREFIX + id,
            'title': title,
            'parentId': parentId != undefined ? GROUP_PREFIX + parentId : undefined,
            'contexts': ['all'],
        });
    }
    developer_pages.addGroupMenu = addGroupMenu;
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
developer_pages.addGroupMenu("browser-links", 'Browser Links');
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.APPS, '📱 Apps', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.BOOKMARKS, '📑 Bookmarks', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.CRASHES, '💥 Crashes', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.DEVTOOLS, '🔍 DevTools', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.DOWNLOADS, '💾 Downloads', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.EXTENSIONS, '🧩 Extensions', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.FLAGS, '🚩 Flags', "browser-links");
developer_pages.addGroupMenu("history", '🕑 History', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.HISTORY_VIEW, 'View', "history");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.HISTORY_CLUSTERS, 'Clusters', "history");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.PASSWORD_MANAGER, '🔐 Password Manager', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.READING_LIST, '📖 Reading List', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.SETTINGS, '⚙ Settings', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.SITE_ENGAGEMENT, '📊 Site Engagement', "browser-links");
developer_pages.addSeparator("browser-links");
developer_pages.addGroupMenu("debug", 'Debug', "browser-links");
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
developer_pages.addGroupMenu("fun", 'Fun', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.DINO, '🦖 Dino', "fun");
developer_pages.addGroupMenu("internals", 'Internals', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.ACCESSIBILITY, 'Accessibility', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.APP_SERVICE_INTERNAL, 'App Service', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.ATTRIBUTION_INTERNALS, 'Attribution', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.AUTOFILL_INTERNALS, 'Autofill', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.BLOB_INTERNALS, 'Blob', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.BLUETOOTH_INTERNALS, 'Bluetooth', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.COMMERCE_INTERNALS, 'Commerce', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.CONNECTORS_INTERNALS, 'Connectors', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.DATA_SHARING_INTERNALS, 'Data Sharing', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.DOWNLOAD_INTERNALS, 'Download', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.EXTENSIONS_INTERNALS, 'Extensions', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.FAMILY_LINK_USER_INTERNALS, 'Family Link User', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.GCM_INTERNALS, 'GCM', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.GPU, 'GPU', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.INDEXEDDB_INTERNALS, 'IndexedDB', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.TRACES_INTERNALS, 'Local Traces', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.LOCATION_INTERNALS, 'Location', "internals");
developer_pages.addGroupMenu("media", 'Media', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.MEDIA_INTERNALS, 'View', "media");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.MEDIA_ROUTER_INTERNALS, 'Router', "media");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.MEMORY_INTERNALS, 'Memory', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.METRICS_INTERNALS, 'Metrics', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.NET_INTERNALS, 'Net', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.NTP_TILES_INTERNALS, 'NTP Tiles', "internals");
developer_pages.addGroupMenu("on-device", 'On Device', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.ON_DEVICE_INTERNALS, 'View', "on-device");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.ON_DEVICE_TRANSLATION_INTERNALS, 'Translation', "on-device");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.OPTIMIZATION_GUIDE_INTERNALS, 'Optimization Guide', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.PASSWORD_MANAGER_INTERNALS, 'Password Manager', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.PREFERENCES_INTERNALS, 'Preferences', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.PRIVATE_AGGREGATION_INTERNALS, 'Private Aggregation', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.PROCESS_INTERNALS, 'Process', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.QUOTA_INTERNALS, 'Quota', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.SEGMENTATION_INTERNALS, 'Segmentation', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.SERVICEWORKER_INTERNALS, 'Service Worker', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.SESSION_SERVICE, 'Session Service', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.SIGNIN_INTERNALS, 'Signin', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.SYNC_INTERNALS, 'Sync', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.TOPICS_INTERNALS, 'Topics', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.TRANSLATE_INTERNALS, 'Translate', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.USB_INTERNALS, 'USB', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.USER_EDUCATION_INTERNALS, 'User Education', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.WEB_APP_INTERNALS, 'Web App', "internals");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.WEBRTC_INTERNALS, 'WebRTC', "internals");
developer_pages.addGroupMenu("reference", 'Reference', "browser-links");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.INTERSTITIALS, 'Interstitials', "reference");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.NETWORK_ERRORS, 'Network Errors', "reference");
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.WEBUI_GALLERY, 'WebUI Gallery', "reference");
developer_pages.addGroupMenu("settings", 'Settings', "browser-links");
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
