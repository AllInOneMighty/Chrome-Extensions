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
      checkboxInput.id = link_icon.ICON_ID_PREFIX + icon.id;
      checkboxInput.addEventListener('click', saveOption)
      li.appendChild(checkboxInput);

      const label = document.createElement('label');
      label.setAttribute('for', link_icon.ICON_ID_PREFIX + icon.id);

      const imageSpan = document.createElement('span');
      imageSpan.style.background =
          'url("data:image/png;base64,' + icon.imageBase64 + '")';
      imageSpan.style.display = 'inline-block';
      imageSpan.style.height = '16px';
      imageSpan.style.width = '16px';
      label.appendChild(imageSpan);

      const infoDiv = document.createElement('div');

      const titleSpan = document.createElement('span');
      titleSpan.classList.add('title');
      titleSpan.textContent = icon.name;

      const descriptionSpan = document.createElement('span');
      descriptionSpan.classList.add('description');
      descriptionSpan.textContent = icon.description;

      infoDiv.appendChild(titleSpan);
      infoDiv.appendChild(descriptionSpan);

      label.appendChild(infoDiv);

      li.appendChild(label);
      ul.appendChild(li);
    }
  }

  export function refreshOptionsState() {
    for (const icon of linkIcon.iconsBySettingsOrder) {
      const checkboxInput =
          document.querySelector('#' + link_icon.ICON_ID_PREFIX + icon.id)! as
          HTMLInputElement;
      const value = userSettings[link_icon.ICON_ID_PREFIX + icon.id];
      const enabled = value === undefined || value;
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
