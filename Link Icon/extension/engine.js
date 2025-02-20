"use strict";
var engine;
(function (engine) {
    const linkIcon = new link_icon.LinkIcon();
    var userSettings;
    var clientX = 0;
    var clientY = 0;
    function loadUserSettings(value) {
        if (typeof (value) === 'object') {
            userSettings = value;
        }
        else {
            userSettings = {};
        }
    }
    engine.loadUserSettings = loadUserSettings;
    function observe() {
        const observer = new MutationObserver(function (mutations, observer) {
            mutations.forEach((mutation, _index, _array) => {
                if (!(mutation.target instanceof HTMLAnchorElement)) {
                    return;
                }
                const anchor = findAnchor(document.elementFromPoint(clientX, clientY));
                if (anchor == null) {
                    tooltip.hideTooltip();
                    return;
                }
                if (mutation.type == 'attributes' &&
                    !mutation.attributeName?.startsWith('data-')) {
                    tooltip.hideTooltip();
                    tooltip.showTooltip(anchor, maybeFillTooltipContents);
                }
            });
        });
        observer.observe(document, { attributes: true, childList: false, subtree: true });
    }
    engine.observe = observe;
    function maybeFillTooltipContents(anchor, tooltipElement) {
        const iconsToShow = new Set();
        const url = new URL(anchor.href);
        var urlExtension = '';
        if (url.protocol == "http:" ||
            url.protocol == "https:" ||
            url.protocol == "ftp:" ||
            url.protocol == "file:") {
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
    function findAnchor(target) {
        if (target == null || !(target instanceof Node)) {
            return undefined;
        }
        if (target instanceof HTMLAnchorElement) {
            return target;
        }
        return findAnchor(target.parentNode);
    }
    engine.mousemoveFunction = (event) => {
        clientX = event.clientX;
        clientY = event.clientY;
        const targetAnchor = findAnchor(event.target);
        if (targetAnchor == null) {
            return;
        }
        if (!(tooltip.TOOLTIP_ID in targetAnchor.dataset)) {
            targetAnchor.dataset[tooltip.TOOLTIP_ID] = '1';
            tooltip.addTooltipEventListeners(targetAnchor, (anchorElement, tooltipElement) => {
                return maybeFillTooltipContents(anchorElement, tooltipElement);
            });
            tooltip.showTooltip(targetAnchor, maybeFillTooltipContents);
        }
    };
})(engine || (engine = {}));
chrome.storage.sync.get().then((value) => {
    engine.loadUserSettings(value);
});
document.addEventListener('DOMContentLoaded', (ev) => {
    const tooltipElement = document.createElement('div');
    tooltipElement.id = tooltip.TOOLTIP_ID;
    document.body.appendChild(tooltipElement);
});
document.addEventListener('mouseenter', (event) => {
    document.addEventListener('mousemove', engine.mousemoveFunction);
});
document.addEventListener('mouseleave', (event) => {
    document.removeEventListener('mousemove', engine.mousemoveFunction);
});
engine.observe();
