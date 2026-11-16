"use strict";
var tooltip;
(function (tooltip) {
    tooltip.TOOLTIP_ID = 'e01n2KonBeR9ayn1';
    const TOOLTIP_DISTANCE = 15;
    const TOOLTIP_LEFT_CLASS = 'left';
    const TOOLTIP_BELOW_CLASS = 'below';
    const TOOLTIP_ABOVE_CLASS = 'above';
    let lastIconsShown = new Set();
    function fillTooltipContents(iconsToShow, linkIcon, tooltipElement) {
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
    function showTooltip(anchorElement, getIconsToShowMethod, linkIcon, forceUpdate = false) {
        const tooltipElement = document.querySelector('#' + tooltip.TOOLTIP_ID);
        if (tooltipElement == null) {
            return;
        }
        const iconsToShow = getIconsToShowMethod(anchorElement);
        if (iconsToShow.size == 0) {
            hideTooltip();
            return;
        }
        if (!forceUpdate && iconsToShow.size == lastIconsShown.size &&
            iconsToShow.isSubsetOf(lastIconsShown)) {
            return;
        }
        tooltipElement.textContent = '';
        fillTooltipContents(iconsToShow, linkIcon, tooltipElement);
        lastIconsShown = iconsToShow;
        const anchorClientRect = anchorElement.getBoundingClientRect();
        tooltipElement.style.top = '0';
        tooltipElement.style.left = '0';
        tooltipElement.style.display = 'flex';
        const tooltipElementHeight = tooltipElement.offsetHeight;
        const tooltipElementWidth = tooltipElement.offsetWidth;
        const anchorElementHeight = anchorElement.offsetHeight;
        let tooltipElementViewportLeft = anchorClientRect.left - tooltipElementWidth - TOOLTIP_DISTANCE;
        let tooltipElementViewportTop = anchorClientRect.top +
            anchorElementHeight / 2 - tooltipElementHeight / 2;
        tooltipElement.className = TOOLTIP_LEFT_CLASS;
        if (tooltipElementViewportLeft <= 0) {
            tooltipElementViewportLeft = anchorClientRect.left;
            tooltipElementViewportTop =
                anchorClientRect.top + anchorElementHeight + TOOLTIP_DISTANCE;
            tooltipElement.className = TOOLTIP_BELOW_CLASS;
        }
        if (tooltipElementViewportTop + tooltipElementHeight >=
            window.innerHeight) {
            tooltipElementViewportLeft = anchorClientRect.left;
            tooltipElementViewportTop =
                anchorClientRect.top - tooltipElementHeight - TOOLTIP_DISTANCE;
            tooltipElement.className = TOOLTIP_ABOVE_CLASS;
        }
        tooltipElement.style.left = tooltipElementViewportLeft.toString() + 'px';
        tooltipElement.style.top = tooltipElementViewportTop.toString() + 'px';
    }
    tooltip.showTooltip = showTooltip;
    function hideTooltip() {
        const tooltipElement = document.querySelector('#' + tooltip.TOOLTIP_ID);
        if (tooltipElement == null) {
            return;
        }
        tooltipElement.style.display = 'none';
        lastIconsShown.clear();
    }
    tooltip.hideTooltip = hideTooltip;
    function addTooltipEventListeners(anchorElement, getIconsToShowMethod, linkIcon) {
        anchorElement.addEventListener('mouseenter', (_event) => {
            showTooltip(anchorElement, getIconsToShowMethod, linkIcon);
        });
        anchorElement.addEventListener('mouseleave', (_event) => {
            hideTooltip();
        });
    }
    tooltip.addTooltipEventListeners = addTooltipEventListeners;
})(tooltip || (tooltip = {}));
