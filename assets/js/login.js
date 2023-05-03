$(".toggle-password").click(function () {
  $(this).toggleClass("fa-eye fa-eye-slash");
  var input = $($(this).attr("toggle"));
  if (input.attr("type") == "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
});

function validateUser(event) {
  var Username = document.getElementById("Username").value;
  var password = document.getElementById("password").value;
  var errorElement = document.getElementById("error");

  if (Username == "" || password == "") {
    errorElement.innerHTML = "Fields can't be empty";
    event.preventDefault();
    return;
  }

  if (Username != "admin" || password != "admin@123") {
    errorElement.innerHTML = "User name or password is incorrect";
    event.preventDefault();
    return;
    }

}
