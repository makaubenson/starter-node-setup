let authContoller = require("./../controller/authControler");
let express = require("express");

let routes = express.Router();

routes.get("/", function (req, res) {
  res.json({
    application: "UniHome",
    apiUrl: "/api/v1/",
    url: "unihome.techkey.co.ke",
  });
});

routes.post("/", function (req, res) {
  res.json({
    application: "UniHome",
    apiUrl: "/api/v1/",
    url: "unihome.techkey.co.ke",
    method: "POST",
  });
});

routes.post("/login", authContoller.login);

module.exports = routes;
