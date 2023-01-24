const { generateToken } = require("../../modules/jwt");

module.exports = class Controller {
  static async LoginGET(req, res) {
    try {
      res.render("admin/login");
    } catch (e) {
      res.redirect("/404", e);
      console.log(e + "");
    }
  }

  static async LoginPOST(req, res) {
    try {
      const { users } = req.db;
      const { email, password } = req.body;

      let user = await users.findOne({ where: { email } });

      if (user.password !== password) {
        res.render("404", {
          error: "Invalid password",
        });
      }

      let token = await generateToken({
        ...user,
        password: undefined,
      });

      res.cookie("token", token).redirect("/admin");
    } catch (e) {
      res.redirect("/404", e);
      console.log(e + "");
    }
  }
 
  static async AdminGET(req, res) {
    try {
      res.render("admin/dashboard")
    } catch (e) {
      res.redirect("404");
      console.log(e + "");
    }
  }
};
