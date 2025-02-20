namespace tooltip {
  export const TOOLTIP_ID = 'e01n2KonBeR9ayn1';

  const TOOLTIP_DISTANCE = 15;

  const TOOLTIP_LEFT_CLASS = 'left';
  const TOOLTIP_BELOW_CLASS = 'below';
  const TOOLTIP_ABOVE_CLASS = 'above';

  /**
   * Immediately shows the tooltip on the given element using the filling method
   * to fill its contents.
   */
  export function showTooltip(
      anchorElement: HTMLAnchorElement,
      fillTooltipMethod: (
          anchorElement: HTMLAnchorElement,
          tooltipElement: HTMLElement,
          ) => boolean) {
    const tooltipElement =
        document.querySelector('#' + TOOLTIP_ID) as HTMLElement;
    if (tooltipElement == null) {
      // Tooltip not found, return early.
      return;
    }

    // Reset tooltip contents first
    tooltipElement.textContent = '';
    // Then fill it, and return if there is no content.
    if (!fillTooltipMethod(anchorElement, tooltipElement)) {
      return;
    }

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
  }

  /**
   * Adds mouse enter/leave event listeners to display a tooltip when the mouse
   * enters the given anchor element, and hides it when the mouse leaves it and
   * all of its children.
   */
  export function addTooltipEventListeners(
      anchorElement: HTMLAnchorElement,
      fillTooltipMethod: (
          anchorElement: HTMLAnchorElement,
          tooltipElement: HTMLElement,
          ) => boolean,
  ) {
    anchorElement.addEventListener('mouseenter', (_event: Event) => {
      showTooltip(anchorElement, fillTooltipMethod);
    });
    anchorElement.addEventListener('mouseleave', (_event: Event) => {
      hideTooltip();
    });
  }

}  // namespace tooltip