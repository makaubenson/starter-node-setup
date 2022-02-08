let express = require("express");
let authController = require("./../controller/authControler");
let viewController = require("./../controller/viewsController");

let router = express.Router();

router.use(authController.isLoggedin);
//pug rendering
router.get("/", authController.isLoggedin, viewController.getHome);
router.get("/house/:id", authController.isLoggedin, viewController.getHouse);
router.get("/login", viewController.login);
router.get("/me", authController.protected, viewController.getMe);
// router.get('/myhouse', authController.protected, viewController.getbooking);
router.get("/myhouse", authController.protected, viewController.getbooking);
// router.get('/details/:id', authController.protected, viewController.getHouse);
router.get("/details/:id", authController.isLoggedin, viewController.getHouse);
router.get(
  "/location/details/:id",
  authController.isLoggedin,
  viewController.getHouse
);
router.get("/contact", authController.isLoggedin, viewController.getContact);
router.get("/profile", authController.protected, viewController.getProfile);
router.get(
  "/location/:id",
  authController.isLoggedin,
  viewController.locationHouses
);
router.get("/search", authController.isLoggedin, viewController.search);
router.get(
  "/purchase/:id",
  authController.protected,
  viewController.getPayment
);
router.get("/verify/:id", viewController.getVerify);
// router.get("/format", viewController.format);
router.get("/logoutUser", authController.logout);
//router.get('/email', viewController.email);
router.post(
  "/formUpdateUser",
  authController.protected,
  viewController.formUpdate
);

module.exports = router;
//modules.export =router
