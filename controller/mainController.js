let AsyncError = require("./../utils/catchAsync");

exports.getHome = AsyncError(async function (req, res) {
  res.send("hi");
});

exports.forgotPassword = AsyncError(async function (req, res, next) {
  res.status(200).json({ status: "success", message: ` okay` });
});
