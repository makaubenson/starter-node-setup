let express = require("express");
let authController = require("../controller/authControler");
let viewController = require("../controller/viewController");

let router = express.Router();

router.get("/", authController.isLoggedin, viewController.getHome);
router.get("/404", authController.isLoggedin, viewController.getNotFound);
router.get("/500", authController.isLoggedin, viewController.getNotFound);

router.use("*", viewController.getNotFound);

module.exports = router;
