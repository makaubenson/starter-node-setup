//btns
let logout_btn = document.querySelectorAll(".logout_btn");
let call_login_btn = document.getElementById("call_login_btn");
let profileUpdateBtn = document.getElementById("profileUpdateBtn");
let pagination_prev_btn = document.getElementById("pagination_prev_btn");
let pagination_next_btn = document.getElementById("pagination_next_btn");
let mpesa_pay_btn = document.getElementById("mpesa_pay_btn");
let stripe_pay_btn = document.getElementById("stripe_pay_btn");
let paypal_pay_btn = document.getElementById("paypal_pay_btn");
let refundBtn = document.getElementById("refundBtn");
let deleteHouseBtn = document.getElementById("deleteHouseBtn");
let mpesaCancel = document.getElementById("mpesaCancel");
let stripe;

//forms
let profilePhotoUploadForm = document.getElementById("profilePhotoUploadForm");
let profilePhotoUpload = document.getElementById("profilePhotoUpload");

let detailsLoginForm = document.getElementById("detailsLoginForm");
let mpesaNumberForm = document.getElementById("mpesaNumberForm");
let MaincontactForm = document.getElementById("MaincontactForm");
let profileUpdateForm = document.getElementById("profileUpdateForm");
let profileUpdatePasswordForm = document.getElementById(
  "profileUpdatePasswordForm"
);

if (logout_btn[0]) {
  let logOutProcess = async function (e) {
    e.preventDefault();
    try {
      let res = await axios({
        method: "get",
        url: "/logoutUser",
      });
      if (res.data.status == "success") {
        location.assign("/");
      }
    } catch (err) {
      alert("Logout unsuccesfull, try again later");
    }
  };

  logout_btn.forEach(function (element) {
    element.addEventListener("click", logOutProcess);
  });
}

if (call_login_btn) {
  call_login_btn.addEventListener("click", function (e) {
    e.preventDefault();

    detailsLoginForm.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
    showAlert("success", "Fill in your Credentials");
  });
}

//pagination
let initialPaginationNumber = 4;
let initialPage = 1;
let dataPresent = false;
let housesarray;
let pageDisplay;
let totalPages;
let resultCount;

let stopNextPropagation = false;

if (pagination_prev_btn) {
  let previousStage = async function (e) {
    e.preventDefault();

    pagination_prev_btn.innerHTML = "Processing";
    stopNextPropagation = false;
    if (!housesarray) {
      pagination_prev_btn.innerHTML = "Prev";
      return;
    }
    if (initialPage == 1) {
      pagination_prev_btn.innerHTML = "Prev";

      return;
    }

    let totalPages = Math.ceil(housesarray.length / 4 - 1);
    initialPage -= 1;

    pageDisplay = `${initialPage}/${totalPages}`;

    document.getElementById("page_number").innerHTML = pageDisplay;

    let lowerLimit = initialPaginationNumber - resultCount * 2;

    let currentFour = housesarray.filter(function (element, index) {
      if (index >= lowerLimit && index < lowerLimit + resultCount) {
        return true;
      }
    });

    //halt
    if (currentFour) {
      initialPaginationNumber -= resultCount;

      pagination_prev_btn.innerHTML = "Prev";
      let housesItems = document.querySelectorAll(".mainHouseItem");

      housesItems.forEach(function (element, index) {
        element.remove();
      });

      currentFour.forEach(function (element, index) {
        document
          .getElementById("mainHouseContainer")
          .insertAdjacentHTML("afterbegin", getItemMarkup(element));
      });
    }
  };

  pagination_prev_btn.addEventListener("click", previousStage);
}

if (refundBtn) {
  refundBtn.addEventListener("click", function (e) {
    e.preventDefault();
    alert("Refunding is currently not allowed");
  });
}

if (deleteHouseBtn) {
  let unbookprocess = async function () {
    if (
      window.confirm(
        "Are you sure you want to unbook this house?  No refund will be issued"
      )
    ) {
      let confirmation = prompt(
        "To unbook and delete this house, please write  UNBOOKNOW  in the field below "
      );
      if (confirmation == "UNBOOKNOW") {
        let bookingid = document.getElementById("userhsmarking").innerHTML;
        let userid = document.getElementById("usermark").innerHTML;
        deleteHouseBtn.innerHTML= "Working....."
        try {
          let res = await axios({
            method: "post",
            url: `/api/v1/bookings/unbook`,
            data: { bookingid, userid },
          });
          if (res.data.status == "failed") {
            deleteHouseBtn.innerHTML= " Unbook This House!!"
            alert("Your unbooking was unsuccessfull, try again later");
          } else {
            deleteHouseBtn.innerHTML= " Unbook This House!!"
            alert("House was successfully unbooked");

            location.reload();
          }
        } catch (err) {}
      } else {
        alert("unbooking keyword is not correct");
      }
    }
  };
  deleteHouseBtn.addEventListener("click", unbookprocess);
}

