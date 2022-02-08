let appError = require("./../utils/classError");
let housemodel = require("./../models/houseModel");
let ownermodel = require("./../models/ownerModel");
let bookingModel = require("./../models/bookingModel");
let locationModel = require("./../models/locationModel");
let Email = require("./../utils/email");

// let bookingmodel = require('./../models/bookingModel');
let userModel = require("./../models/userModel");
let AsyncError = require("./../utils/catchAsync");

exports.getHome = AsyncError(async function (req, res) {
  let houses = await housemodel
    .find({ isBooked: false })
    .limit(4)
    .populate("estateId")
    .populate("locationID");
  //  .find({ premiumHouse: true })

  let allLocation = await locationModel.find();

  let nyawittaNumber = "10+";

  let mabungoNumber = "8+";

  let SilwalNumber = "15+";

  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "default-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js  ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render("_home", {
      title: "Unihome | Maseno ",
      houses,
      nyawittaNumber,
      mabungoNumber,
      SilwalNumber,
      allLocation,
    });
});
exports.getHouse = AsyncError(async function (req, res, next) {
  let house = await housemodel
    .findById(req.params.id)
    .populate("estateId")
    .populate("locationID");
  let ownerId = house.estateId.ownerId;
  let houseOwner = await ownermodel.findById(ownerId);

  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "default-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js  ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render("_details", {
      house,
      houseOwner,
    });
});
exports.getVerify = AsyncError(async function (req, res, next) {
  let userID = req.params.id;

  let user = await userModel.findById(userID);

  let email = user.email;
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "default-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js  ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render("_verify", {
      title: "verify page",
      email,
    });
});
exports.getPayment = AsyncError(async function (req, res, next) {
  let house = await housemodel
    .findById(req.params.id)
    .populate("estateId")
    .populate("locationID");

  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "default-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js https://js.stripe.com/v3/ ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js https://js.stripe.com/v3/ 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render("_purchase", {
      house,
    });
});

exports.login = function (req, res, next) {
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "default-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js  ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render("_login", {
      title: "Login",
    });
};
exports.resetForm = function (req, res, next) {
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "default-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js  ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render("_resetPassword", {
      title: "resetpassword",
    });
};

exports.getMe = function (req, res, next) {
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "default-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js  ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render("profile", {
      title: "Profile",
    });
};

exports.getContact = function (req, res, next) {
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "default-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js  ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render("_contact", {
      title: "Profile",
    });
};
exports.getProfile = function (req, res, next) {
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "default-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js  ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render("_profile", {
      title: "Profile",
    });
};

exports.getbooking = async function (req, res, next) {
  let mybookings = await bookingModel.find({ userID: req.user.id });
  let house;
  let owner;
  let mybooking = mybookings[0];

  if (mybooking) {
    house = await housemodel
      .findById(mybooking.houseID)
      .populate("estateId")
      .populate("locationID");
  }
  if (house) {
    owner = await ownermodel.findById(house.estateId.ownerId);
  }

  if (house && !house.isBooked) {
    house.isBooked = true;
    await house.save({ validateBeforeSave: false });

    try {
      let date = mybooking.date;
      let options = { weekday: "long", month: "long", day: "numeric" };
      let formatedDate = new Intl.DateTimeFormat("en-US", options).format(date);

      new Email(req.user, " ").sendOrderConfirmEmail(
        house.houseName,
        house._id,
        formatedDate,
        req.user.name,
        req.user.email,
        mybooking.amount,
        mybooking._id
      );
    } catch (error) {
      console.log(error);
    }
  }

  // console.log("house.isBooked", house.isBooked);

  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "default-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js  ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render("_mybooking", {
      title: "MyBookings ",
      mybooking,
      owner,
      house,
    });
};

exports.formUpdate = AsyncError(async function (req, res, next) {
  let updated = await user.findByIdAndUpdate(req.user.id, {
    email: req.body.email,
    name: req.body.name,
  });
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "default-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js  ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render("profile", {
      title: "Profile",
      user: updated,
    });
});
exports.email = function (req, res, next) {
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "default-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js  ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )

    .render("emails/welcome");
};

/*
.set(
      'Content-Security-Policy',
      "default-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .set(
      'Content-Security-Policy',
      "default-src 'self' https://*.mapbox.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://api.mapbox.com 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
     */

exports.locationHouses = async function (req, res, next) {
  let houses = await housemodel
    .find({ locationID: req.params.id, isBooked: false })
    .limit(40)
    .populate("locationID")
    .populate("estateId");

  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "default-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js  ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render("housePerlocation", {
      title: "Profile",
      houses,
    });
};
exports.search = async function (req, res, next) {
  let houses = await housemodel
    .find({
      locationID: req.query.locationID,
      numberOfBeds: req.query.numberOfBeds,
      price: { $lte: req.query.price },
      isBooked: false,
    })
    .limit(40)
    .populate("locationID")
    .populate("estateId");

  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "default-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js  ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render("search", {
      title: "Profile",
      houses,
    });
};

exports.format = async function (req, res, next) {
  let houses = await housemodel.find();
  let deleteId = [];
  houses.forEach(function (element, index) {
    let id = String(element._id);
    deleteId.push(id);
  });

  // deleteId.forEach(async function (element, index) {
  //   await housemodel.findByIdAndDelete(element);
  // });

  res.send("module...");
};
