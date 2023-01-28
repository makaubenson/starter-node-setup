let express = require("express");
let authController = require("./../controller/authControler");
let mainController = require("./../controller/mainController");

let router = express.Router();

// router.use(authController.isLoggedin);
//pug rendering
router.get("/", authController.isLoggedin, mainController.getHome);

module.exports = router;
