"use strict";
var engine;
(function (engine) {
    const linkIcon = new link_icon.LinkIcon();
    let userSettings;
    let clientX = 0;
    let clientY = 0;
    let timeoutId;
    function findAnchor(target) {
        if (target == null || !(target instanceof Node)) {
            return undefined;
        }
        if (target instanceof HTMLAnchorElement) {
            return target;
        }
        return findAnchor(target.parentNode);
    }
    function anchorFromPoint() {
        return findAnchor(document.elementFromPoint(clientX, clientY));
    }
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
                const anchorElement = anchorFromPoint();
                if (anchorElement == null) {
                    tooltip.hideTooltip();
                    return;
                }
                if (mutation.type == 'attributes' &&
                    !mutation.attributeName?.startsWith('data-')) {
                    tooltip.showTooltip(anchorElement, maybeFillTooltipContents);
                }
            });
        });
        observer.observe(document, { attributes: true, childList: false, subtree: true });
    }
    engine.observe = observe;
    function maybeFillTooltipContents(anchor, tooltipElement) {
        const iconsToShow = new Set();
        let url = undefined;
        let urlLastExtension = '';
        if (anchor.href) {
            url = new URL(anchor.href);
            if (url.protocol == "http:" ||
                url.protocol == "https:" ||
                url.protocol == "ftp:" ||
                url.protocol == "file:") {
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
    function maybeAddTooltipEventListeners(anchorElement) {
        if (!(tooltip.TOOLTIP_ID in anchorElement.dataset)) {
            anchorElement.dataset[tooltip.TOOLTIP_ID] = '1';
            tooltip.addTooltipEventListeners(anchorElement, (anchorElement, tooltipElement) => {
                return maybeFillTooltipContents(anchorElement, tooltipElement);
            });
            return true;
        }
        return false;
    }
    engine.mousemoveEventListener = (ev) => {
        clientX = ev.clientX;
        clientY = ev.clientY;
        const anchorElement = anchorFromPoint();
        if (anchorElement == null) {
            return;
        }
        if (maybeAddTooltipEventListeners(anchorElement)) {
            tooltip.showTooltip(anchorElement, maybeFillTooltipContents);
        }
    };
    engine.scrollEventListener = (_ev) => {
        tooltip.hideTooltip();
    };
    engine.scrollendEventListener = (_ev) => {
        const anchorElement = anchorFromPoint();
        if (anchorElement == null) {
            return;
        }
        maybeAddTooltipEventListeners(anchorElement);
        tooltip.showTooltip(anchorElement, maybeFillTooltipContents);
    };
    engine.wheelEventListener = (_ev) => {
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
            tooltip.showTooltip(anchorElement, maybeFillTooltipContents);
            timeoutId = undefined;
        }, 200);
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
    document.addEventListener('mousemove', engine.mousemoveEventListener);
    document.addEventListener('scroll', engine.scrollEventListener);
    document.addEventListener('scrollend', engine.scrollendEventListener);
    document.addEventListener('wheel', engine.wheelEventListener);
});
document.addEventListener('mouseleave', (event) => {
    document.removeEventListener('mousemove', engine.mousemoveEventListener);
    document.removeEventListener('scroll', engine.scrollEventListener);
    document.removeEventListener('scrollend', engine.scrollendEventListener);
    document.removeEventListener('wheel', engine.wheelEventListener);
});
engine.observe();
