const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");

const admin = new AdminJS({});
const adminRouter = AdminJSExpress.buildRouter(admin);

module.exports = {
  path: admin.options.rootPath,
  router: adminRouter,
};
