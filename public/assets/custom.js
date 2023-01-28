//controll btns
let to_register_btn = document.getElementById("to-register");
let to_login_form_btn = document.getElementById("to-login-form");
let logout_btn = document.querySelectorAll(".logout_btn");
let application_form_btn = document.getElementById("application_form_btn");
let hide_password_icon = document.getElementById("hide_password_icon");
let resendCodebtn = document.getElementById("resendCodebtn");

//containers
let register_form_container = document.querySelector(
  ".register_form_container"
);
let login_form_container = document.querySelector(".login_form_container");
//forms
let login_form = document.querySelector(".login-form");
let reset_pass_form = document.querySelector(".reset_pass_form");
let register_form = document.querySelector(".register_form");
let home_profile_form = document.querySelector(".home_profile_form");
let verify_code_form = document.querySelector(".verify-code-form");

let userRegistrationEmail = document.getElementById("RegistrationEmail");

if (userRegistrationEmail) {
  userRegistrationEmail.addEventListener("change", function (e) {
    let text = `A Verification Email Will Be Sent To ${userRegistrationEmail.value}.`;
    document.getElementById("email-text").innerHTML = text;
  });
}

//btns
if (to_register_btn) {
  to_register_btn.addEventListener("click", function (e) {
    e.preventDefault();
    register_form_container.classList.remove("hidden-away");
    login_form_container.classList.add("hidden-away");
  });
}
if (to_login_form_btn) {
  to_login_form_btn.addEventListener("click", function (e) {
    e.preventDefault();
    register_form_container.classList.add("hidden-away");
    login_form_container.classList.remove("hidden-away");
  });
}

if (logout_btn[0] && logout_btn[1]) {
  logout_btn[0].addEventListener("click", function (e) {
    e.preventDefault();

    location.assign("/login.html");
    // location.assign("https://expo.techkey.co.ke/JKUSA/login.html");
    //  location.assign(" /login.html");
  });
  logout_btn[1].addEventListener("click", function (e) {
    e.preventDefault();
    location.assign("/login.html");
    //location.assign(" /login.html");
  });
}

if (application_form_btn) {
  application_form_btn.addEventListener("click", function (e) {
    e.preventDefault();
    alert("DEMO Data will be saved");
  });
}

if (hide_password_icon) {
  hide_password_icon.addEventListener("click", function (e) {
    e.preventDefault();
    let passwordField = document.getElementById("loginPassword");
    let attribute = passwordField.getAttribute("type");
    if (attribute == "password") {
      passwordField.setAttribute("type", "text");
    } else {
      passwordField.setAttribute("type", "password");
    }
  });
}

