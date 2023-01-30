const Fs = require("fs");
const Path = require("path");
const Express = require("Express");
const CookieParser = require("cookie-parser");
const Morgan = require("morgan");
let Session = require("express-session");
const postgres = require("./modules/postgres");
const { v4 } = require("uuid");

let app = Express();

// Middlewares
app.use(Express.static("public"));
app.use(CookieParser());
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(
  Session({
    genid: function (req) {
      return v4(); // use UUIDs for session IDs
    },
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(Morgan("tiny"));

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