if (pagination_next_btn) {
  let nextStage = async function (e) {
    e.preventDefault();

    let pagenumbers = pageDisplay?.split("/");
    if (pagenumbers) {
      if (pagenumbers[0] === pagenumbers[1]) {
        stopNextPropagation = true;
      }
    }

    if (stopNextPropagation) {
      return;
    }

    pagination_next_btn.innerHTML = "Processing";
    //get all houses
    try {
      if (!dataPresent) {
        //first time calling the api
        let res = await axios({
          method: "get",
          url: "/api/v1/houses",
        });
        if (res.data.status == "success") {
          housesarray = res.data.houses;
        } else {
          pagination_next_btn.innerHTML = "Next";
          alert("Cannot Receive data, Check your internet");
          return;
        }
      }
      if (!housesarray) {
        pagination_next_btn.innerHTML = "Next";
        return;
      }

      let totalPages = Math.ceil(housesarray.length / 4 - 1);
      initialPage += 1;

      pageDisplay = `${initialPage}/${totalPages}`;

      document.getElementById("page_number").innerHTML = pageDisplay;

      resultCount = 4;
      let currentFour = housesarray.filter(function (element, index) {
        if (
          index >= initialPaginationNumber &&
          index < initialPaginationNumber + resultCount
        ) {
          return true;
        }
      });

      if (currentFour) {
        dataPresent = true;
        initialPaginationNumber += resultCount;

        pagination_next_btn.innerHTML = "Next";
        let housesItems = document.querySelectorAll(".mainHouseItem");

        housesItems.forEach(function (element, index) {
          element.remove();
        });

        currentFour.forEach(function (element, index) {
          document
            .getElementById("mainHouseContainer")
            .insertAdjacentHTML("afterbegin", getItemMarkup(element));
        });
      }
    } catch (err) {
      pagination_next_btn.innerHTML = "Next";
      alert("Cannot Receive data, Check your internet");
    }
  };
  pagination_next_btn.addEventListener("click", nextStage);
}

if (profileUpdateForm) {
  let updateProcess = async function (e) {
    e.preventDefault();
    profileUpdateBtn.value = "Working....";
    let userMark = document.getElementById("userMark").innerHTML;
    let reg_no = document.getElementById("profileUpdateReg").value;
    let id_no = document.getElementById("profileUpdateID").value;
    let phone = document.getElementById("profileUpdatePhone").value;
    let email = document.getElementById("profileUpdateEmail").value;
    let name = document.getElementById("profileUpdateName").value;

    try {
      let res = await axios({
        method: "patch",
        url: `/api/v1/users/${userMark}`,
        data: { reg_no, email, id_no, phone, name },
      });
      if (res.data.status == "success") {
        alert("Profile Updated");

        location.reload();
      }
      profileUpdateBtn.value = "Update Details";
    } catch (err) {
      profileUpdateBtn.value = "Update Details";
      if (err.response?.data?.message) {
        console.log("error", err.response.data.message);
        alert("Profile Update Failed");
      } else {
        console.log("err", err);
        console.log("err.response", err.response);
      }
    }
  };
  profileUpdateForm.addEventListener("submit", updateProcess);
}

if (detailsLoginForm) {
  //forms

  let detailsLoginProcess = async function (e) {
    e.preventDefault();
    let email = document.getElementById("detailsLoginEmail").value;
    let password = document.getElementById("detailsLoginPassword").value;

    document.getElementById("detail_login_btn").innerHTML = "logging in....";
    try {
      let res = await axios({
        method: "post",
        url: "/api/v1/users/login",
        data: { email, password },
      });
      if (res.data.status == "success") {
        showAlert("success", "login Successfull");

        location.reload();
      }
      document.getElementById("detail_login_btn").innerHTML = "Login";
    } catch (err) {
      document.getElementById("detail_login_btn").innerHTML = "Login";
      if (err.response?.data?.message) {
        showAlert("error", err.response.data.message);
      } else {
        console.log("err", err);
        console.log("err.response", err.response);
      }
    }
  };
  detailsLoginForm.addEventListener("submit", detailsLoginProcess);
}

