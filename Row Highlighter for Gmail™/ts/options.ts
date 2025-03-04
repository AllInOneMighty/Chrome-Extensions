namespace options {
  // User settings
  let userSettings: Record<string, any>;

  export function loadUserSettings(value: {[key: string]: any;}) {
    if (typeof (value) === 'object') {
      userSettings = value;
    } else {
      userSettings = {};
    }
  }

  export function refreshOptionsState() {
    for (const colorId in common.DEFAULT_COLORS) {
      (document.getElementById(colorId)! as HTMLInputElement).value =
          userSettings[colorId] ||
          common.DEFAULT_COLORS[colorId as common.ColorId];
    }
  }

  export const setColor = (ev: Event) => {
    const target = ev.target as HTMLElement;

    for (const colorId in common.DEFAULT_COLORS) {
      if (target.id.startsWith(colorId)) {
        userSettings[colorId] =
            (document.getElementById(colorId) as HTMLInputElement).value;
        chrome.storage.sync.set(userSettings);
        break;
      }
    }
  };

  export const resetColor = (ev: Event) => {
    const target = ev.target as HTMLElement;
    for (const colorId in common.DEFAULT_COLORS) {
      if (target.id.startsWith(colorId)) {
        (document.getElementById(colorId) as HTMLInputElement).value =
            common.DEFAULT_COLORS[colorId as common.ColorId];
        setColor(ev);
        break;
      }
    }
  };

  export const closeEventListener = (_ev: Event) => {
    window.close();
  };

}  // namespace options

document.addEventListener('DOMContentLoaded', (ev: Event) => {
  document.querySelector('#bu-close')
      ?.addEventListener('click', options.closeEventListener);

  chrome.storage.sync.get().then((value) => {
    options.loadUserSettings(value);
    options.refreshOptionsState();

    for (const colorId in common.DEFAULT_COLORS) {
      document.getElementById(colorId)?.addEventListener(
          'input', options.setColor, false);
      document.getElementById(colorId + '-reset')
          ?.addEventListener('click', options.resetColor);
    }
  });
});