"use strict";
var engine;
(function (engine) {
    const linkIcon = new link_icon.LinkIcon();
    var observer = new MutationObserver(function (mutations, observer) {
        mutations.forEach(function (mutation) {
            if (!(mutation.target instanceof Element)) {
                return;
            }
            const target = mutation.target;
            if (target.tagName == 'A') {
            }
        });
    });
    var userSettings;
    function loadUserSettings(value) {
        if (typeof (value) === 'object') {
            userSettings = value;
        }
        else {
            userSettings = {};
        }
        observer.observe(document, { attributes: true, childList: false, subtree: true });
    }
    engine.loadUserSettings = loadUserSettings;
    function getTooltipContents(link) {
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
            var icon = iconsByPriority[index];
            if (icon.isEnabled(userSettings) &&
                icon.matches(document.location, link, linkExtension)) {
                icon.addAndMaybeDeactivate(iconsToShow);
            }
        }
        var html = '';
        if (iconsToShow.size != 0) {
            for (var index in iconsByPriority) {
                var icon = iconsByPriority[index];
                if (iconsToShow.has(icon.id)) {
                    var span = document.createElement('span');
                    span.style.background =
                        'url("data:image/png;base64,' + icon.imageBase64 + '")';
                    span.style.display = 'inline-block';
                    span.style.height = '16px';
                    span.style.width = '16px';
                    html += span.outerHTML;
                }
            }
        }
        return html;
    }
    function findLink(target) {
        if (target == null || !(target instanceof HTMLElement)) {
            return undefined;
        }
        if (target instanceof HTMLLinkElement) {
            return target;
        }
        return findLink(target.parentNode);
    }
    var last_valid_target = undefined;
    engine.mousemoveFunction = (event) => {
        var targetLink = findLink(event.target);
        if (targetLink == null) {
            return;
        }
        var html = getTooltipContents(targetLink);
        if (html != '') {
            var offsetY = 0;
            var imgs = targetLink.getElementsByTagName('img');
            if (imgs.length > 0) {
            }
            last_valid_target = targetLink;
        }
        else {
        }
    };
})(engine || (engine = {}));
document.addEventListener('mouseenter', (event) => {
    document.addEventListener('mousemove', engine.mousemoveFunction);
});
document.addEventListener('mouseleave', (event) => {
    document.removeEventListener('mousemove', engine.mousemoveFunction);
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message == 'tabs.onActivated') {
    }
});
chrome.storage.sync.get().then(engine.loadUserSettings);
