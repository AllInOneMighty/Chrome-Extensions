function resetAllColors() {
  $.each(default_colors, function(index, value) {
    setColor(index, value);
  });
}

function resetColor(index) {
  setColor(index, default_colors[index]);
}

function setColor(index, value) {
  $('#' + index)
      .val(value)
      .css("background-color", "#" + value);
}

$(document).ready(function() {
  // Reset all
  $('#reset-all').click(function() {
    resetAllColors();
  });

  // Set saved colors and reset links actions.
  $.each(default_colors, function(index, value) {
    setColor(index, localStorage[index]);
    $('#' + index + "-reset").click(function() {
      resetColor(index);
    });
  });

  // Save
  $('#bu-save-options').click(function() {
    $.each(default_colors, function(index, value) {
      localStorage[index] = $('#' + index)[0].value;
    });
    $('#confirm').fadeIn("fast");
    $('#confirm').fadeOut(2000);
  });
  
  // Close
  $('#bu-close').click(function() {
    window.close();
  });
});
