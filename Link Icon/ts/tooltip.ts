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
   * Displays a tooltip when the mouse enters the given element, and hides it
   * when the mouse leaves it and all of its children. This method guarantees
   * the display of the whole tooltip inside the display viewport, and manages
   * scrolling with fixed elements.
   */
  export function addTooltip(
      listenerElement: Element,
      fillTooltipMethod: (
          listenerElement: Element,
          tooltipElement: HTMLElement,
          ) => boolean,
  ) {
    const tooltipElement =
        document.querySelector('#' + TOOLTIP_ID) as HTMLElement;

    listenerElement.addEventListener('mouseenter', (event: Event) => {
      // Reset tooltip first
      tooltipElement.textContent = '';
      // Then fill it
      if (!fillTooltipMethod(listenerElement, tooltipElement)) {
        return;
      }

      const listenerHtmlElement = listenerElement as HTMLElement;

      // Calculate position of listener element. Using getBoundingClientRect()
      // is faster, but we need to traverse the element tree to determine if the
      // position is fixed anyway.
      let listenerTraversalElement = listenerHtmlElement;
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
      const listenerElementHeight = listenerHtmlElement.offsetHeight;
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
    });
    listenerElement.addEventListener('mouseleave', (event: Event) => {
      // Don't really need to clean those datasets, but cleaner, so let's do it.
      tooltipElement.dataset[DATA_BASE_OFFSET_LEFT] = '';
      tooltipElement.dataset[DATA_BASE_OFFSET_TOP] = '';
      document.removeEventListener('scroll', moveTooltipOnScroll);
      tooltipElement.style.display = 'none';
    });
  }

}  // namespace tooltip