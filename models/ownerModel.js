let mongoose = require("mongoose");
var validator = require("validator");
let crypto = require("crypto");
const bcrypt = require("bcrypt");
let schema = mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  photo: { type: String, default: "default.jpg" },
  email: {
    type: String,
    required: [true, "email not set"],

    lowercase: true,
    validate: [validator.isEmail, "Provide a valid email"],
  },
  paymentMethods: [
    {
      type: String,
    },
  ],
  secondaryContact: {
    type: String,
  },
  id_no: {
    type: Number,
  },

  password: {
    select: false,
    type: String,
    required: [true, "No password set "],
    minlength: 8,
  },
  passwordChangedAt: Date,
  passwordConfirm: {
    type: String,
    required: [true, "No password set "],
    validate: {
      validator: function (el) {
        return el == this.password;
      },
      message: "Passwords do not match",
    },
  },
  passwordResetToken: String,

  passwordResetExpire: Date,
});

schema.pre("save", async function (next) {
  //will make sure script will only run when password is modified or changed
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;

  next();
});

schema.methods.correctPassword = async function (hash, pass) {
  return await bcrypt.compare(pass, hash);
};
schema.methods.haschangedPassword = function (tokenTime) {
  if (this.passwordChangedAt) {
    let date = this.passwordChangedAt.getTime() / 1000;

    return tokenTime < date; //future is smaller than the past ? false
  }
  return false;
};
schema.methods.createResetPasswordtoken = function () {
  let token = crypto.randomBytes(32).toString("hex");

  let hashed = crypto.createHash("sha256").update(token).digest("hex");
  // Time in the past
  // this.passwordResetExpire = new Date() - 10567823 * 10567823 + 1212000;
  this.passwordResetExpire = new Date() + 10 * 1000;

  this.passwordResetToken = hashed;

  return token;
};

schema.pre("save", async function (next) {
  //will make sure script will only run when password is modified or changed
  if (!this.isModified("password") || this.isNew) {
    return next();
  }
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

let model = mongoose.model("ownerModel", schema);
module.exports = model;