if (MaincontactForm) {
  let contactProcess = async function (e) {
    e.preventDefault();

    let name = document.getElementById("contactformName").value;
    let email = document.getElementById("contactformEmail").value;
    let subject = document.getElementById("contactformSubject").value;
    let message = document.getElementById("contactformMessage").value;
    document.getElementById("contactformSubmitBtn").value = "Processing";

    try {
      let res = await axios({
        method: "post",
        url: "/api/v1/users/contact",
        data: { name, email, subject, message },
      });
      if (res.data.status == "success") {
        MaincontactForm.remove();
        let markup = `
        <h4 style="font-family:Poppins" >
        <i class="fa fa-envelope"></i>
        Your Form has been Submitted. We will contact You Soon</h4>
        `;
        document
          .getElementById("MaincontactFormContainer")
          .insertAdjacentHTML("afterbegin", markup);
      }
      document.getElementById("contactformSubmitBtn").value = "Submit";
    } catch (err) {
      document.getElementById("contactformSubmitBtn").value = "Submit";

      if (err.response?.data?.message) {
        alert("Could not send your email at this time, try again later. :)");
        console.log(err.response.data.message);
        // showAlert("error", err.response.data.message);
      } else {
        alert("Could not send your email at this time, try again later. :)");
        console.log("err", err);
        console.log("err.response", err.response);
      }
    }
  };
  MaincontactForm.addEventListener("submit", contactProcess);
}

