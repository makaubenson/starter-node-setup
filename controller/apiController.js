let AsyncError = require("../utils/catchAsync");
const Email = require("../utils/email");

exports.getHome = AsyncError(async function ({ method }, res) {
  res.status(200).json({ status: "success", method, message: `API active` });
});
exports.postHome = AsyncError(async function ({ body, method }, res) {
  res.status(200).json({
    status: "success",
    method,
    message: `API active`,
    body,
  });
});

exports.notFound = AsyncError(async function (req, res) {
  res.status(404).json({ status: "failed", message: "Route not found" });
});

exports.sendEmail = AsyncError(async function (req, res) {
  let { user } = req;
  new Email(user, "https://example.com").send(
    req.protocol + "://" + req.get("host")
  );
  res.status(200).json({ status: "success", message: ` Email sent` });
});
