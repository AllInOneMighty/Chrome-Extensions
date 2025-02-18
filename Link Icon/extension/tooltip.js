"use strict";
var tooltip;
(function (tooltip) {
    tooltip.TOOLTIP_ID = 'e01n2KonBeR9ayn1';
    const DATA_BASE_OFFSET_LEFT = 'baseOffsetLeft';
    const DATA_BASE_OFFSET_TOP = 'baseOffsetTop';
    const TOOLTIP_DISTANCE = 15;
    function moveTooltipOnScroll(event) {
        if (!event.currentTarget || event.currentTarget !== event.target) {
            return;
        }
        const tooltipElement = document.querySelector('.tooltip');
        const tooltipNewLeft = Number(tooltipElement.dataset[DATA_BASE_OFFSET_LEFT]) + window.scrollX;
        const tooltipNewTop = Number(tooltipElement.dataset[DATA_BASE_OFFSET_TOP]) + window.scrollY;
        tooltipElement.style.left = tooltipNewLeft.toString() + 'px';
        tooltipElement.style.top = tooltipNewTop.toString() + 'px';
    }
    function showTooltip(anchorElement, fillTooltipMethod) {
        const tooltipElement = document.querySelector('#' + tooltip.TOOLTIP_ID);
        if (tooltipElement == null) {
            return;
        }
        tooltipElement.textContent = '';
        if (!fillTooltipMethod(anchorElement, tooltipElement)) {
            return;
        }
        let listenerTraversalElement = anchorElement;
        let listenerElementOffsetLeft = 0;
        let listenerElementOffsetTop = 0;
        let isListenerElementFixedPosition = false;
        do {
            listenerElementOffsetLeft += listenerTraversalElement.offsetLeft;
            listenerElementOffsetTop += listenerTraversalElement.offsetTop;
            isListenerElementFixedPosition = isListenerElementFixedPosition ||
                getComputedStyle(listenerTraversalElement).position === 'fixed';
            listenerTraversalElement =
                listenerTraversalElement.offsetParent;
        } while (listenerTraversalElement);
        if (isListenerElementFixedPosition) {
            listenerElementOffsetLeft += window.scrollX;
            listenerElementOffsetTop += window.scrollY;
        }
        tooltipElement.style.top = '0';
        tooltipElement.style.left = '0';
        tooltipElement.style.display = 'flex';
        const tooltipElementHeight = tooltipElement.offsetHeight;
        const tooltipElementWidth = tooltipElement.offsetWidth;
        const viewHeight = document.documentElement.clientWidth;
        const viewWidth = document.documentElement.clientWidth;
        const listenerElementHeight = anchorElement.offsetHeight;
        let tooltipElementOffsetLeft = listenerElementOffsetLeft;
        let tooltipElementOffsetTop = listenerElementOffsetTop + listenerElementHeight + TOOLTIP_DISTANCE;
        if (tooltipElementOffsetLeft + tooltipElementWidth >= viewWidth) {
            tooltipElementOffsetLeft =
                listenerElementOffsetLeft - tooltipElementWidth - TOOLTIP_DISTANCE;
            tooltipElementOffsetTop = listenerElementOffsetTop;
        }
        if (tooltipElementOffsetTop + tooltipElementHeight >= viewHeight) {
            tooltipElementOffsetTop =
                listenerElementHeight - TOOLTIP_DISTANCE - tooltipElementHeight;
        }
        tooltipElement.style.left = tooltipElementOffsetLeft.toString() + 'px';
        tooltipElement.style.top = tooltipElementOffsetTop.toString() + 'px';
        if (isListenerElementFixedPosition) {
            tooltipElement.dataset[DATA_BASE_OFFSET_LEFT] =
                (tooltipElementOffsetLeft - window.scrollX).toString();
            tooltipElement.dataset[DATA_BASE_OFFSET_TOP] =
                (tooltipElementOffsetTop - window.scrollY).toString();
            document.addEventListener('scroll', moveTooltipOnScroll);
        }
    }
    tooltip.showTooltip = showTooltip;
    function hideTooltip() {
        const tooltipElement = document.querySelector('#' + tooltip.TOOLTIP_ID);
        if (tooltipElement == null) {
            return;
        }
        tooltipElement.dataset[DATA_BASE_OFFSET_LEFT] = '';
        tooltipElement.dataset[DATA_BASE_OFFSET_TOP] = '';
        document.removeEventListener('scroll', moveTooltipOnScroll);
        tooltipElement.style.display = 'none';
    }
    tooltip.hideTooltip = hideTooltip;
    function addTooltipEventListeners(anchorElement, fillTooltipMethod) {
        anchorElement.addEventListener('mouseenter', (_event) => {
            showTooltip(anchorElement, fillTooltipMethod);
        });
        anchorElement.addEventListener('mouseleave', (_event) => {
            hideTooltip();
        });
    }
    tooltip.addTooltipEventListeners = addTooltipEventListeners;
})(tooltip || (tooltip = {}));
