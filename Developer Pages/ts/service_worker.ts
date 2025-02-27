// List of special pages:
// http://src.chromium.org/svn/trunk/src/chrome/common/url_constants.cc Don't
// use URLs just made for testing (as explained in the source)

namespace developer_pages {
  const GROUP_PREFIX = 'group:';
  export const CLICKABLE_PREFIX = 'clickable:';
  const SEPARATOR_PREFIX = 'separator:';

  export const enum GroupMenuId {
    BROWSER_LINKS = 'browser-links',
    DEBUG = 'debug',
    FUN = 'fun',
    HISTORY = 'history',
    INTERNALS = 'internals',
    MEDIA = 'media',
    ON_DEVICE = 'on-device',
    REFERENCE = 'reference',
    SETTINGS = 'settings',
  }

  // Enums used in 'in' check cannot be const.
  export enum ClickableMenuId {
    ACCESSIBILITY = 'accessibility',
    APP_SERVICE_INTERNAL = 'app-service-internals',
    APPS = 'apps',
    ATTRIBUTION_INTERNALS = 'attribution-internals',
    AUTOFILL_INTERNALS = 'autofill-internals',
    BLOB_INTERNALS = 'blob-internals',
    BLUETOOTH_INTERNALS = 'bluetooth-internals',
    BOOKMARKS = 'bookmarks',
    BOOKMARKS_SIDE_PANEL = 'bookmarks-side-panel',
    CHROME_URLS = 'chrome-urls',
    COMMERCE_INTERNALS = 'commerce-internals',
    COMPONENTS = 'components',
    CONNECTORS_INTERNALS = 'connectors-internals',
    CRASHES = 'crashes',
    CREDITS = 'credits',
    DATA_SHARING_INTERNALS = 'data-sharing-internals',
    DEVICE_LOG = 'device-log',
    INSPECT = 'insepct',
    DINO = 'dino',
    DISCARDS = 'discards',
    DOWNLOAD_INTERNALS = 'download-internals',
    DOWNLOADS = 'downloads',
    EXTENSIONS = 'extensions',
    EXTENSIONS_INTERNALS = 'extensions-internals',
    FAMILY_LINK_USER_INTERNALS = 'family-link-user-internals',
    FLAGS = 'flags',
    GCM_INTERNALS = 'gcm-internals',
    GPU = 'gpu',
    HELP = 'help',
    HISTOGRAMS = 'histograms',
    HISTORY_CLUSTERS = 'history-clusters',
    HISTORY_VIEW = 'history-view',
    INDEXEDDB_INTERNALS = 'indexeddb-internals',
    INTERSTITIALS = 'interstitials',
    LINUX_PROXY_CONFIG = 'linux-proxy-config',
    LOCAL_STATE = 'local-state',
    LOCATION_INTERNALS = 'location-internals',
    MANAGEMENT = 'management',
    MEDIA_ENGAGEMENT = 'media-engagement',
    MEDIA_INTERNALS = 'media-internals',
    MEDIA_ROUTER_INTERNALS = 'media-router-internals',
    MEMORY_INTERNALS = 'memory-internals',
    METRICS_INTERNALS = 'metrics-internals',
    NET_INTERNALS = 'net-internals',
    NETWORK_ERRORS = 'network-errors',
    NETWORK_LOG_EXPORT = 'network-log-export',
    NTP_TILES_INTERNALS = 'ntp-tiles-internals',
    OMNIBOX = 'omnibox',
    ON_DEVICE_INTERNALS = 'on-device-internals',
    ON_DEVICE_TRANSLATION_INTERNALS = 'on-device-translation-internals',
    OPTIMIZATION_GUIDE_INTERNALS = 'optimization-guide-internals',
    PASSWORD_MANAGER = 'password-manager',
    PASSWORD_MANAGER_INTERNALS = 'password-manager-internals',
    POLICIES = 'policies',
    PREDICTORS = 'predictors',
    PREFERENCES_INTERNALS = 'prefs-internals',
    PRIVATE_AGGREGATION_INTERNALS = 'private-aggregation-internals',
    PROCESS_INTERNALS = 'process-internals',
    PROFILES = 'profiles',
    QUOTA_INTERNALS = 'quota-internals',
    READING_LIST = 'reading-list',
    SAFE_BROWSING = 'safe-browsing',
    SANDBOX_STATUS = 'sandbox-status',
    SEGMENTATION_INTERNALS = 'segmentation-internals',
    SERVICEWORKER_INTERNALS = 'serviceworker-internals',
    SESSION_SERVICE = 'session-service',
    SETTINGS = 'settings',
    SIGNIN_INTERNALS = 'signin-internals',
    SITE_ENGAGEMENT = 'site-engagement',
    SYNC_INTERNALS = 'sync-internals',
    SYSTEM = 'system',
    TERMS = 'terms',
    TOPICS_INTERNALS = 'topics-internals',
    TRACES_INTERNALS = 'traces-internals',
    TRACING = 'tracing',
    TRANSLATE_INTERNALS = 'translate-internals',
    UKM = 'ukm',
    USB_INTERNALS = 'usb-internals',
    USER_ACTIONS = 'user-actions',
    USER_EDUCATION_INTERNALS = 'user-education-internals',
    WEB_APP_INTERNALS = 'web-app-internals',
    WEBRTC_INTERNALS = 'webrtc-internals',
    VERSION = 'version',
    WEBRTC_LOGS = 'webrtc-logs',
    WEBUI_GALLERY = 'webui-gallery',
    WEBUI_JAVASCRIPT_ERROR = 'webui-javascript-error',
  }

