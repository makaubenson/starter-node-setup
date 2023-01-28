//requiring express node js module
let express = require("express");
let mainRoutes = require("./routes/mainRoute");
let errorController = require("./controller/errorcontroller");

let cookieParser = require("cookie-parser");
let path = require("path");
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
  express.raw({ type: "application/json" })
  // TODO Stripe webhook
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
app.use("/api/v1/", mainRoutes);
app.use("/", mainRoutes);

app.use("*", function (req, res, next) {
  res.status(404).json({
    status: "404",
    message: "Route not found",
  });
});

app.use(errorController);
module.exports = app;
