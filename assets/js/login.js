$(document).ready(function () {
  $("#inlineFormCheck").click(function () {
    if ($(this).prop("checked")) {
      $("#pass").attr("type", "text");
    } else {
      $("#pass").attr("type", "password");
    }
  });
});


