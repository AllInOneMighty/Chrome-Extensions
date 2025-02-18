namespace engine {
  const linkIcon = new link_icon.LinkIcon();

  // User settings
  var userSettings: Record<string, any>;

  export function loadUserSettings(value: {[key: string]: any;}) {
    if (typeof (value) === 'object') {
      userSettings = value;
    } else {
      userSettings = {};
    }
  }

  export function observe() {
    // Listen to link element changes and remove tooltips if it happens
    const observer = new MutationObserver(function(mutations, observer) {
      mutations.forEach(function(mutation) {
        if (!(mutation.target instanceof Element)) {
          return;
        }
        const target = mutation.target as Element;
        // Only look at links
        if (target.tagName == 'A') {
          // If a link attribute has changed, remove opentip to generate a new
          // one if (target.opentip != null) {
          //   target.opentip = null;
          // }
        }
      });
    });
    observer.observe(
        document, {attributes: true, childList: false, subtree: true});
  }

  // Retrieves the HTML content of a link, based on the link DOM element
  function getTooltipContents(link: HTMLLinkElement) {
    const iconsToShow = new Set<link_icon.IconId>();

    // Compute link extension here to do it only once per link
    // and not once per icon and per link
    const url = new URL(link.href);
    var linkExtension = '';
    if (url.protocol == link_icon.Protocol.HTTP ||
        url.protocol == link_icon.Protocol.HTTPS ||
        url.protocol == link_icon.Protocol.FTP ||
        url.protocol == link_icon.Protocol.FILE) {
      linkExtension = url.pathname.substring(url.pathname.lastIndexOf('.'));
    }

    // Determinate all icons to display
    var iconsByPriority = linkIcon.iconsByPriority;

    for (var index in iconsByPriority) {
      var icon = iconsByPriority[index];
      if (icon.isEnabled(userSettings) &&
          icon.matches(document.location, link, linkExtension)) {
        icon.addAndMaybeDeactivate(iconsToShow);
      }
    }

    // Compute HTML to insert in tooltip
    var html = '';

    if (iconsToShow.size != 0) {
      // At least one icon to display
      // Iterate over ordered list of icon and for each
      // one we can find into the LinkIcons object, add
      // it to the resulting HTML
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

  // Recursively matches the first link with the given element or one of its
  // parents.
  function findLink(target: EventTarget|Node|null): HTMLLinkElement|undefined {
    if (target == null || !(target instanceof HTMLElement)) {
      return undefined;
    }
    if (target instanceof HTMLLinkElement) {
      return target;
    }
    return findLink(target.parentNode);
  }

  // Adds a custom style, also using classes
  // defined in opentip/opentip-custom.css
  // Opentip.styles.simpleDark = {
  //   extends: 'dark',
  //   background: [
  //     [0.0, 'rgba(25, 25, 25, 0.8)'], [0.5, 'rgba(25, 25, 25, 0.85)'],
  //     [0.5, 'rgba(10, 10, 10, 0.85)'], [1.0, 'rgba(10, 10, 10, 0.9)']
  //   ],
  //   borderColor: '#000',
  //   borderRadius: 3,
  //   borderWidth: 2,
  //   className: 'simple-dark',
  //   delay: 0,
  //   group: 'link_icon',
  //   hideEffectDuration: 0.075,
  //   shadowBlur: 3,
  //   showEffectDuration: 0.075,
  //   stem: true,
  //   tipJoint: 'right'
  // };

  // Configures the default style of all tooltips
  // Opentip.defaultStyle = 'simpleDark';

  // Last target where a tooltip was shown
  var last_valid_target: HTMLLinkElement|undefined = undefined;

  // Will be launched each time the mouse is moved
  export var mousemoveFunction = (event: MouseEvent) => {
    var targetLink = findLink(event.target);
    if (targetLink == null) {
      return;
    }

    // if (targetLink.opentip != null) {
    //   last_valid_target = targetLink;
    //   // Tooltip will already be handled by the link
    //   return;
    // }

    // Generate the html and attach the tooltip to the link

    var html = getTooltipContents(targetLink);
    if (html != '') {
      var offsetY = 0;
      // Fix links being smaller than images they include
      var imgs = targetLink.getElementsByTagName('img');
      if (imgs.length > 0) {
        // // Top of link - top of the img
        // var positionDiff =
        //     $(targetLink).position().top - $(imgs[0]).position().top;
        // // If position difference is more than 5 px, we consider the link
        // // not at the same place
        // if (positionDiff > 5) {
        //   offsetY = positionDiff / 2;
        // }
      }

      // targetLink.opentip = new Opentip($(targetLink), {
      //   offset: [0, -offsetY],
      //   target: targetLink,
      // });
      // targetLink.opentip.setContent(html);
      // targetLink.opentip.show();

      // Save last valid target
      last_valid_target = targetLink;
    } else {
      // No tooltip for this link
      // targetLink.opentip = -1;
    }
  };

}  // namespace engine

// Retrieve user settings, start observing, react to mouse movements and tab
// changes.
chrome.storage.sync.get().then((value) => {
  engine.loadUserSettings(value);
  engine.observe();

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // If another tab is activated, hide the tooltip
    if (message == 'tabs.onActivated') {
      // if (last_valid_target != null && last_valid_target.opentip != null &&
      //     last_valid_target.opentip != -1) {
      //   last_valid_target.opentip.hide();
      // }
    }
  });

  // Only listen to mousemove if mouse if over the document
  document.addEventListener(
      'mouseenter',
      (event) => {
          document.addEventListener('mousemove', engine.mousemoveFunction)});

  // Unbind mousemove if mouse has left the document
  document.addEventListener('mouseleave', (event) => {
    document.removeEventListener('mousemove', engine.mousemoveFunction);
  });
});
