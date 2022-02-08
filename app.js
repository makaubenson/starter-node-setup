//requiring express node js module
let express = require("express");
let userRootes = require("./routes/userRoutes");
let ownerRoutes = require("./routes/ownerRoutes");
let housesRoutes = require("./routes/housesRoutes");
let estateRoutes = require("./routes/estateRoute");
let homeRoutes = require("./routes/homeRootes");
let bookingRoutes = require("./routes/bookingRoutes");
let locationRoutes = require("./routes/locationRoutes");
let viewRoutes = require("./routes/viewsRoutes");
let errorController = require("./controller/errorcontroller");
let bookingcontroller = require("./controller/bookingController");
let cookieParser = require("cookie-parser");
let path = require("path");
const pug = require("pug");
let compression = require("compression");

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
let xss = require("xss-clean");
let cors = require("cors");

//initialize express
let app = express();
app.use(cors());
app.options("*", cors());
app.enable("trust proxy");
app.use(cookieParser());
app.use(compression());
//website rendering with PUG
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(`${__dirname}/public`));

app.use(function (req, res, next) {
  console.log("middleware running");

  next();
});

app.use(helmet());
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  bookingcontroller.receiveWebhook
);
//limiting request json to 10kb
app.use(express.json());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ limit: "10kb", extended: true }));
app.use(mongoSanitize());
app.use(xss());

let limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 100 requests per windowMs
  message:
    "Too many accounts created from this IP, please try again after an hour",
});

app.use("/api/", limiter);
app.use("/api/v1/users", userRootes);
app.use("/", viewRoutes);
// app.use("/", homeRoutes);
app.use("/api/v1/owners", ownerRoutes);
app.use("/api/v1/houses", housesRoutes);
app.use("/api/v1/estates", estateRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/locations", locationRoutes);

app.use("*", function (req, res, next) {
  // res.json({
  //   status: "failled",
  //   message: "Route not set",
  // });
  res.status(200).render("_404");
});

app.use(errorController);
module.exports = app;
