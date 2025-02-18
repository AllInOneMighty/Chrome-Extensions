namespace engine {
  const linkIcon = new link_icon.LinkIcon();

  // User settings
  var userSettings: Record<string, any>;
  // Keeps track of the mouse position to detect when a link disappears.
  var mouseX = 0;
  var mouseY = 0;

  export function loadUserSettings(value: {[key: string]: any;}) {
    if (typeof (value) === 'object') {
      userSettings = value;
    } else {
      userSettings = {};
    }
  }

  export function observe() {
    // Listen to anchor element changes and update tooltip state accordingly.
    const observer = new MutationObserver(function(mutations, observer) {
      mutations.forEach((mutation, _index, _array) => {
        // Only look at anchors
        if (!(mutation.target instanceof HTMLAnchorElement)) {
          return;
        }

        // If mouse is not over an anchor (it has disappeared), hide the
        // tooltip.
        const anchor = findAnchor(document.elementFromPoint(mouseX, mouseY));
        if (anchor == null) {
          tooltip.hideTooltip();
          return;
        }

        // If the anchor's attributes has changed (except 'data-' which are used
        // for rendering), hide and show the tooltip to potentially update it.
        if (mutation.type == 'attributes' &&
            !mutation.attributeName?.startsWith('data-')) {
          tooltip.hideTooltip();
          tooltip.showTooltip(anchor, maybeFillTooltipContents);
        }
      });
    });
    observer.observe(
        document, {attributes: true, childList: false, subtree: true});
  }

  // Fills the given tooltip with icons related to the given anchor, or returns
  // `false` if nothing was filled.
  function maybeFillTooltipContents(
      anchor: HTMLAnchorElement, tooltipElement: HTMLElement): boolean {
    const iconsToShow = new Set<link_icon.IconId>();

    // Compute URL extension here to do it only once per URL and not once per
    // icon and per URL.
    const url = new URL(anchor.href);
    var urlExtension = '';
    if (url.protocol == link_icon.Protocol.HTTP ||
        url.protocol == link_icon.Protocol.HTTPS ||
        url.protocol == link_icon.Protocol.FTP ||
        url.protocol == link_icon.Protocol.FILE) {
      urlExtension = url.pathname.substring(url.pathname.lastIndexOf('.'));
    }

    for (const icon of linkIcon.iconsByPriority) {
      if (icon.isEnabled(userSettings) &&
          icon.matches(document.location, anchor, urlExtension)) {
        icon.addAndMaybeDeactivate(iconsToShow);
      }
    }

    if (iconsToShow.size == 0) {
      return false;
    }

    // At least one icon to display.
    // Iterate over ordered list of icon and for each one we can find in the
    // icons to show, add it to the tooltip.
    for (const icon of linkIcon.iconsByPriority) {
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

    return true;
  }

  // Recursively matches the first anchor with the given element or one of its
  // parents.
  function findAnchor(target: EventTarget|Node|null): HTMLAnchorElement
      |undefined {
    if (target == null || !(target instanceof Node)) {
      return undefined;
    }
    if (target instanceof HTMLAnchorElement) {
      return target;
    }
    return findAnchor(target.parentNode);
  }

  // Will be run each time the mouse is moved
  export const mousemoveFunction = (event: MouseEvent) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    const targetAnchor = findAnchor(event.target);
    if (targetAnchor == null) {
      return;
    }

    if (!(tooltip.TOOLTIP_ID in targetAnchor.dataset)) {
      // Save that event listeners have been added to not re-add them every
      // time.
      targetAnchor.dataset[tooltip.TOOLTIP_ID] = '1';
      tooltip.addTooltipEventListeners(
          targetAnchor,
          (anchorElement: HTMLAnchorElement, tooltipElement: HTMLElement) => {
            return maybeFillTooltipContents(anchorElement, tooltipElement);
          });
      // Mouse is already over anchor, so force showing the tooltip.
      tooltip.showTooltip(targetAnchor, maybeFillTooltipContents);
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
