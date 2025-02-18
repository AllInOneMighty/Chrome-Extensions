"use strict";
var engine;
(function (engine) {
    const linkIcon = new link_icon.LinkIcon();
    var userSettings;
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
            mutations.forEach(function (mutation) {
                if (!(mutation.target instanceof Element)) {
                    return;
                }
                const target = mutation.target;
                if (target.tagName == 'A') {
                }
            });
        });
        observer.observe(document, { attributes: true, childList: false, subtree: true });
    }
    engine.observe = observe;
    function maybeFillTooltipContents(link, tooltipElement) {
        const iconsToShow = new Set();
        const url = new URL(link.href);
        var linkExtension = '';
        if (url.protocol == "http:" ||
            url.protocol == "https:" ||
            url.protocol == "ftp:" ||
            url.protocol == "file:") {
            linkExtension = url.pathname.substring(url.pathname.lastIndexOf('.'));
        }
        var iconsByPriority = linkIcon.iconsByPriority;
        for (var index in iconsByPriority) {
            const icon = iconsByPriority[index];
            if (icon.isEnabled(userSettings) &&
                icon.matches(document.location, link, linkExtension)) {
                icon.addAndMaybeDeactivate(iconsToShow);
            }
        }
        if (iconsToShow.size == 0) {
            return false;
        }
        if (iconsToShow.size != 0) {
            for (var index in iconsByPriority) {
                const icon = iconsByPriority[index];
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
        return true;
    }
    function findLink(target) {
        if (target == null || !(target instanceof Node)) {
            return undefined;
        }
        if (target instanceof HTMLAnchorElement) {
            return target;
        }
        return findLink(target.parentNode);
    }
    engine.mousemoveFunction = (event) => {
        const targetLink = findLink(event.target);
        if (targetLink == null) {
            return;
        }
        if (!(tooltip.TOOLTIP_ID in targetLink.dataset)) {
            targetLink.dataset[tooltip.TOOLTIP_ID] = '1';
            tooltip.addTooltipEventListeners(targetLink, (listenerElement, tooltipElement) => {
                return maybeFillTooltipContents(targetLink, tooltipElement);
            });
            tooltip.showTooltip(targetLink, maybeFillTooltipContents);
        }
    };
})(engine || (engine = {}));
document.addEventListener('DOMContentLoaded', (ev) => {
    const tooltipElement = document.createElement('div');
    tooltipElement.id = tooltip.TOOLTIP_ID;
    document.body.appendChild(tooltipElement);
});
chrome.storage.sync.get().then((value) => {
    engine.loadUserSettings(value);
    engine.observe();
    document.addEventListener('mouseenter', (event) => {
        document.addEventListener('mousemove', engine.mousemoveFunction);
    });
    document.addEventListener('mouseleave', (event) => {
        document.removeEventListener('mousemove', engine.mousemoveFunction);
    });
});
