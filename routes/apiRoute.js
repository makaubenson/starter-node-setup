let express = require("express");
let authController = require("../controller/authControler");
let mainController = require("../controller/apiController");

let router = express.Router();

router.get("/login", authController.login);
router.get("/logout", authController.logout);

router.get("/", authController.protected, mainController.getHome);
router.post("/", authController.protected, mainController.postHome);
router.get("/email", authController.protected, mainController.sendEmail);

router.use("*", mainController.notFound);

module.exports = router;
