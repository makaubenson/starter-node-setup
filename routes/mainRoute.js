let express = require("express");
let authController = require("./../controller/authControler");
let mainController = require("./../controller/mainController");

let router = express.Router();

// router.use(authController.isLoggedin);
//pug rendering
router.get("/", authController.isLoggedin, mainController.getHome);
router.get("/404", authController.isLoggedin, mainController.getNotFound);
router.get("/500", authController.isLoggedin, mainController.getNotFound);
router.post("/forgotPassword/", authController.forgotPassword);

module.exports = router;
