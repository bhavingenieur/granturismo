$(document).ready(function() {
      $("form[name='registero']").validate({
      rules: {
      username: "required",
      password: {
        required: true,
        minlength: 5
      },
      password2: {
        equalTo:'#password'
      }
      },
      messages: {
      username: "Please enter a username",
      password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 5 characters long"
      },
        password2: {
        required: "Passwords should match"
      }
      },
      submitHandler: function(form) {
      form.submit();
      }});});