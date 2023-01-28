let port = process.env.PORT || 2000;

let app = require("./app");

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
