let express = require("express");
let authController = require("./../controller/authControler");
let viewController = require("./../controller/viewsController");

let router = express.Router();

router.use(authController.isLoggedin);
//pug rendering
router.get("/", authController.isLoggedin, viewController.getHome);
