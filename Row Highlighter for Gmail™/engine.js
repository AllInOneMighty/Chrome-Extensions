var html = document.getElementsByTagName("html");

if (html != null && html.length >= 1) {
  // Retrieve user settings and apply styles
  chrome.extension.sendMessage({}, function(response) {
    var storage = JSON.parse(response);

    // Create styles
    var script = document.createElement("style");

    // Gmail
    script.innerText += "table.zt tr.yO:hover {background-color: #" + storage["email-unread-color"] + " !important;} ";
    script.innerText += "table.zt tr.zE:hover {background-color: #" + storage["email-read-color"] + " !important;} ";

    // Inbox
    script.innerText += "div.top-level-item div.b9:hover {background-color: #" + storage["inbox-email-color"] + " !important;} ";
    script.innerText += "div.top-level-item div.aT:hover {background-color: #" + storage["inbox-bundle-color"] + " !important;} ";

    // Contacts
    script.innerText += "div.XXcuqd div.zYQnTe:hover {background-color: #" + storage["contacts-hover-color"] + " !important;} ";

    // Add styles to head of main frame
    var head = html[0].getElementsByTagName("head");
    if (head != null && head.length >= 1) {
      head[0].appendChild(script);
    }
  });
}
