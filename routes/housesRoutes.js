let houseController = require("./../controller/houseController");
let express = require("express");

let routes = express.Router();

routes.get("/", houseController.getAllHouses);
routes.get("/:id", houseController.getOne);
routes.post("/", houseController.add);
routes.delete("/:id", houseController.delete);
routes.patch("/:id", houseController.update);

module.exports = routes;
