// User settings
var userSettings;

// Retrieve user settings ASAP
chrome.extension.sendMessage('getUserSettings', function(response) {
  userSettings = JSON.parse(response);
});

// Retrieves the HTML content of a link, based on the link DOM element
function getTooltipContents(link) {
  // To calculate type of link
  var linkIcons = new LinkIcons();

  // Getting required information to call Icon.matches()
  var location = document.location;
  // Compute link extension here to do it only once per link
  // and not once per icon and per link
  var linkExtension = '';
  if (link.protocol == 'http:' || link.protocol == 'https:' ||
      link.protocol == 'ftp:' || link.protocol == 'file:') {
    linkExtension = link.pathname.substring(link.pathname.lastIndexOf('.'));
  }

  // Determinate all icons to display
  var iconsByPriority = LinkIcon.getIconsByPriority();

  for (var index in iconsByPriority) {
    var icon = iconsByPriority[index];
    if (icon.isEnabled(userSettings) && icon.matches(location, link, linkExtension)) {
      icon.updateLinkIcons(linkIcons);
    }
  }

  // Compute HTML to insert in tooltip
  var html = '';

  if (!linkIcons.isEmpty()) {
    // At least one icon to display
    // Iterate over ordered list of icon and for each
    // one we can find into the LinkIcons object, add
    // it to the resulting HTML
    for (var index in iconsByPriority) {
      var icon = iconsByPriority[index];
      
      if (linkIcons.hasIcon(icon.id)) {
        var span = document.createElement('span');
        span.style.background = 'url("data:image/png;base64,' + icon.image.base64 + '")';
        span.style.display = 'inline-block';
        span.style.height = icon.image.height + 'px';
        span.style.width = icon.image.width + 'px';

        html += span.outerHTML;
      }
    }
  }
  
  return html;
}

// Recursively matches the first link with the
// given element or one of its parents
function findLink(element) {
  if (element == null) {
    return null;
  }
  if (element.tagName == 'A') {
    return element;
  }
  return findLink(element.parentNode);
}

// Adds a custom style, also using classes
// defined in opentip/opentip-custom.css
Opentip.styles.simpleDark = {
  extends: 'dark',
  background: [
    [0.0, 'rgba(25, 25, 25, 0.8)'],
    [0.5, 'rgba(25, 25, 25, 0.85)'],
    [0.5, 'rgba(10, 10, 10, 0.85)'],
    [1.0, 'rgba(10, 10, 10, 0.9)']
  ],
  borderColor: '#000',
  borderRadius: 3,
  borderWidth: 2,
  className: 'simple-dark',
  delay: 0,
  group: 'link_icon',
  hideEffectDuration: 0.075,
  shadowBlur: 3,
  showEffectDuration: 0.075,
  stem: true,
  tipJoint: 'right'
};

// Configures the default style of all tooltips
Opentip.defaultStyle = 'simpleDark';

// Last target where a tooltip was shown
var last_valid_target = null;

// Will be launched each time the mouse is moved
var mousemoveFunction = function(event) {
  var targetLink = findLink(event.target);
  if (targetLink == null) {
    return;
  }

  if (targetLink.opentip != null) {
    last_valid_target = targetLink;
    // Tooltip will already be handled by the link
    return;
  }

  // Generate the html and attach the tooltip to the link

  var html = getTooltipContents(targetLink);
  if (html != '') {
    var offsetY = 0;
    // Fix links being smaller than images they include
    var imgs = targetLink.getElementsByTagName('img');
    if (imgs.length > 0) {
      // Top of link - top of the img
      var positionDiff = $(targetLink).position().top - $(imgs[0]).position().top;
      // If position difference is more than 5 px, we consider the link
      // not at the same place
      if (positionDiff > 5) {
        offsetY = positionDiff / 2;
      }
    }

    targetLink.opentip = new Opentip($(targetLink), {
      offset: [0, -offsetY],
      target: targetLink,
    });
    targetLink.opentip.setContent(html);
    targetLink.opentip.show();

    // Save last valid target
    last_valid_target = targetLink;
  } else {
    // No tooltip for this link
    targetLink.opentip = -1;
  }
};

// Only listen to mousemove if mouse if over the document
$(document).mouseenter(function(event) {
  $(document).mousemove(mousemoveFunction);
});
// Unbind mousemove if mouse has left the document
$(document).mouseleave(function(event) {
  $(document).unbind('mousemove', mousemoveFunction);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // If another tab is activated, hide the tooltip
  if (request == 'tabs.onActivated') {
    if (last_valid_target != null
        && last_valid_target.opentip != null
        && last_valid_target.opentip != -1) {
      last_valid_target.opentip.hide();
    }
  }
});

// Listen to link element changes and remove tooltips if it happens
var observer = new MutationObserver(function(mutations, observer) {
  mutations.forEach(function(mutation) {
    // Only look at links
    if (mutation.target.tagName == 'A') {
      // If a link attribute has changed, remove opentip to generate a new one
      if (mutation.target.opentip != null) {
        mutation.target.opentip = null;
      }
    }
  });
});
observer.observe(document, {
  attributes: true,
  childList: false,
  subtree: true
});
