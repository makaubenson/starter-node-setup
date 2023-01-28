let express = require("express");
let authController = require("../controller/authControler");
let viewController = require("../controller/viewController");

let router = express.Router();

router.get("/", authController.protected, viewController.getHome);
router.get("/404", viewController.getNotFound);
router.get("/500", viewController.getNotFound);

router.use("*", viewController.getNotFound);

module.exports = router;
