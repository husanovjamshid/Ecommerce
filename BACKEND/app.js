const Fs = require("fs");
const Path = require("path");
const Express = require("Express");
const CookieParser = require("cookie-parser");
const BodyParser = require("body-parser");
const postgres = require("./modules/postgres");

let app = Express();

// Middlewares
app.use(Express.static("public"));
app.use(CookieParser());
app.use(Express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  const db = await postgres();
  req.db = db;
  next();
});

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

  app.get("*", (req, res) => {
    res.render("404");
  });
});

module.exports = app;
