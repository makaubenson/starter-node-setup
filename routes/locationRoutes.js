let locationController = require("./../controller/locationController");
let express = require("express");

let routes = express.Router();

routes.get("/", locationController.getAllLocation);
routes.post("/", locationController.add);
routes.get("/:id", locationController.getOne);
routes.delete("/:id", locationController.delete);
routes.patch("/:id", locationController.update);

module.exports = routes;
