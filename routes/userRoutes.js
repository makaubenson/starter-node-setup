let express = require("express");

let userControler = require("../controller/usersController");
let authControler = require("../controller/authControler");
let viewControler = require("../controller/viewsController");

let routes = express.Router();

routes.get("/", authControler.protected, userControler.getUsers);
routes.get("/me", authControler.protected, userControler.getme);
routes.post("/login", authControler.login);
routes.post("/", userControler.addUser);
routes.get("/:id", userControler.getOneUser);
routes.delete("/:id", userControler.deletUser);
routes.patch("/:id", userControler.updateUser);
routes.post("/forgotPassword/", authControler.forgotPassword);
routes.post("/resetpassword/:token", authControler.resetPassword);
routes.get("/resetpassword/:token", viewControler.resetForm);
routes.post("/updateme", authControler.protected, authControler.updatepassword);
routes.post("/verify", userControler.verifyMe);
routes.post("/resendVerification", userControler.resendCode);
routes.post("/contact", userControler.usercontact);
routes.post(
  "/profileImage",
  authControler.protected,
  userControler.uploadimage,
  userControler.resizePhoto,
  userControler.uploadImage
);

module.exports = routes;
