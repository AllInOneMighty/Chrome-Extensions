namespace tooltip {
  export const TOOLTIP_ID = 'e01n2KonBeR9ayn1';

  const DATA_BASE_OFFSET_LEFT = 'baseOffsetLeft';
  const DATA_BASE_OFFSET_TOP = 'baseOffsetTop';
  const TOOLTIP_DISTANCE = 15;

  function moveTooltipOnScroll(event: Event): void {
    // Only react to events seen on the original element where this method was
    // attached.
    if (!event.currentTarget || event.currentTarget !== event.target) {
      return;
    }

    const tooltipElement = document.querySelector('.tooltip') as HTMLElement;
    const tooltipNewLeft =
        Number(tooltipElement.dataset[DATA_BASE_OFFSET_LEFT]) + window.scrollX;
    const tooltipNewTop =
        Number(tooltipElement.dataset[DATA_BASE_OFFSET_TOP]) + window.scrollY;

    tooltipElement.style.left = tooltipNewLeft.toString() + 'px';
    tooltipElement.style.top = tooltipNewTop.toString() + 'px';
  }

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

    // Reset tooltip first
    tooltipElement.textContent = '';
    // Then fill it, or return if there was no content.
    if (!fillTooltipMethod(anchorElement, tooltipElement)) {
      return;
    }

    // Calculate position of listener element. Using getBoundingClientRect()
    // is faster, but we need to traverse the element tree to determine if the
    // position is fixed anyway.
    let listenerTraversalElement = anchorElement as HTMLElement;
    let listenerElementOffsetLeft = 0;
    let listenerElementOffsetTop = 0;
    let isListenerElementFixedPosition = false;
    do {
      listenerElementOffsetLeft += listenerTraversalElement.offsetLeft;
      listenerElementOffsetTop += listenerTraversalElement.offsetTop;
      isListenerElementFixedPosition = isListenerElementFixedPosition ||
          getComputedStyle(listenerTraversalElement).position === 'fixed';
      listenerTraversalElement =
          listenerTraversalElement.offsetParent as HTMLElement;
    } while (listenerTraversalElement);

    // Adding window scroll if element is fixed position
    if (isListenerElementFixedPosition) {
      listenerElementOffsetLeft += window.scrollX;
      listenerElementOffsetTop += window.scrollY;
    }

    // Need to display tooltip to accurately get its size
    // Position it top left to avoid shrinking due to max-width
    tooltipElement.style.top = '0';
    tooltipElement.style.left = '0';
    tooltipElement.style.display = 'flex';
    const tooltipElementHeight = tooltipElement.offsetHeight;
    const tooltipElementWidth = tooltipElement.offsetWidth;

    // Determine where to display the tooltip relative to viewport
    const viewHeight = document.documentElement.clientWidth;
    const viewWidth = document.documentElement.clientWidth;
    const listenerElementHeight = anchorElement.offsetHeight;
    let tooltipElementOffsetLeft = listenerElementOffsetLeft;
    let tooltipElementOffsetTop =
        listenerElementOffsetTop + listenerElementHeight + TOOLTIP_DISTANCE;
    // If tooltip goes beyond right side of viewport, position it to the left
    // of the listener element.
    if (tooltipElementOffsetLeft + tooltipElementWidth >= viewWidth) {
      tooltipElementOffsetLeft =
          listenerElementOffsetLeft - tooltipElementWidth - TOOLTIP_DISTANCE;
      // If we move the tooltip to the left side, also align its top to the
      // top of the listener element.
      tooltipElementOffsetTop = listenerElementOffsetTop;
    }
    // If tooltip goes beyond bottom side of viewport, position it to the top
    // of the listener element.
    if (tooltipElementOffsetTop + tooltipElementHeight >= viewHeight) {
      tooltipElementOffsetTop =
          listenerElementHeight - TOOLTIP_DISTANCE - tooltipElementHeight;
    }

    tooltipElement.style.left = tooltipElementOffsetLeft.toString() + 'px';
    tooltipElement.style.top = tooltipElementOffsetTop.toString() + 'px';

    if (isListenerElementFixedPosition) {
      // If element is fixed, we need to move the tooltip as the page is
      // scrolled. Save its base offset left/top to be able to reposition it
      // on demand.
      tooltipElement.dataset[DATA_BASE_OFFSET_LEFT] =
          (tooltipElementOffsetLeft - window.scrollX).toString();
      tooltipElement.dataset[DATA_BASE_OFFSET_TOP] =
          (tooltipElementOffsetTop - window.scrollY).toString();
      document.addEventListener('scroll', moveTooltipOnScroll);
    }
  }

  export function hideTooltip() {
    const tooltipElement =
        document.querySelector('#' + TOOLTIP_ID) as HTMLElement;
    if (tooltipElement == null) {
      // Tooltip not found, return early.
      return;
    }
    // Don't really need to clean those datasets, but cleaner, so let's do it.
    tooltipElement.dataset[DATA_BASE_OFFSET_LEFT] = '';
    tooltipElement.dataset[DATA_BASE_OFFSET_TOP] = '';
    document.removeEventListener('scroll', moveTooltipOnScroll);
    tooltipElement.style.display = 'none';
  }

  /**
   * Adds event listeners to display a tooltip when the mouse enters the given
   * anchor element, and hides it when the mouse leaves it and all of its
   * children.
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