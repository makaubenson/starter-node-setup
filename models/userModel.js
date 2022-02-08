let mongoose = require("mongoose");
//password encryption
let crypto = require("crypto");
var validator = require("validator");
const bcrypt = require("bcrypt");
//end of password encryption
var randomNo = require("random-number");
var randomNoOptions = {
  min: 100000,
  max: 400000,
  integer: true,
};

let schema = mongoose.Schema({
  name: { type: String },
  id_no: {
    type: Number,
    unique: true,
  },
  reg_no: {
    type: String,
    default: "not set",
  },

  email: {
    type: String,
    unique: true,
    required: [true, "email not set"],
    lowercase: true,
    validate: [validator.isEmail, "Provide a valid email"],
  },
  role: {
    type: String,
    enum: ["user", "owner"],
    default: "user",
  },
  photo: { type: String, default: "default.jpg" },
  phone: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationNumber: {
    type: Number,
    default: 000000,
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
  yearOfStudy: {
    type: Number,
  },
  active: {
    type: Boolean,
    default: true,
  },
  passwordResetToken: String,

  passwordResetExpire: Date,

  //end of schema
});

//virtual method to call on document
//encrypt on saves
schema.pre("save", async function (next) {
  //will make sure script will only run when password is modified or changed
  if (!this.isModified("password")) {
    return next();
  }
  this.verificationNumber = randomNo(randomNoOptions);

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

//end encrypt on saves

let model = mongoose.model("userModel", schema);

module.exports = model;
