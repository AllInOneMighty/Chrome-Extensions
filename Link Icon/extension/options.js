"use strict";
var options;
(function (options) {
    const linkIcon = new link_icon.LinkIcon();
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
    function saveOption(ev) {
        const checkboxInput = ev.target;
        userSettings[checkboxInput.id] = checkboxInput.checked;
        chrome.storage.sync.set(userSettings);
    }
    function buildOptionsDom() {
        const ul = document.getElementById('ul-icons');
        for (const icon of linkIcon.iconsBySettingsOrder) {
            const li = document.createElement('li');
            const checkboxInput = document.createElement('input');
            checkboxInput.type = 'checkbox';
            checkboxInput.id = 'icon-' + icon.id;
            checkboxInput.addEventListener('click', saveOption);
            li.appendChild(checkboxInput);
            const label = document.createElement('label');
            label.setAttribute('for', 'icon-' + icon.id);
            const imageSpan = document.createElement('span');
            imageSpan.style.background =
                'url("data:image/png;base64,' + icon.imageBase64 + '")';
            imageSpan.style.display = 'inline-block';
            imageSpan.style.height = '16px';
            imageSpan.style.width = '16px';
            label.appendChild(imageSpan);
            const descriptionSpan = document.createElement('span');
            const titleSpan = document.createElement('span');
            titleSpan.style.cssText = 'font-weight:bold;';
            titleSpan.textContent = ' ' + icon.name + ': ';
            descriptionSpan.textContent = icon.description;
            descriptionSpan.insertBefore(titleSpan, descriptionSpan.firstChild);
            label.appendChild(descriptionSpan);
            li.appendChild(label);
            ul.appendChild(li);
        }
    }
    options.buildOptionsDom = buildOptionsDom;
    function refreshOptionsState() {
        for (const icon of linkIcon.iconsBySettingsOrder) {
            const checkboxInput = document.querySelector('#icon-' + icon.id);
            const enabled = userSettings['icons.' + icon.id + '.enabled'] === undefined ||
                userSettings['icons.' + icon.id + '.enabled'];
            checkboxInput.checked = enabled;
        }
    }
    options.refreshOptionsState = refreshOptionsState;
    options.closeEventListener = (_ev) => {
        window.close();
    };
})(options || (options = {}));
document.addEventListener('DOMContentLoaded', (ev) => {
    document.querySelector('#close-button').addEventListener('click', options.closeEventListener);
    options.buildOptionsDom();
    chrome.storage.sync.get().then((value) => {
        options.loadUserSettings(value);
        options.refreshOptionsState();
    });
});
