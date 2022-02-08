let estateController = require("./../controller/estateController");
let express = require("express");

let routes = express.Router();

routes.get("/", estateController.getAllEstates);
routes.get("/:id", estateController.getOne);
routes.post("/", estateController.add);
routes.delete("/:id", estateController.delete);
routes.patch("/:id", estateController.update);

module.exports = routes;
