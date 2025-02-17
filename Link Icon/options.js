// User settings
var userSettings;

function buildOptions() {
  var iconsBySettingsOrder = LinkIcon.getIconsBySettingsOrder();

  var ul = document.getElementById('ul_icons');
  for (var index in iconsBySettingsOrder) {
    var icon = iconsBySettingsOrder[index];

    var li = document.createElement('li');

    var input = document.createElement('input');
    input.type = 'checkbox';
    input.id = 'icon_' + icon.id;
    li.appendChild(input);

    var label = document.createElement('label');
    label.setAttribute('for', 'icon_' + icon.id);

    var ispan = document.createElement('span');
    ispan.style.background =
        'url("data:image/png;base64,' + icon.image.base64 + '")';
    ispan.style.display = 'inline-block';
    ispan.style.height = icon.image.height;
    ispan.style.width = icon.image.width;
    label.appendChild(ispan);

    var span = document.createElement('span');
    var bspan = document.createElement('span');
    bspan.style.cssText = 'font-weight:bold;';
    bspan.textContent = ' ' + icon.name + ': ';

    span.textContent = icon.description;
    span.insertBefore(bspan, span.firstChild);
    label.appendChild(span);

    li.appendChild(label);
    ul.appendChild(li);
  }
}

function refreshOptions() {
  var iconsBySettingsOrder = LinkIcon.getIconsBySettingsOrder();

  for (var index in iconsBySettingsOrder) {
    var icon = iconsBySettingsOrder[index];
    if (typeof (userSettings['icons.' + icon.id + '.enabled']) ===
        'undefined') {
      console.log('reset');
      userSettings['icons.' + icon.id + '.enabled'] = true;
    }

    if (userSettings['icons.' + icon.id + '.enabled']) {
      document.getElementById('icon_' + icon.id).checked = true;
    } else {
      document.getElementById('icon_' + icon.id).checked = false;
    }
  }
}

// Retrieve user settings and start observing.
chrome.storage.sync.get().then((value) => {
  if (typeof (value) === 'object') {
    userSettings = value;
  } else {
    userSettings = {};
  }

  $(document).ready(function() {
    $('#bu_save_options').click(function() {
      var iconsBySettingsOrder = LinkIcon.getIconsBySettingsOrder();
      for (var index in iconsBySettingsOrder) {
        var icon = iconsBySettingsOrder[index];
        userSettings['icons.' + icon.id + '.enabled'] =
            document.getElementById('icon_' + icon.id).checked ? true : false;
      }
      chrome.storage.sync.set(userSettings);
      $('#confirm').fadeIn('fast');
      $('#confirm').fadeOut(2000);
    });
    $('#bu_refresh_options').click(function() {
      refreshOptions();
    });
    $('#bu_close').click(function() {
      window.close();
    });

    buildOptions();
    refreshOptions();
  });
});