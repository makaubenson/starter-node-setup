let express = require("express");
let authController = require("../controller/authControler");
let mainController = require("../controller/apiController");

let router = express.Router();

router.get("/login", authController.login);
router.get("/", authController.protected, mainController.getHome);

module.exports = router;
