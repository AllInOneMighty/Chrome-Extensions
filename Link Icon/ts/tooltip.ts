namespace tooltip {
  export const TOOLTIP_ID = 'e01n2KonBeR9ayn1';

  const TOOLTIP_DISTANCE = 15;

  const TOOLTIP_LEFT_CLASS = 'left';
  const TOOLTIP_BELOW_CLASS = 'below';
  const TOOLTIP_ABOVE_CLASS = 'above';

  // Track the last icons shown in the tooltip to avoid re-rendering it if the
  // same icons are to be shown again.
  let lastIconsShown: Set<link_icon.IconId> = new Set<link_icon.IconId>();

  /**
   * Fills the given tooltip with the given icons to show.
   */
  function fillTooltipContents(
      iconsToShow: Set<link_icon.IconId>, linkIcon: link_icon.LinkIcon,
      tooltipElement: HTMLElement) {
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
  }

  /**
   * Immediately shows the tooltip on the given element using the filling method
   * to fill its contents.
   *
   * Args:
   *  anchorElement: The anchor element to show the tooltip on.
   *  getIconsToShowMethod: The method to get the icons to show for the given
   *    anchor element.
   *  linkIcon: The link icon instance.
   *  forceUpdate: Whether to force updating the tooltip contents. Useful if the
   *    tooltip's class or style has changed, which may affect the tooltip's
   *    position and size.
   */
  export function showTooltip(
      anchorElement: HTMLAnchorElement,
      getIconsToShowMethod:
          (anchor: HTMLAnchorElement) => Set<link_icon.IconId>,
      linkIcon: link_icon.LinkIcon, forceUpdate: boolean = false) {
    const tooltipElement =
        document.querySelector('#' + TOOLTIP_ID) as HTMLElement;
    if (tooltipElement == null) {
      // Tooltip not found, return early.
      return;
    }

    const iconsToShow = getIconsToShowMethod(anchorElement);

    if (iconsToShow.size == 0) {
      // No icons to show, hide the tooltip and return early.
      // This clears the lastIconsShown set as well.
      hideTooltip();
      return;
    }

    if (!forceUpdate && iconsToShow.size == lastIconsShown.size &&
        iconsToShow.isSubsetOf(lastIconsShown)) {
      // No change in icons to show, return early.
      return;
    }

    // Reset tooltip contents first.
    tooltipElement.textContent = '';
    fillTooltipContents(iconsToShow, linkIcon, tooltipElement);

    lastIconsShown = iconsToShow;

    // Get position of anchor within the viewport.
    const anchorClientRect = anchorElement.getBoundingClientRect();

    // Determine the tooltip's size.
    // Need to display tooltip to accurately get its size
    // Position it top left to avoid shrinking due to max-width
    tooltipElement.style.top = '0';
    tooltipElement.style.left = '0';
    tooltipElement.style.display = 'flex';
    const tooltipElementHeight = tooltipElement.offsetHeight;
    const tooltipElementWidth = tooltipElement.offsetWidth;

    // Determine the anchor's height.
    const anchorElementHeight = anchorElement.offsetHeight;

    // Determine where to display the tooltip relative to viewport.
    let tooltipElementViewportLeft =
        anchorClientRect.left - tooltipElementWidth - TOOLTIP_DISTANCE;
    let tooltipElementViewportTop = anchorClientRect.top +
        anchorElementHeight / 2 - tooltipElementHeight / 2;

    // By default, tooltip is displayed on the left of anchors.
    tooltipElement.className = TOOLTIP_LEFT_CLASS;

    // If tooltip goes beyond left side of viewport, position it under the
    // anchor element.
    if (tooltipElementViewportLeft <= 0) {
      tooltipElementViewportLeft = anchorClientRect.left;
      tooltipElementViewportTop =
          anchorClientRect.top + anchorElementHeight + TOOLTIP_DISTANCE;
      tooltipElement.className = TOOLTIP_BELOW_CLASS;
    }

    // If tooltip goes beyond bottom side of viewport, position it to the top
    // of the anchor element.
    if (tooltipElementViewportTop + tooltipElementHeight >=
        window.innerHeight) {
      tooltipElementViewportLeft = anchorClientRect.left;
      tooltipElementViewportTop =
          anchorClientRect.top - tooltipElementHeight - TOOLTIP_DISTANCE;
      tooltipElement.className = TOOLTIP_ABOVE_CLASS;
    }

    // Finally, position the tooltip.
    tooltipElement.style.left = tooltipElementViewportLeft.toString() + 'px';
    tooltipElement.style.top = tooltipElementViewportTop.toString() + 'px';
  }

  export function hideTooltip() {
    const tooltipElement =
        document.querySelector('#' + TOOLTIP_ID) as HTMLElement;
    if (tooltipElement == null) {
      // Tooltip not found, return early.
      return;
    }
    tooltipElement.style.display = 'none';
    lastIconsShown.clear();
  }

  /**
   * Adds mouse enter/leave event listeners to display a tooltip when the mouse
   * enters the given anchor element, and hides it when the mouse leaves it and
   * all of its children.
   */
  export function addTooltipEventListeners(
      anchorElement: HTMLAnchorElement,
      getIconsToShowMethod:
          (anchor: HTMLAnchorElement) => Set<link_icon.IconId>,
      linkIcon: link_icon.LinkIcon) {
    anchorElement.addEventListener('mouseenter', (_event: Event) => {
      showTooltip(anchorElement, getIconsToShowMethod, linkIcon);
    });
    anchorElement.addEventListener('mouseleave', (_event: Event) => {
      hideTooltip();
    });
  }

}  // namespace tooltip