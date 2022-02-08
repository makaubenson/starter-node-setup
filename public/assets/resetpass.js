let setNewPasswordForm = document.getElementById("setNewPasswordForm");

if (setNewPasswordForm) {
  let newPasswordProcess = async function (e) {
    e.preventDefault();
    document.getElementById("resetConfirmBtn").innerHTML = "Processing";
    let password = document.getElementById("resetNewPass").value;
    let token = window.location.href.split("resetpassword/")[1].split(".")[0];

    let passwordConfirm = document.getElementById("resetConfirmPass").value;

    try {
      let res = await axios({
        method: "post",
        url: `/api/v1/users/resetpassword/${token}`,
        data: { token, password, passwordConfirm },
      });
      if (res.data.function == "success") {
        document.getElementById("resetConfirmBtn").innerHTML = "Reset Password";
        alert("Your Password was Reset");
        location.assign("/");
      } else {
        document.getElementById("resetConfirmBtn").innerHTML = "Reset Password";
        alert("Password reset unsuccessfull");
      }
    } catch (err) {
      document.getElementById("resetConfirmBtn").innerHTML = "Reset Password";
      console.log(err);
      alert("Password reset unsuccessfull");
    }
  };
  setNewPasswordForm.addEventListener("submit", newPasswordProcess);
}
