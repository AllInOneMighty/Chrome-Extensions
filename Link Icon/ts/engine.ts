namespace engine {
  const linkIcon = new link_icon.LinkIcon();

  // User settings
  var userSettings: Record<string, any>;

  export function loadUserSettings(value: {[key: string]: any;}) {
    if (typeof (value) === 'object') {
      userSettings = value;
    } else {
      userSettings = {};
    }
  }

  export function observe() {
    // Listen to link element changes and remove tooltips if it happens
    const observer = new MutationObserver(function(mutations, observer) {
      mutations.forEach(function(mutation) {
        if (!(mutation.target instanceof Element)) {
          return;
        }
        const target = mutation.target as Element;
        // Only look at links
        if (target.tagName == 'A') {
          // If a link attribute has changed, remove opentip to generate a new
          // one if (target.opentip != null) {
          //   target.opentip = null;
          // }
        }
      });
    });
    observer.observe(
        document, {attributes: true, childList: false, subtree: true});
  }

  // Fills the given tooltip contents or returns `false` if nothing was to be
  // filled.
  function maybeFillTooltipContents(
      link: HTMLAnchorElement, tooltipElement: HTMLElement): boolean {
    const iconsToShow = new Set<link_icon.IconId>();

    // Compute link extension here to do it only once per link
    // and not once per icon and per link
    const url = new URL(link.href);
    var linkExtension = '';
    if (url.protocol == link_icon.Protocol.HTTP ||
        url.protocol == link_icon.Protocol.HTTPS ||
        url.protocol == link_icon.Protocol.FTP ||
        url.protocol == link_icon.Protocol.FILE) {
      linkExtension = url.pathname.substring(url.pathname.lastIndexOf('.'));
    }

    // Determinate all icons to display
    var iconsByPriority = linkIcon.iconsByPriority;

    for (var index in iconsByPriority) {
      const icon = iconsByPriority[index];
      if (icon.isEnabled(userSettings) &&
          icon.matches(document.location, link, linkExtension)) {
        icon.addAndMaybeDeactivate(iconsToShow);
      }
    }

    if (iconsToShow.size == 0) {
      return false;
    }

    if (iconsToShow.size != 0) {
      // At least one icon to display
      // Iterate over ordered list of icon and for each
      // one we can find into the LinkIcons object, add
      // it to the resulting HTML
      for (var index in iconsByPriority) {
        const icon = iconsByPriority[index];

        if (iconsToShow.has(icon.id)) {
          const span = document.createElement('span');
          span.style.background =
              'url("data:image/png;base64,' + icon.imageBase64 + '")';
          span.style.display = 'inline-block';
          span.style.height = '16px';
          span.style.width = '16px';
          tooltipElement.appendChild(span);
        }
      }
    }

    return true;
  }

  // Recursively matches the first link with the given element or one of its
  // parents.
  function findLink(target: EventTarget|Node|null): HTMLAnchorElement
      |undefined {
    if (target == null || !(target instanceof Node)) {
      return undefined;
    }
    if (target instanceof HTMLAnchorElement) {
      return target;
    }
    return findLink(target.parentNode);
  }

  // Will be launched each time the mouse is moved
  export var mousemoveFunction = (event: MouseEvent) => {
    var targetLink = findLink(event.target);
    if (targetLink == null) {
      return;
    }

    if (!(tooltip.TOOLTIP_ID in targetLink.dataset)) {
      targetLink.dataset[tooltip.TOOLTIP_ID] = '1';
      tooltip.addTooltip(
          targetLink,
          (listenerElement: Element, tooltipElement: HTMLElement) => {
            return maybeFillTooltipContents(targetLink!, tooltipElement);
          });
    }
  };

}  // namespace engine

// Create tooltip when DOM is loaded.
document.addEventListener('DOMContentLoaded', (ev: Event) => {
  const tooltipElement = document.createElement('div');
  tooltipElement.id = tooltip.TOOLTIP_ID;
  document.body.appendChild(tooltipElement);
});

// Retrieve user settings, start observing, react to mouse movements and tab
// changes.
chrome.storage.sync.get().then((value) => {
  engine.loadUserSettings(value);
  engine.observe();

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // If another tab is activated, hide the tooltip
    if (message == 'tabs.onActivated') {
      // if (last_valid_target != null && last_valid_target.opentip != null &&
      //     last_valid_target.opentip != -1) {
      //   last_valid_target.opentip.hide();
      // }
    }
  });

  // Only listen to mousemove if mouse if over the document
  document.addEventListener(
      'mouseenter',
      (event) => {
          document.addEventListener('mousemove', engine.mousemoveFunction)});

  // Unbind mousemove if mouse has left the document
  document.addEventListener('mouseleave', (event) => {
    document.removeEventListener('mousemove', engine.mousemoveFunction);
  });
});
