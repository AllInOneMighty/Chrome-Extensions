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
    APP_SERVICE_INTERNAL = 'app-service-internals',
    APPS = 'apps',
    ATTRIBUTION_INTERNALS = 'attribution-internals',
    BOOKMARKS = 'bookmarks',
    BOOKMARKS_SIDE_PANEL = 'bookmarks-side-panel',
    CRASHES = 'crashes',
    CREDITS = 'credits',
    DINO = 'dino',
    DOWNLOADS = 'downloads',
    EXTENSIONS = 'extensions',
    FLAGS = 'flags',
    HISTORY_CLUSTERS = 'history-clusters',
    HISTORY_VIEW = 'history-view',
    INSPECT = 'insepct',
    INTERSTITIALS = 'interstitials',
    LINUX_PROXY_CONFIG = 'linux-proxy-config',
    MANAGEMENT = 'management',
    NETWORK_ERRORS = 'network-errors',
    PASSWORD_MANAGER = 'password-manager',
    PROFILES = 'profiles',
    READING_LIST = 'reading-list',
    SETTINGS = 'settings',
    SITE_ENGAGEMENT = 'site-engagement',
    SYSTEM = 'system',
    TERMS = 'terms',
    VERSION = 'version',
  }

  export const MENU_ID_TO_URL: Record<ClickableMenuId, string> = {
    [ClickableMenuId.ABOUT]: 'about:help',
    [ClickableMenuId.APP_SERVICE_INTERNAL]: 'about:app-service-internals',
    [ClickableMenuId.APPS]: 'about:apps',
    [ClickableMenuId.ATTRIBUTION_INTERNALS]: 'about:attribution-internals',
    [ClickableMenuId.BOOKMARKS]: 'about:bookmarks',
    [ClickableMenuId.BOOKMARKS_SIDE_PANEL]:
        'about:bookmarks-side-panel.top-chrome',
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

developer_pages.addClickableMenu(developer_pages.ClickableMenuId.APPS, 'Apps', developer_pages.GroupMenuId.BROWSER_LINKS)
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.BOOKMARKS, 'Bookmarks', developer_pages.GroupMenuId.BROWSER_LINKS)
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.CRASHES, 'Crashes', developer_pages.GroupMenuId.BROWSER_LINKS)
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.DOWNLOADS, 'Downloads', developer_pages.GroupMenuId.BROWSER_LINKS)
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.EXTENSIONS, 'Extensions', developer_pages.GroupMenuId.BROWSER_LINKS)
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.FLAGS, 'Flags', developer_pages.GroupMenuId.BROWSER_LINKS)
developer_pages.addMenuGroup(developer_pages.GroupMenuId.HISTORY, 'History', developer_pages.GroupMenuId.BROWSER_LINKS)
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.HISTORY_VIEW, 'View', developer_pages.GroupMenuId.HISTORY)
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.HISTORY_CLUSTERS, 'Clusters', developer_pages.GroupMenuId.HISTORY)
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.INSPECT, 'Inspect', developer_pages.GroupMenuId.BROWSER_LINKS)
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.PASSWORD_MANAGER, 'Password Manager', developer_pages.GroupMenuId.BROWSER_LINKS)
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.READING_LIST, 'Reading List', developer_pages.GroupMenuId.BROWSER_LINKS)
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.SETTINGS, 'Settings', developer_pages.GroupMenuId.BROWSER_LINKS)
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.SITE_ENGAGEMENT, 'Site Engagement', developer_pages.GroupMenuId.BROWSER_LINKS)

developer_pages.addSeparator(developer_pages.GroupMenuId.BROWSER_LINKS);

developer_pages.addMenuGroup(developer_pages.GroupMenuId.DEBUG, 'Debug', developer_pages.GroupMenuId.BROWSER_LINKS)
developer_pages.addMenuGroup(developer_pages.GroupMenuId.FUN, 'Fun', developer_pages.GroupMenuId.BROWSER_LINKS)
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.DINO, 'Dino', developer_pages.GroupMenuId.FUN)
developer_pages.addMenuGroup(developer_pages.GroupMenuId.INTERNALS, 'Internals', developer_pages.GroupMenuId.BROWSER_LINKS)
developer_pages.addMenuGroup(developer_pages.GroupMenuId.REFERENCE, 'Reference', developer_pages.GroupMenuId.BROWSER_LINKS)
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.INTERSTITIALS, 'Interstitials', developer_pages.GroupMenuId.REFERENCE)
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.NETWORK_ERRORS, 'Network Errors', developer_pages.GroupMenuId.REFERENCE)
developer_pages.addMenuGroup(developer_pages.GroupMenuId.SETTINGS, 'Settings', developer_pages.GroupMenuId.BROWSER_LINKS)
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.MANAGEMENT, 'Management', developer_pages.GroupMenuId.SETTINGS)
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.PROFILES, 'Profiles', developer_pages.GroupMenuId.SETTINGS)
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.LINUX_PROXY_CONFIG, 'Proxy Configuration', developer_pages.GroupMenuId.SETTINGS)

developer_pages.addSeparator(developer_pages.GroupMenuId.BROWSER_LINKS);

developer_pages.addClickableMenu(developer_pages.ClickableMenuId.ABOUT, 'About', developer_pages.GroupMenuId.BROWSER_LINKS)
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.CREDITS, 'Credits', developer_pages.GroupMenuId.BROWSER_LINKS)
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.TERMS, 'Terms', developer_pages.GroupMenuId.BROWSER_LINKS)
developer_pages.addClickableMenu(developer_pages.ClickableMenuId.VERSION, 'Version', developer_pages.GroupMenuId.BROWSER_LINKS)


chrome.contextMenus.onClicked.addListener((info, _tab?) => {
  const menuItemId = info.menuItemId as string;

  if (menuItemId.startsWith(developer_pages.CLICKABLE_PREFIX)) {
    const menuId =
        menuItemId.substring(developer_pages.CLICKABLE_PREFIX.length) as
        developer_pages.ClickableMenuId;
    developer_pages.openUrl(developer_pages.MENU_ID_TO_URL[menuId]);
  }
});