const {
  LoginGET,
  LoginPOST,
  AdminGET,
  CategoryCreateGET,
  CategoryCreatePOST,
  CategoriesGET,
  CategoryDeleteGET,
  SubCategoryCreateGET,
  SubCategoriesGET,
  SubCategoryCreatePOST,
  ProductsGET,
  ProductsCreateGET,
  ProductsCreatePOST,
} = require("../controller/admin/admin-controller");

// multer
const Path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, Path.join(__dirname, "..", "/public/data/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + Path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const router = require("express").Router();

router.get("/login", LoginGET);
router.post("/login", LoginPOST);
router.get("/", AdminGET);

// Categories
router.get("/categories/create", CategoryCreateGET);
router.post("/categories/create", upload.single("img"), CategoryCreatePOST);
router.get("/categories", CategoriesGET);
router.get("/categories/delete/:category_id", CategoryDeleteGET);
// Sub Categories
router.get("/categories/:slug", SubCategoriesGET);
router.get("/sub-categories/create", SubCategoryCreateGET);
router.post(
  "/sub-categories/create",
  upload.single("img"),
  SubCategoryCreatePOST
);

// Products
router.get("/categories/products/create", ProductsCreateGET)
router.get("/categories/products/:sub_category_id", ProductsGET);
router.post(
  "/categories/products/create",
  upload.array("images", 5),
  ProductsCreatePOST
);

module.exports = {
  path: "/admin",
  router,
};
