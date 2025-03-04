"use strict";
var options;
(function (options) {
    let userSettings;
    function loadUserSettings(value) {
        if (typeof (value) === 'object') {
            userSettings = value;
        }
        else {
            userSettings = {};
        }
    }
    options.loadUserSettings = loadUserSettings;
    function refreshOptionsState() {
        for (const colorId in common.DEFAULT_COLORS) {
            document.getElementById(colorId).value =
                userSettings[colorId] ||
                    common.DEFAULT_COLORS[colorId];
        }
    }
    options.refreshOptionsState = refreshOptionsState;
    options.setColor = (ev) => {
        const target = ev.target;
        for (const colorId in common.DEFAULT_COLORS) {
            if (target.id.startsWith(colorId)) {
                userSettings[colorId] =
                    document.getElementById(colorId).value;
                chrome.storage.sync.set(userSettings);
                break;
            }
        }
    };
    options.resetColor = (ev) => {
        const target = ev.target;
        for (const colorId in common.DEFAULT_COLORS) {
            if (target.id.startsWith(colorId)) {
                document.getElementById(colorId).value =
                    common.DEFAULT_COLORS[colorId];
                options.setColor(ev);
                break;
            }
        }
    };
    options.closeEventListener = (_ev) => {
        window.close();
    };
})(options || (options = {}));
document.addEventListener('DOMContentLoaded', (ev) => {
    document.querySelector('#bu-close')
        ?.addEventListener('click', options.closeEventListener);
    chrome.storage.sync.get().then((value) => {
        options.loadUserSettings(value);
        options.refreshOptionsState();
        for (const colorId in common.DEFAULT_COLORS) {
            document.getElementById(colorId)?.addEventListener('input', options.setColor, false);
            document.getElementById(colorId + '-reset')
                ?.addEventListener('click', options.resetColor);
        }
    });
});
