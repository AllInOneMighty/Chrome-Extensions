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
    REFERENCE = 'reference',
    SETTINGS = 'settings',
  }

  // Enums used in 'in' check cannot be const.
  export enum ClickableMenuId {
    ABOUT = 'about',
    ALL_PAGES = 'all-pages',
    APP_SERVICE_INTERNAL = 'app-service-internals',
    APPS = 'apps',
    ATTRIBUTION_INTERNALS = 'attribution-internals',
    BOOKMARKS = 'bookmarks',
    BOOKMARKS_SIDE_PANEL = 'bookmarks-side-panel',
    COMPONENTS = 'components',
    CRASHES = 'crashes',
    CREDITS = 'credits',
    DEVICE_LOG = 'device-log',
    DEVTOOLS = 'insepct',
    DINO = 'dino',
    DISCARDS = 'discards',
    DOWNLOADS = 'downloads',
    EXTENSIONS = 'extensions',
    FLAGS = 'flags',
    HISTOGRAMS = 'histograms',
    HISTORY_CLUSTERS = 'history-clusters',
    HISTORY_VIEW = 'history-view',
    INTERSTITIALS = 'interstitials',
    LINUX_PROXY_CONFIG = 'linux-proxy-config',
    LOCAL_STATE = 'local-state',
    MANAGEMENT = 'management',
    MEDIA_ENGAGEMENT = 'media-engagement',
    NETWORK_ERRORS = 'network-errors',
    NETWORK_LOG_EXPORT = 'network-log-export',
    OMNIBOX = 'omnibox',
    PASSWORD_MANAGER = 'password-manager',
    POLICIES = 'policies',
    PREDICTORS = 'predictors',
    PROFILES = 'profiles',
    READING_LIST = 'reading-list',
    SAFE_BROWSING = 'safe-browsing',
    SANDBOX_STATUS = 'sandbox-status',
    SETTINGS = 'settings',
    SITE_ENGAGEMENT = 'site-engagement',
    SYSTEM = 'system',
    TERMS = 'terms',
    TRACING = 'tracing',
    UKM = 'ukm',
    USER_ACTIONS = 'user-actions',
    VERSION = 'version',
    WEBRTC_LOGS = 'webrtc-logs',
    WEBUI_GALLERY = 'webui-gallery',
    WEBUI_JAVASCRIPT_ERROR = 'webui-javascript-error',
  }

  export const MENU_ID_TO_URL: Record<ClickableMenuId, string> = {
    [ClickableMenuId.ABOUT]: 'about:help',
    [ClickableMenuId.ALL_PAGES]: 'about:chrome-urls',
    [ClickableMenuId.APP_SERVICE_INTERNAL]: 'about:app-service-internals',
    [ClickableMenuId.APPS]: 'about:apps',
    [ClickableMenuId.ATTRIBUTION_INTERNALS]: 'about:attribution-internals',
    [ClickableMenuId.BOOKMARKS]: 'about:bookmarks',
    [ClickableMenuId.BOOKMARKS_SIDE_PANEL]:
        'about:bookmarks-side-panel.top-chrome',
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
    [ClickableMenuId.HISTORY_CLUSTERS]:
        'about:history-clusters-side-panel.top-chrome',
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

  export function addMenuGroup(
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
    chrome.tabs.create({'url': url})
  }
}  // namespace developer_pages