if (profileUpdatePasswordForm) {
  let updatePasswordEvent = async function (e) {
    e.preventDefault();

    document.getElementById("profileUpdatePasswordBtn").innerHTML = "working";
    let currentPassword = document.getElementById("profileUpdateOldPass").value;
    let password = document.getElementById("profileUpdateNew").value;
    let passwordConfirm = document.getElementById(
      "profileUpdateConfirmPass"
    ).value;

    try {
      let res = await axios({
        method: "post",
        url: "/api/v1/users/updateme",
        data: { currentPassword, password, passwordConfirm },
      });
      if (res.data.status == "success") {
        alert("Password Updated");
        location.reload();
      }
      document.getElementById("profileUpdatePasswordBtn").innerHTML =
        "Update Password";
    } catch (err) {
      document.getElementById("profileUpdatePasswordBtn").innerHTML =
        "Update Password";

      if (err.response?.data?.message) {
        alert(err.response.data.message);
        console.log(err.response.data.message);
        // showAlert("error", err.response.data.message);
      } else {
        alert("Could not Update your password");
        console.log("err", err);
        console.log("err.response", err.response);
      }

      document.getElementById("profileUpdateOldPass").value = "";
      document.getElementById("profileUpdateNew").value = "";
      document.getElementById("profileUpdateConfirmPass").value = "";
    }
  };
  profileUpdatePasswordForm.addEventListener("submit", updatePasswordEvent);
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

function getItemMarkup(element) {
  return `<div class="col-md-3 col-sm-6 col-xs-6 mainHouseItem">
  <div class="apartments-content">
  <div class="image-content">
  <a href="details/${element._id}">
  <img src="/img/houses/${element.pictures[0]}" alt="${element.houseName}">
  </a></div>
   <div class="text-content">
   <div class="top-content" style="padding:0px 20px">
   <h3><a href="details/${element._id}">
   ${element.houseName}
   </a></h3>
   <span>
   <i class="fa fa-map-marker">
   </i><p style="margin-bottom:0">${element.locationID.locationName} , ${
    element.estateId.estateName
  } </p>
   </span></div> 
   <div class="bottom-content clearfix">
   <div class="meta-bed-room"><i class="fa fa-bed">
   </i> ${element.numberOfBeds} Beds<house class="numberOfBeds"></house>
   </div><div class="meta-bath-room"><i class="fa fa-bath">
   </i> ${
     element.bathShower ? "has Shower" : "no shower"
   } </div><div class="meta-bed-room">
   <i class="glyphicon glyphicon-home"></i>${
     element.tiledFloor ? "has Tiles" : "no Tiles"
   }</div>
   <div class="meta-bath-room"><i class="fa fa-power-off">
   </i>${
     element.powerAndWaterBill ? "no Tokens" : "has Tokens"
   }</div><span class="clearfix"></span>
   <div class="rent-price pull-left">${element.price}</div>
   <div class="share-meta dropup pull-right"><ul><li class="dropup">
   <a class="dropdown-toggle" href="#" data-toggle="dropdown" 
   role="button" aria-haspopup="true" aria-expanded="false">
   <i class="fa fa-share-alt"></i></a><ul class="dropdown-menu">
   <li><a href="#"><i class="fa fa-facebook"></i></a></li><li>
   <a href="#"><i class="fa fa-twitter"></i></a></li><li><a href="#">
   <i class="fa fa-instagram"></i></a></li><li><a href="#">
   <i class="fa fa-google-plus"></i></a></li></ul></li><li>
   <a href="#"><i class="fa fa-star-o"></i></a></li></ul></div></div>
  </div> 
  </div>
  </div>`;
}

if (profilePhotoUpload) {
  let uploadProcess = async function (e) {
    if (window.confirm("Upload this profile Picture?")) {
      document.getElementById("uploadLabel").innerHTML = "Uploading.....";
      document.getElementById("profileMenuText").innerHTML =
        "Uploading A Picture";
      let form = new FormData();

      form.append("profilePhotoUpload", profilePhotoUpload.files[0]);

      try {
        let res = await axios({
          method: "POST",
          url: "/api/v1/users/profileImage",
          data: form,
        });
        if (res.data.status == "success") {
          location.reload();
        } else {
          document.getElementById("uploadLabel").innerHTML =
            "Upload A Profile Image";
          document.getElementById("profileMenuText").innerHTML =
            "Profile Details";
          alert("Profile update failed. Check your internet");
        }
      } catch (err) {
        document.getElementById("uploadLabel").innerHTML =
          "Upload A Profile Image";
        document.getElementById("profileMenuText").innerHTML =
          "Profile Details";
        if (err.response?.data?.message) {
        } else {
          console.log("err", err);
          console.log("err.response", err.response);
        }
      }
    }
  };

  profilePhotoUpload.addEventListener("change", uploadProcess);
}

if (paypal_pay_btn) {
  let paywithpaypal = async function (e) {
    e.preventDefault();

    if (window.confirm("Proceed with Payment using Paypal")) {
      paypal_pay_btn.innerHTML = "Processing";
      let itemname = "Unihome House Payment.";
      let price = document.getElementById("houseIdentifierMark").innerHTML;
      try {
        let res = await axios({
          method: "post",
          url: "/api/v1/bookings/purchase/paypal",
          data: { itemname, price },
        });
        if (res.data.status == "success") {
          alert("Paypal Request Received.");
          console.log(res.data);
          location.assign(res.data.url);
          // alert(
          //   "Your booking will be verified once the Admin receives your transaction. Be patient. :)"
          // );
        } else {
          console.log("res.data.status", res.data.status);
          alert("Unable to make payment request. Try again Later");
        }
      } catch (err) {
        paypal_pay_btn.innerHTML = "PayPal";
        alert("Unable to make payment request. Try again Later");
      }
    }
  };
  paypal_pay_btn.addEventListener("click", paywithpaypal);
}
if (stripe_pay_btn) {
  stripe = Stripe(
    "pk_test_51JMWK4CuhX5gX0NbFFETzj5sNRu2UGt7qKQrJK4HIvFv6UVytSinahx71sCsbxfXtQ5J1UlMNktLGtGbwGZ3UwEr00MZrmQIpk"
  );

  let userID = document.getElementById("userIdentifier").innerHTML;
  let houseID = document.getElementById("houseIdentifier").innerHTML;
  let amount = document.getElementById("houseIdentifierMark").innerHTML;

  let paywithstripe = async function (e) {
    e.preventDefault();
    if (window.confirm("Proceed with Payment using a Credit Card")) {
      stripe_pay_btn.innerHTML = "Processing";

      try {
        let res = await axios({
          method: "post",
          url: "/api/v1/bookings/purchase",
          data: { houseID, amount },
        });
        if (res.data.status == "success") {
          // stripe_pay_btn.innerHTML = "Credit Card";
          // location.assign("/myhouse");
          await stripe.redirectToCheckout({ sessionId: res.data.data.id });
        } else {
          alert("Unable to make payment request. Try again Later");
          stripe_pay_btn.innerHTML = "Credit Card";
          console.log(res.data);
        }
      } catch (err) {
        alert("Unable to make payment request. Try again Later");
        stripe_pay_btn.innerHTML = "Credit Card";
        console.log(err);
      }

      stripe_pay_btn.innerHTML = "Credit Card";
    }
  };
  stripe_pay_btn.addEventListener("click", paywithstripe);
}
if (mpesa_pay_btn) {
  let paywithmpesa = function (e) {
    e.preventDefault();
    if (window.confirm("Proceed with Payment using Mpesa")) {
      document.querySelector(".mpesa-dialogue").classList.remove("hidden");
    }
  };
  mpesa_pay_btn.addEventListener("click", paywithmpesa);
}
if (mpesaNumberForm) {
  let mpesaProcess = async function (e) {
    e.preventDefault();
    let phone = document.getElementById("mpesano").value;

    document.querySelector(".mpesa-dialogue").classList.add("hidden");

    try {
      let res = await axios({
        method: "post",
        url: "/api/v1/bookings/purchase/mpesa",
        data: { phone },
      });
      if (res.data.status == "success") {
        alert("Mpesa Request SuccessFull");
        alert(
          "Your booking will be verified once the Admin receives your transaction. Be patient. :)"
        );
      } else {
        alert("Unable to make payment request. Try again Later");
      }
    } catch (err) {
      alert("Unable to make payment request. Try again Later");
    }
  };
  mpesaNumberForm.addEventListener("submit", mpesaProcess);
}

if (mpesaCancel) {
  mpesaCancel.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".mpesa-dialogue").classList.add("hidden");
  });
}
