import Fs from "fs";
import Path from "path";
import Express from "express";
import CookieParser from "cookie-parser";

let app = Express();

// Middlewares
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

  app.get("*", (req, res) => {
    res.render("404");
  });
});
// app.use(BodyParser.json());
// app.use(BodyParser.urlencoded({ extended: true }));
// app.use(Express.json());
// app.use(Express.urlencoded({ extended: true }));

export default app;
