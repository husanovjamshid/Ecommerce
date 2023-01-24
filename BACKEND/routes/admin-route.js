const { LoginGET, LoginPOST, AdminGET } = require("../controller/admin/admin-controller");

const router = require("express").Router();

router.get("/login", LoginGET);
router.post("/login", LoginPOST)
router.get("/", AdminGET)
module.exports = { 
  path: "/admin", 
  router,
};
