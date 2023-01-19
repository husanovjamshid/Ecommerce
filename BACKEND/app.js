const Fs = require("fs");
const Path = require("path");
const Express = require("express");
const CookieParser = require("cookie-parser");

const app = Express();

// Middlewares
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(Express.static("public"));
app.use(CookieParser());
// Settings
app.set("view engine", "ejs");
app.set("views", Path.join(__dirname, "views"));

const routesPath = Path.join(__dirname, "routes");
Fs.readdir(routesPath, (err, files) => {
  if (!err) {
    files.forEach((file) => {
      const routePath = Path.join(__dirname, "routes", file);
      const Route = require(routePath);
      if (Route.path && Route.router) app.use(Route.path, Route.router);
    });
  }
});

module.exports = app;
