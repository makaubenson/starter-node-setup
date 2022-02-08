//Db setup
let dotenv = require("dotenv");
let express = require("express");
dotenv.config({ path: "./config.env" });
let mongoose = require("mongoose");
let DB = process.env.DBSTRING.replace("<PASSWORD>", process.env.DBPASSWORD);
let port = process.env.PORT || 2000;
let errorResponder = express();
let path = require("path");
// let app = require("./app");
const pug = require("pug");
let serverActive = false;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(function (con) {
    if (con.connections) {
      console.log("Connection to database : success");
      let app = require("./app");
      serverActive = true;
      StartApplicaton(app);
    }
  })
  .catch(function (error) {
    serverActive = false;
    console.log("Error message from Server", error.message);
    errorResponder.listen(port, function () {
      console.log(`Backup Port activated`);
    });
  });



function StartApplicaton(app) {
  let server = app.listen(port, function () {
    console.log(`server started on port ${port}`);
    console.log(`http://localhost:${port}/`);
  });

  process.on("unhandledRejection", function (err) {
    console.log("unhandledRejection", err.name, err.message);
    server.close(function () {
      process.exit(1);
    });
  });

  process.on("uncaughtException", function (err) {
    console.log("uncaughtException", err.name, err.message);
    server.close(function () {
      process.exit(1);
    });
  });

  process.on("SIGNTERM", () => {
    server.close(() => {
      console.log("SHUT DOWN DUE TO SIGTERM");
    });
  });
}

if (!serverActive) {
  errorResponder.set("view engine", "pug");
  errorResponder.set("views", path.join(__dirname, "views"));
  errorResponder.use(express.static(`${__dirname}/public`));

  errorResponder.use(function (req, res, next) {
    res.render("_serverError");
     
  });
}