//forms
if (register_form) {
  /*

        "password": "alex1500",
        "passwordConfirm":"alex1500",
        "yearOfStudy":"4"
         */
  let registerProcess = async function (e) {
    e.preventDefault();
    let register_btn_main = document.getElementById("register_btn_main");
    register_btn_main.innerHTML = "Working ...";
    let name = document.getElementById("fullname").value;
    let email = document.getElementById("RegistrationEmail").value;
    let phone = document.getElementById("regphone").value;
    let reg_no = document.getElementById("regNo").value;
    let id_no = document.getElementById("id_no").value;
    let password = document.getElementById("regpassword").value;
    let passwordConfirm = document.getElementById("regpasswordConfirm").value;
    let yearOfStudy = document.getElementById("schoolYear").value;

    try {
      let res = await axios({
        method: "post",
        url: "/api/v1/users/",
        data: {
          name,
          email,
          phone,
          reg_no,
          id_no,
          password,
          passwordConfirm,
          yearOfStudy,
        },
      });
      if (res.data.status == "success") {
        showAlert("success", "Registered Successfully");

        let url = `/verify/${res.data.id}`;

        location.assign(url);
        register_btn_main.innerHTML = "Register";
      } else {
        showAlert("error", "Unable to create user, check your details");
      }
    } catch (err) {
      register_btn_main.innerHTML = "Register";
      if (err.response?.data?.message) {
        showAlert("error", err.response.data.message);
      } else {
        showAlert("error", "Unable to create user, check your details");
      }
    }
  };

  register_form.addEventListener("submit", registerProcess);
}
if (login_form) {
  let loginProcess = async function (e) {
    e.preventDefault();
    let login_btn_main = document.getElementById("login_btn_main");
    login_btn_main.value = "Logging in...";

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    try {
      let res = await axios({
        method: "post",
        url: "/api/v1/users/login",
        data: { email, password },
      });
      if (res.data.status == "success") {
        showAlert("success", "login Successfull");

        location.assign("/");
      } else if (res.data.status == "verify") {
        let url = `/verify/${res.data.id}`;
        location.assign(url);
      }
      login_btn_main.value = "Login";
    } catch (err) {
      login_btn_main.value = "Login";
      if (err.response?.data?.message) {
        showAlert("error", err.response.data.message);
      } else {
        console.log("err", err);
        // console.log("err.response", err.response);
      }
    }
  };

  login_form.addEventListener("submit", loginProcess);
}
if (reset_pass_form) {
  let resetProces = async function (e) {
    e.preventDefault();
    let email = document.querySelector(".resetPasswordEmail").value;
    try {
      let res = await axios({
        method: "post",
        url: "/api/v1/users/forgotPassword",
        data: { email },
      });
      if (res.data.status == "success") {
        showAlert("success", "Reset link has been sent to your email");

        setTimeout(function () {
          location.reload();
        }, 5000);
      } else {
        showAlert("error", "Unable to send Email, make sure the email is registered");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        showAlert("error", err.response.data.message);
      } else {
        console.log("err", err);
        console.log("err.response", err.response);
      }
    }
  };

  reset_pass_form.addEventListener("submit", resetProces);
}
if (resendCodebtn) {
  let resendCodeProcess = async function (e) {
    e.preventDefault();
    let url = window.location.href.split("verify/")[1];
    try {
      let res = await axios({
        method: "post",
        url: "/api/v1/users/resendVerification",
        data: { url },
      });
      if (res.data.status == "success") {
        alert("Verification code has been resent");
      } else {
        alert("Cannot resend verification code at this time, try again later");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        showAlert("error", err.response.data.message);
      } else {
        console.log("err", err);
        console.log("err.response", err.response);
      }
    }
  };
  resendCodebtn.addEventListener("click", resendCodeProcess);
}
if (home_profile_form) {
  home_profile_form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("DEmo profile will be updated");
  });
}

if (verify_code_form) {
  let verifyProcess = async function (e) {
    e.preventDefault();
    let codeInput = document.querySelectorAll(".code-input");
    let email = document.getElementById("email_label").innerHTML;
    let hiddenEmail = document.getElementById("user-email").innerHTML;

    if (email == hiddenEmail) {
      let code = "";
      codeInput.forEach(function (element, indx) {
        code += element.value;
      });

      try {
        let res = await axios({
          method: "post",
          url: "/api/v1/users/verify",
          data: { email, code },
        });
        if (res.data.status == "success") {
          showAlert("success", "Verification Successfull");

          location.assign("/");
        } else {
          showAlert("error", "invalid code");
        }
      } catch (err) {
        if (err.response?.data?.message) {
          showAlert("error", err.response.data.message);
        } else {
          console.log("err", err);
          console.log("err.response", err.response);
        }
      }
    } else {
      showAlert("error", "Email manipulated");
    }
  };
  verify_code_form.addEventListener("submit", verifyProcess);
}

//type = success/ error
function showAlert(type, msg, time = 5) {
  let markup = `
  <div class="alerts alert--${type}">
  <svg style="margin-right: 9px;" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
</svg>
  ${msg}
  <div class="spinner-border text-light"></div>
  </div>
  `;
  document
    .querySelector(".err-display")
    .insertAdjacentHTML("afterbegin", markup);
  setTimeout(function () {
    hideAlert();
  }, time * 1000);
}
function hideAlert() {
  let block = document.querySelector(".err-display");
  if (block) {
    block.innerHTML = " ";
  }
}
