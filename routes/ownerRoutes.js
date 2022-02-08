let express = require("express");
let ownersController = require("./../controller/ownersController");
let authControler = require("../controller/authControler");

let routes = express.Router();

routes.get("/", ownersController.getAll);
routes.post("/", ownersController.add);
routes.get("/:id", ownersController.getOne);
routes.delete("/:id", ownersController.delete);
routes.patch("/:id", ownersController.update);
routes.post("/login", authControler.login);
routes.post("/forgotPassword/", authControler.forgotPassword);
routes.post("/resetpassword/:token", authControler.resetPassword);
routes.post("/updateme", authControler.protected, authControler.updatepassword);

module.exports = routes;