developer_pages.addMenuGroup(
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
    developer_pages.ClickableMenuId.DEVTOOLS, '🔍 DevTools',
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
developer_pages.addMenuGroup(
    developer_pages.GroupMenuId.HISTORY, '🕑 History',
    developer_pages.GroupMenuId.BROWSER_LINKS)
developer_pages.addClickableMenu(
    developer_pages.ClickableMenuId.HISTORY_VIEW, 'View',
    developer_pages.GroupMenuId.HISTORY)
developer_pages.addClickableMenu(
    developer_pages.ClickableMenuId.HISTORY_CLUSTERS, 'Clusters',
    developer_pages.GroupMenuId.HISTORY)
developer_pages.addClickableMenu(
    developer_pages.ClickableMenuId.PASSWORD_MANAGER, '🔐 Password Manager',
    developer_pages.GroupMenuId.BROWSER_LINKS)
developer_pages.addClickableMenu(
    developer_pages.ClickableMenuId.READING_LIST, '📖 Reading List',
    developer_pages.GroupMenuId.BROWSER_LINKS)
developer_pages.addClickableMenu(
    developer_pages.ClickableMenuId.SETTINGS, '⚙ Settings',
    developer_pages.GroupMenuId.BROWSER_LINKS)
developer_pages.addClickableMenu(
    developer_pages.ClickableMenuId.SITE_ENGAGEMENT, '📊 Site Engagement',
    developer_pages.GroupMenuId.BROWSER_LINKS)

developer_pages.addSeparator(developer_pages.GroupMenuId.BROWSER_LINKS);

developer_pages.addMenuGroup(
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
    developer_pages.ClickableMenuId.NETWORK_LOG_EXPORT, 'Network Log Export',
    developer_pages.GroupMenuId.DEBUG)
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
developer_pages.addMenuGroup(
    developer_pages.GroupMenuId.FUN, 'Fun',
    developer_pages.GroupMenuId.BROWSER_LINKS)
developer_pages.addClickableMenu(
    developer_pages.ClickableMenuId.DINO, '🦖 Dino',
    developer_pages.GroupMenuId.FUN)
developer_pages.addMenuGroup(
    developer_pages.GroupMenuId.INTERNALS, 'Internals',
    developer_pages.GroupMenuId.BROWSER_LINKS)
developer_pages.addMenuGroup(
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
developer_pages.addMenuGroup(
    developer_pages.GroupMenuId.SETTINGS, 'Settings',
    developer_pages.GroupMenuId.BROWSER_LINKS)
developer_pages.addClickableMenu(
    developer_pages.ClickableMenuId.MANAGEMENT, 'Management',
    developer_pages.GroupMenuId.SETTINGS)
developer_pages.addClickableMenu(
    developer_pages.ClickableMenuId.PROFILES, 'Profiles',
    developer_pages.GroupMenuId.SETTINGS)
developer_pages.addClickableMenu(
    developer_pages.ClickableMenuId.LINUX_PROXY_CONFIG, 'Proxy Configuration',
    developer_pages.GroupMenuId.SETTINGS)

developer_pages.addSeparator(developer_pages.GroupMenuId.BROWSER_LINKS);

developer_pages.addClickableMenu(
    developer_pages.ClickableMenuId.ABOUT, 'About',
    developer_pages.GroupMenuId.BROWSER_LINKS)
developer_pages.addClickableMenu(
    developer_pages.ClickableMenuId.CREDITS, 'Credits',
    developer_pages.GroupMenuId.BROWSER_LINKS)
developer_pages.addClickableMenu(
    developer_pages.ClickableMenuId.TERMS, 'Terms',
    developer_pages.GroupMenuId.BROWSER_LINKS)
developer_pages.addClickableMenu(
    developer_pages.ClickableMenuId.VERSION, 'Version',
    developer_pages.GroupMenuId.BROWSER_LINKS)

developer_pages.addSeparator(developer_pages.GroupMenuId.BROWSER_LINKS);

developer_pages.addClickableMenu(
    developer_pages.ClickableMenuId.ALL_PAGES, 'All pages',
    developer_pages.GroupMenuId.BROWSER_LINKS)


chrome.contextMenus.onClicked.addListener((info, _tab?) => {
  const menuItemId = info.menuItemId as string;

  if (menuItemId.startsWith(developer_pages.CLICKABLE_PREFIX)) {
    const menuId =
        menuItemId.substring(developer_pages.CLICKABLE_PREFIX.length) as
        developer_pages.ClickableMenuId;
    developer_pages.openUrl(developer_pages.MENU_ID_TO_URL[menuId]);
  }
});