  export const MENU_ID_TO_URL: Record<ClickableMenuId, string> = {
    [ClickableMenuId.ACCESSIBILITY]: 'chrome://accessibility',
    [ClickableMenuId.APP_SERVICE_INTERNAL]: 'chrome://app-service-internals',
    [ClickableMenuId.APPS]: 'chrome://apps',
    [ClickableMenuId.ATTRIBUTION_INTERNALS]: 'chrome://attribution-internals',
    [ClickableMenuId.AUTOFILL_INTERNALS]: 'chrome://autofill-internals',
    [ClickableMenuId.BLOB_INTERNALS]: 'chrome://blob-internals',
    [ClickableMenuId.BLUETOOTH_INTERNALS]: 'chrome://bluetooth-internals',
    [ClickableMenuId.BOOKMARKS]: 'chrome://bookmarks',
    [ClickableMenuId.BOOKMARKS_SIDE_PANEL]:
        'chrome://bookmarks-side-panel.top-chrome',
    [ClickableMenuId.CHROME_URLS]: 'chrome://chrome-urls',
    [ClickableMenuId.COMMERCE_INTERNALS]: 'chrome://commerce-internals',
    [ClickableMenuId.COMPONENTS]: 'chrome://components',
    [ClickableMenuId.CONNECTORS_INTERNALS]: 'chrome://connectors-internals',
    [ClickableMenuId.CRASHES]: 'chrome://crashes',
    [ClickableMenuId.CREDITS]: 'chrome://credits',
    [ClickableMenuId.DATA_SHARING_INTERNALS]: 'chrome://data-sharing-internals',
    [ClickableMenuId.DEVICE_LOG]: 'chrome://device-log',
    [ClickableMenuId.DINO]: 'chrome://dino',
    [ClickableMenuId.DISCARDS]: 'chrome://discards',
    [ClickableMenuId.DOWNLOAD_INTERNALS]: 'chrome://download-internals',
    [ClickableMenuId.DOWNLOADS]: 'chrome://downloads',
    [ClickableMenuId.EXTENSIONS]: 'chrome://extensions',
    [ClickableMenuId.EXTENSIONS_INTERNALS]: 'chrome://extensions-internals',
    [ClickableMenuId.FAMILY_LINK_USER_INTERNALS]:
        'chrome://family-link-user-internals',
    [ClickableMenuId.FLAGS]: 'chrome://flags',
    [ClickableMenuId.GCM_INTERNALS]: 'chrome://gcm-internals',
    [ClickableMenuId.GPU]: 'chrome://gpu',
    [ClickableMenuId.HELP]: 'chrome://help',
    [ClickableMenuId.HISTOGRAMS]: 'chrome://histograms',
    [ClickableMenuId.HISTORY_CLUSTERS]:
        'chrome://history-clusters-side-panel.top-chrome',
    [ClickableMenuId.HISTORY_VIEW]: 'chrome://history',
    [ClickableMenuId.INDEXEDDB_INTERNALS]: 'chrome://indexeddb-internals',
    [ClickableMenuId.INSPECT]: 'chrome://inspect',
    [ClickableMenuId.INTERSTITIALS]: 'chrome://interstitials',
    [ClickableMenuId.LINUX_PROXY_CONFIG]: 'chrome://linux-proxy-config',
    [ClickableMenuId.LOCAL_STATE]: 'chrome://local-state',
    [ClickableMenuId.LOCATION_INTERNALS]: 'chrome://location-internals',
    [ClickableMenuId.MANAGEMENT]: 'chrome://management',
    [ClickableMenuId.MEDIA_ENGAGEMENT]: 'chrome://media-engagement',
    [ClickableMenuId.MEDIA_INTERNALS]: 'chrome://media-internals',
    [ClickableMenuId.MEDIA_ROUTER_INTERNALS]: 'chrome://media-router-internals',
    [ClickableMenuId.MEMORY_INTERNALS]: 'chrome://memory-internals',
    [ClickableMenuId.METRICS_INTERNALS]: 'chrome://metrics-internals',
    [ClickableMenuId.NET_INTERNALS]: 'chrome://net-internals',
    [ClickableMenuId.NETWORK_ERRORS]: 'chrome://network-errors',
    [ClickableMenuId.NETWORK_LOG_EXPORT]: 'chrome://net-export',
    [ClickableMenuId.NTP_TILES_INTERNALS]: 'chrome://ntp-tiles-internals',
    [ClickableMenuId.OMNIBOX]: 'chrome://omnibox',
    [ClickableMenuId.ON_DEVICE_INTERNALS]: 'chrome://on-device-internals',
    [ClickableMenuId.ON_DEVICE_TRANSLATION_INTERNALS]:
        'chrome://on-device-translation-internals',
    [ClickableMenuId.OPTIMIZATION_GUIDE_INTERNALS]:
        'chrome://optimization-guide-internals',
    [ClickableMenuId.PASSWORD_MANAGER]: 'chrome://password-manager',
    [ClickableMenuId.PASSWORD_MANAGER_INTERNALS]:
        'chrome://password-manager-internals',
    [ClickableMenuId.POLICIES]: 'chrome://policy',
    [ClickableMenuId.PREDICTORS]: 'chrome://predictors',
    [ClickableMenuId.PREFERENCES_INTERNALS]: 'chrome://prefs-internals',
    [ClickableMenuId.PRIVATE_AGGREGATION_INTERNALS]:
        'chrome://private-aggregation-internals',
    [ClickableMenuId.PROCESS_INTERNALS]: 'chrome://process-internals',
    [ClickableMenuId.PROFILES]: 'chrome://profile-internals',
    [ClickableMenuId.QUOTA_INTERNALS]: 'chrome://quota-internals',
    [ClickableMenuId.READING_LIST]: 'chrome://read-later.top-chrome',
    [ClickableMenuId.SAFE_BROWSING]: 'chrome://safe-browsing',
    [ClickableMenuId.SANDBOX_STATUS]: 'chrome://sandbox',
    [ClickableMenuId.SEGMENTATION_INTERNALS]: 'chrome://segmentation-internals',
    [ClickableMenuId.SERVICEWORKER_INTERNALS]:
        'chrome://serviceworker-internals',
    [ClickableMenuId.SESSION_SERVICE]: 'chrome://internals/session-service',
    [ClickableMenuId.SETTINGS]: 'chrome://settings',
    [ClickableMenuId.SIGNIN_INTERNALS]: 'chrome://signin-internals',
    [ClickableMenuId.SITE_ENGAGEMENT]: 'chrome://site-engagement',
    [ClickableMenuId.SYNC_INTERNALS]: 'chrome://sync-internals',
    [ClickableMenuId.SYSTEM]: 'chrome://system',
    [ClickableMenuId.TERMS]: 'chrome://terms',
    [ClickableMenuId.TOPICS_INTERNALS]: 'chrome://topics-internals',
    [ClickableMenuId.TRACES_INTERNALS]: 'chrome://traces-internals',
    [ClickableMenuId.TRACING]: 'chrome://tracing',
    [ClickableMenuId.TRANSLATE_INTERNALS]: 'chrome://translate-internals',
    [ClickableMenuId.UKM]: 'chrome://ukm',
    [ClickableMenuId.USB_INTERNALS]: 'chrome://usb-internals',
    [ClickableMenuId.USER_ACTIONS]: 'chrome://user-actions',
    [ClickableMenuId.USER_EDUCATION_INTERNALS]:
        'chrome://user-education-internals',
    [ClickableMenuId.VERSION]: 'chrome://version',
    [ClickableMenuId.WEB_APP_INTERNALS]: 'chrome://web-app-internals',
    [ClickableMenuId.WEBRTC_INTERNALS]: 'chrome://webrtc-internals',
    [ClickableMenuId.WEBRTC_LOGS]: 'chrome://webrtc-logs',
    [ClickableMenuId.WEBUI_GALLERY]: 'chrome://webui-gallery',
    [ClickableMenuId.WEBUI_JAVASCRIPT_ERROR]: 'chrome://webuijserror',
  };

