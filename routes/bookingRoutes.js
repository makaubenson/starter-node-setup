let bookingController = require("./../controller/bookingController");
let authController = require("./../controller/authControler");
let express = require("express");

let routes = express.Router();

routes.get("/", bookingController.getAllBooking);
routes.post("/", bookingController.add);
routes.post(
  "/purchase",
  authController.protected,
  bookingController.createSession
);
routes.post(
  "/purchase/mpesa",
  authController.protected,
  bookingController.useMpesa
);
routes.post(
  "/purchase/paypal",
  authController.protected,
  bookingController.paypalObject,
  bookingController.paypalSession
);
routes.get(
  "/purchase/success",
  bookingController.paypalProcess
);
routes.get("/:id", bookingController.getOne);
routes.delete("/:id", bookingController.delete);
routes.patch("/:id", bookingController.update);
routes.post("/unbook", bookingController.unbook);

module.exports = routes;
