let AsyncError = require("../utils/catchAsync");
const Email = require("../utils/email");

exports.getHome = AsyncError(async function (req, res) {
  res.status(200).json({ status: "success", message: ` okay` });
});

exports.sendEmail = AsyncError(async function (req, res) {
  let { user } = req;
  new Email(user, "https://example.com").send();
  res.status(200).json({ status: "success", message: ` Email sent` });
});