  let nextSeparatorId = 1;

  export function addGroupMenu(
      id: GroupMenuId, title: string, parentId?: GroupMenuId) {
    chrome.contextMenus.create({
      'id': GROUP_PREFIX + id,
      'title': title,
      'parentId': parentId != undefined ? GROUP_PREFIX + parentId : undefined,
      'contexts': ['all'],
    });
  }

  export function addClickableMenu(
      id: ClickableMenuId, title: string, parentId: GroupMenuId) {
    chrome.contextMenus.create({
      'id': CLICKABLE_PREFIX + id,
      'title': title,
      'parentId': GROUP_PREFIX + parentId,
      'contexts': ['all'],
    });
  }

  export function addSeparator(parentId: GroupMenuId) {
    chrome.contextMenus.create({
      'id': SEPARATOR_PREFIX + nextSeparatorId,
      'type': 'separator',
      'parentId': GROUP_PREFIX + parentId
    });
    nextSeparatorId++;
  }

  export function openUrl(url: string) {
    console.log('Opening url: ' + url)
    chrome.tabs.create({'url': url})
  }
}  // namespace developer_pages

chrome.runtime.onInstalled.addListener(
    (_details: chrome.runtime.InstalledDetails) => {
      developer_pages.addGroupMenu(
          developer_pages.GroupMenuId.BROWSER_LINKS, 'Browser Links');

      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.APPS, '📱 Apps',
          developer_pages.GroupMenuId.BROWSER_LINKS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.BOOKMARKS, '📑 Bookmarks',
          developer_pages.GroupMenuId.BROWSER_LINKS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.CRASHES, '💥 Crashes',
          developer_pages.GroupMenuId.BROWSER_LINKS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.INSPECT, '🔍 DevTools',
          developer_pages.GroupMenuId.BROWSER_LINKS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.DOWNLOADS, '💾 Downloads',
          developer_pages.GroupMenuId.BROWSER_LINKS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.EXTENSIONS, '🧩 Extensions',
          developer_pages.GroupMenuId.BROWSER_LINKS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.FLAGS, '🚩 Flags',
          developer_pages.GroupMenuId.BROWSER_LINKS)
      developer_pages.addGroupMenu(
          developer_pages.GroupMenuId.HISTORY, '🕑 History',
          developer_pages.GroupMenuId.BROWSER_LINKS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.HISTORY_VIEW, 'View',
          developer_pages.GroupMenuId.HISTORY)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.HISTORY_CLUSTERS, 'Clusters',
          developer_pages.GroupMenuId.HISTORY)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.PASSWORD_MANAGER,
          '🔐 Password Manager', developer_pages.GroupMenuId.BROWSER_LINKS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.READING_LIST, '📖 Reading List',
          developer_pages.GroupMenuId.BROWSER_LINKS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.SETTINGS, '🛠️ Settings',
          developer_pages.GroupMenuId.BROWSER_LINKS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.SITE_ENGAGEMENT, '📊 Site Engagement',
          developer_pages.GroupMenuId.BROWSER_LINKS)

      developer_pages.addSeparator(developer_pages.GroupMenuId.BROWSER_LINKS);

      developer_pages.addGroupMenu(
          developer_pages.GroupMenuId.DEBUG, 'Debug',
          developer_pages.GroupMenuId.BROWSER_LINKS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.COMPONENTS, 'Components',
          developer_pages.GroupMenuId.DEBUG)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.DEVICE_LOG, 'Device Log',
          developer_pages.GroupMenuId.DEBUG)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.DISCARDS, 'Discards',
          developer_pages.GroupMenuId.DEBUG)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.HISTOGRAMS, 'Histograms',
          developer_pages.GroupMenuId.DEBUG)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.LOCAL_STATE, 'Local State',
          developer_pages.GroupMenuId.DEBUG)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.MEDIA_ENGAGEMENT, 'Media Engagement',
          developer_pages.GroupMenuId.DEBUG)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.NETWORK_LOG_EXPORT,
          'Network Log Export', developer_pages.GroupMenuId.DEBUG)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.OMNIBOX, 'Omnibox',
          developer_pages.GroupMenuId.DEBUG)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.POLICIES, 'Policies',
          developer_pages.GroupMenuId.DEBUG)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.PREDICTORS, 'Predictors',
          developer_pages.GroupMenuId.DEBUG)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.SAFE_BROWSING, 'Safe Browsing',
          developer_pages.GroupMenuId.DEBUG)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.SANDBOX_STATUS, 'Sandbox Status',
          developer_pages.GroupMenuId.DEBUG)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.SYSTEM, 'System',
          developer_pages.GroupMenuId.DEBUG)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.TRACING, 'Tracing',
          developer_pages.GroupMenuId.DEBUG)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.UKM, 'UKM',
          developer_pages.GroupMenuId.DEBUG)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.USER_ACTIONS, 'User Actions',
          developer_pages.GroupMenuId.DEBUG)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.WEBRTC_LOGS, 'WebRTC Logs',
          developer_pages.GroupMenuId.DEBUG)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.WEBUI_JAVASCRIPT_ERROR,
          'WebUI JavaScript Error', developer_pages.GroupMenuId.DEBUG)

      developer_pages.addGroupMenu(
          developer_pages.GroupMenuId.FUN, 'Fun',
          developer_pages.GroupMenuId.BROWSER_LINKS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.DINO, '🦖 Dino',
          developer_pages.GroupMenuId.FUN)

      developer_pages.addGroupMenu(
          developer_pages.GroupMenuId.INTERNALS, 'Internals',
          developer_pages.GroupMenuId.BROWSER_LINKS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.ACCESSIBILITY, 'Accessibility',
          developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.APP_SERVICE_INTERNAL, 'App Service',
          developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.ATTRIBUTION_INTERNALS, 'Attribution',
          developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.AUTOFILL_INTERNALS, 'Autofill',
          developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.BLOB_INTERNALS, 'Blob',
          developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.BLUETOOTH_INTERNALS, 'Bluetooth',
          developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.COMMERCE_INTERNALS, 'Commerce',
          developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.CONNECTORS_INTERNALS, 'Connectors',
          developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.DATA_SHARING_INTERNALS,
          'Data Sharing', developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.DOWNLOAD_INTERNALS, 'Download',
          developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.EXTENSIONS_INTERNALS, 'Extensions',
          developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.FAMILY_LINK_USER_INTERNALS,
          'Family Link User', developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.GCM_INTERNALS, 'GCM',
          developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.GPU, 'GPU',
          developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.INDEXEDDB_INTERNALS, 'IndexedDB',
          developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.TRACES_INTERNALS, 'Local Traces',
          developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.LOCATION_INTERNALS, 'Location',
          developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addGroupMenu(
          developer_pages.GroupMenuId.MEDIA, 'Media',
          developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.MEDIA_INTERNALS, 'View',
          developer_pages.GroupMenuId.MEDIA)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.MEDIA_ROUTER_INTERNALS, 'Router',
          developer_pages.GroupMenuId.MEDIA)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.MEMORY_INTERNALS, 'Memory',
          developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.METRICS_INTERNALS, 'Metrics',
          developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.NET_INTERNALS, 'Net',
          developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.NTP_TILES_INTERNALS, 'NTP Tiles',
          developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addGroupMenu(
          developer_pages.GroupMenuId.ON_DEVICE, 'On Device',
          developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.ON_DEVICE_INTERNALS, 'View',
          developer_pages.GroupMenuId.ON_DEVICE)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.ON_DEVICE_TRANSLATION_INTERNALS,
          'Translation', developer_pages.GroupMenuId.ON_DEVICE)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.OPTIMIZATION_GUIDE_INTERNALS,
          'Optimization Guide', developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.PASSWORD_MANAGER_INTERNALS,
          'Password Manager', developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.PREFERENCES_INTERNALS, 'Preferences',
          developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.PRIVATE_AGGREGATION_INTERNALS,
          'Private Aggregation', developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.PROCESS_INTERNALS, 'Process',
          developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.QUOTA_INTERNALS, 'Quota',
          developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.SEGMENTATION_INTERNALS,
          'Segmentation', developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.SERVICEWORKER_INTERNALS,
          'Service Worker', developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.SESSION_SERVICE, 'Session Service',
          developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.SIGNIN_INTERNALS, 'Signin',
          developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.SYNC_INTERNALS, 'Sync',
          developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.TOPICS_INTERNALS, 'Topics',
          developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.TRANSLATE_INTERNALS, 'Translate',
          developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.USB_INTERNALS, 'USB',
          developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.USER_EDUCATION_INTERNALS,
          'User Education', developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.WEB_APP_INTERNALS, 'Web App',
          developer_pages.GroupMenuId.INTERNALS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.WEBRTC_INTERNALS, 'WebRTC',
          developer_pages.GroupMenuId.INTERNALS)


      developer_pages.addGroupMenu(
          developer_pages.GroupMenuId.REFERENCE, 'Reference',
          developer_pages.GroupMenuId.BROWSER_LINKS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.INTERSTITIALS, 'Interstitials',
          developer_pages.GroupMenuId.REFERENCE)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.NETWORK_ERRORS, 'Network Errors',
          developer_pages.GroupMenuId.REFERENCE)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.WEBUI_GALLERY, 'WebUI Gallery',
          developer_pages.GroupMenuId.REFERENCE)

      developer_pages.addGroupMenu(
          developer_pages.GroupMenuId.SETTINGS, 'Settings',
          developer_pages.GroupMenuId.BROWSER_LINKS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.MANAGEMENT, 'Management',
          developer_pages.GroupMenuId.SETTINGS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.PROFILES, 'Profiles',
          developer_pages.GroupMenuId.SETTINGS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.LINUX_PROXY_CONFIG,
          'Proxy Configuration', developer_pages.GroupMenuId.SETTINGS)

      developer_pages.addSeparator(developer_pages.GroupMenuId.BROWSER_LINKS);

      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.HELP, 'ℹ️ About',
          developer_pages.GroupMenuId.BROWSER_LINKS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.CREDITS, '©️ Credits',
          developer_pages.GroupMenuId.BROWSER_LINKS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.TERMS, '📃 Terms',
          developer_pages.GroupMenuId.BROWSER_LINKS)
      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.VERSION, '🏷️ Version',
          developer_pages.GroupMenuId.BROWSER_LINKS)

      developer_pages.addSeparator(developer_pages.GroupMenuId.BROWSER_LINKS);

      developer_pages.addClickableMenu(
          developer_pages.ClickableMenuId.CHROME_URLS, '🔗 All pages',
          developer_pages.GroupMenuId.BROWSER_LINKS)
    });

chrome.contextMenus.onClicked.addListener((info, _tab?) => {
  const menuItemId = info.menuItemId as string;

  if (menuItemId.startsWith(developer_pages.CLICKABLE_PREFIX)) {
    const menuId =
        menuItemId.substring(developer_pages.CLICKABLE_PREFIX.length) as
        developer_pages.ClickableMenuId;
    developer_pages.openUrl(developer_pages.MENU_ID_TO_URL[menuId]);
  }
});