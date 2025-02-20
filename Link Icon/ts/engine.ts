namespace engine {
  const linkIcon = new link_icon.LinkIcon();

  // User settings
  let userSettings: Record<string, any>;
  // Keeps track of the mouse position to detect when a link disappears.
  let clientX = 0;
  let clientY = 0;

  let timeoutId: number|undefined;

  /**
   * Recursively matches the first anchor with the given element or one of its
   * parents.
   */
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

  /**
   * Returns the anchor pointed at by the current mouse position, or `undefined`
   * if it could not be found.
   */
  function anchorFromPoint(): HTMLAnchorElement|undefined {
    return findAnchor(document.elementFromPoint(clientX, clientY));
  }

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
        const anchorElement = anchorFromPoint();
        if (anchorElement == null) {
          tooltip.hideTooltip();
          return;
        }

        // If the anchor's attributes has changed (except 'data-' which are used
        // for rendering), force show the tooltip to potentially update it.
        if (mutation.type == 'attributes' &&
            !mutation.attributeName?.startsWith('data-')) {
          tooltip.showTooltip(anchorElement, maybeFillTooltipContents);
        }
      });
    });
    observer.observe(
        document, {attributes: true, childList: false, subtree: true});
  }

  /**
   * Fills the given tooltip with icons related to the given anchor, or returns
   * `false` if nothing was filled.
   */
  function maybeFillTooltipContents(
      anchor: HTMLAnchorElement, tooltipElement: HTMLElement): boolean {
    const iconsToShow = new Set<link_icon.IconId>();

    // Compute URL extension here to do it only once per URL and not once per
    // icon and per URL.
    let url: URL|undefined = undefined;
    let urlLastExtension = '';
    if (anchor.href) {
      url = new URL(anchor.href);
      if (url.protocol == link_icon.Protocol.HTTP ||
          url.protocol == link_icon.Protocol.HTTPS ||
          url.protocol == link_icon.Protocol.FTP ||
          url.protocol == link_icon.Protocol.FILE) {
        urlLastExtension =
            url.pathname.substring(url.pathname.lastIndexOf('.'));
      }
    }

    for (const icon of linkIcon.iconsByPriority) {
      if (icon.isEnabled(userSettings) &&
          icon.matches(document.location, anchor, url, urlLastExtension)) {
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

  /**
   * Adds tooltip event listeners to the given anchor if they are not already
   * present.
   *
   * @param anchorElement The anchor element to which add the listeners.
   * @returns `true` if listeners were added, `false` if they already existed.
   */
  function maybeAddTooltipEventListeners(anchorElement: HTMLAnchorElement):
      boolean {
    if (!(tooltip.TOOLTIP_ID in anchorElement.dataset)) {
      // Save that event listeners have been added to not re-add them every
      // time.
      anchorElement.dataset[tooltip.TOOLTIP_ID] = '1';
      tooltip.addTooltipEventListeners(
          anchorElement,
          (anchorElement: HTMLAnchorElement, tooltipElement: HTMLElement) => {
            return maybeFillTooltipContents(anchorElement, tooltipElement);
          });
      return true;
    }
    return false;
  }

  export const mousemoveEventListener = (ev: MouseEvent) => {
    clientX = ev.clientX;
    clientY = ev.clientY;

    const anchorElement = anchorFromPoint();
    if (anchorElement == null) {
      return;
    }

    if (maybeAddTooltipEventListeners(anchorElement)) {
      // Mouse is already over anchor, so force showing the tooltip.
      tooltip.showTooltip(anchorElement, maybeFillTooltipContents);
    }
  };

  export const scrollEventListener = (_ev: Event) => {
    tooltip.hideTooltip();
  };

  export const scrollendEventListener = (_ev: Event) => {
    const anchorElement = anchorFromPoint();
    if (anchorElement == null) {
      return;
    }

    maybeAddTooltipEventListeners(anchorElement);
    // Scrolling on an element does not trigger mouseenter, so forcibly show the
    // tooltip every time.
    tooltip.showTooltip(anchorElement, maybeFillTooltipContents);
  };

  export const wheelEventListener = (_ev: WheelEvent) => {
    tooltip.hideTooltip();

    if (timeoutId != undefined) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      const anchorElement = anchorFromPoint();
      if (anchorElement == null) {
        return;
      }

      maybeAddTooltipEventListeners(anchorElement);
      // It is not guaranteed that a mousenter event is fired, so always show
      // the tooltip.
      tooltip.showTooltip(anchorElement, maybeFillTooltipContents);

      timeoutId = undefined;
    }, 200);
  };

}  // namespace engine

// Retrieve user settings asynchronously. Some user settings might not be taken
// in account on the first link.
chrome.storage.sync.get().then((value) => {
  engine.loadUserSettings(value);
});

// Create tooltip as soon as DOM is loaded.
document.addEventListener('DOMContentLoaded', (ev: Event) => {
  const tooltipElement = document.createElement('div');
  tooltipElement.id = tooltip.TOOLTIP_ID;
  document.body.appendChild(tooltipElement);
});

// Only listen if mouse is over the document.
document.addEventListener('mouseenter', (event) => {
  document.addEventListener('mousemove', engine.mousemoveEventListener);
  document.addEventListener('scroll', engine.scrollEventListener);
  document.addEventListener('scrollend', engine.scrollendEventListener);
  document.addEventListener('wheel', engine.wheelEventListener);
});

// Remove listeners if mouse leaves the document.
document.addEventListener('mouseleave', (event) => {
  document.removeEventListener('mousemove', engine.mousemoveEventListener);
  document.removeEventListener('scroll', engine.scrollEventListener);
  document.removeEventListener('scrollend', engine.scrollendEventListener);
  document.removeEventListener('wheel', engine.wheelEventListener);
});

// Observe anchor changes
engine.observe();
