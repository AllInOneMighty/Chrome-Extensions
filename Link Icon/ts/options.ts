namespace options {
  const linkIcon = new link_icon.LinkIcon();

  // User settings
  let userSettings: Record<string, any>;

  export function loadUserSettings(value: {[key: string]: any;}) {
    if (typeof (value) === 'object') {
      userSettings = value;
    } else {
      userSettings = {};
    }
  }

  function saveOption(ev: MouseEvent) {
    const checkboxInput = ev.target! as HTMLInputElement;
    userSettings[checkboxInput.id] = checkboxInput.checked;
    chrome.storage.sync.set(userSettings);
  }

  export function buildOptionsDom() {
    const ul = document.getElementById('ul-icons')!;
    for (const icon of linkIcon.iconsBySettingsOrder) {
      const li = document.createElement('li');

      const checkboxInput = document.createElement('input');
      checkboxInput.type = 'checkbox';
      checkboxInput.id = 'icon-' + icon.id;
      checkboxInput.addEventListener('click', saveOption)
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

  export function refreshOptionsState() {
    for (const icon of linkIcon.iconsBySettingsOrder) {
      const checkboxInput =
          document.querySelector('#icon-' + icon.id)! as HTMLInputElement;
      const enabled =
          userSettings['icons.' + icon.id + '.enabled'] === undefined ||
          userSettings['icons.' + icon.id + '.enabled'];
      checkboxInput.checked = enabled;
    }
  }

  export const closeEventListener = (_ev: Event) => {
    window.close();
  };
}  // namespace options

document.addEventListener('DOMContentLoaded', (ev: Event) => {
  document.querySelector('#close-button')!.addEventListener(
      'click', options.closeEventListener);

  options.buildOptionsDom();
  chrome.storage.sync.get().then((value) => {
    options.loadUserSettings(value);
    options.refreshOptionsState();
  });
});
