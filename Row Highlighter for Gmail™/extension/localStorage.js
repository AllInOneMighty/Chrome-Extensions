// Requires jQuery to operate

var default_colors = {
  "email-unread-color": "FFEB86",
  "email-read-color": "CDF39F",
  "inbox-email-color": "F9FFEE",
  "inbox-bundle-color": "FFF5DD",
  "contacts-hover-color": "FFF2B2"
};

$.each(default_colors, function(index, value) {
  if (localStorage[index] == null) {
    localStorage[index] = value;
  }
});
