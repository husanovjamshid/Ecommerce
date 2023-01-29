const { generateToken } = require("../../modules/jwt");
let slugify = require("slugify");

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
      res.render("admin/dashboard");
    } catch (e) {
      res.redirect("404");
      console.log(e + "");
    }
  }

  static async CategoryCreateGET(req, res) {
    try {
      res.render("admin/categories-create");
    } catch (e) {
      console.log(e + "");
      res.render("404", {
        data: {
          message: e + "",
        },
      });
    }
  }

  static async CategoryCreatePOST(req, res) {
    try {
      const { uz_name, ru_name, en_name } = req.body;

      const slug = slugify(uz_name.toLowerCase(), {
        remove: /[*+~.()'"!:@,;><`~]/g,
      });

      await req.db.categories.create({
        uz_name,
        ru_name,
        en_name,
        slug,
        icon: req.file.filename,
      });

      let categories = await req.db.categories.findAll();

      res.render("admin/categories", {
        data: {
          categories,
          message: "Category created successfully",
        },
      });
    } catch (e) {
      console.log(e);
      res.render("404", {
        data: {
          message: e,
        },
      });
    }
  }

  static async CategoriesGET(req, res) {
    try {
      let categories = await req.db.categories.findAll({ raw: true });
      res.render("admin/categories", {
        data: {
          categories,
        },
      });
    } catch (e) {
      console.log(e);
      res.render("404", {
        data: {
          message: e,
        },
      });
    }
  }

  static async CategoryDeleteGET(req, res) {
    try {
      const { category_id } = req.params;

      await req.db.categories.destroy({
        where: { category_id },
      });

      let categories = await req.db.categories.findAll();

      res.render("admin/categories", {
        data: {
          categories,
          message: "Category deleted successfully",
        },
      });
    } catch (e) {
      console.log(e);
      res.render("404", {
        data: {
          message: e,
        },
      });
    }
  }

  static async SubCategoryCreateGET(req, res) {
    try {
      console.log(req.session.category.slug);
      res.render("admin/sub-categories-create", {
        category_slug: req.session.category.slug,
      });
    } catch (e) {
      console.log(e + "");
      res.render("404", {
        data: {
          message: e + "",
        },
      });
    }
  }

  static async SubCategoryCreatePOST(req, res) {
    try {
      const { uz_name, ru_name, en_name } = req.body;
      const slug = slugify(uz_name.toLowerCase(), {
        remove: /[*+~.()'"!:@,;><`~]/g,
      });

      await req.db.sub_categories.create({
        uz_name,
        ru_name,
        en_name,
        sub_category_slug: slug,
        sub_category_image: req.file.filename,
        category_id: req.session.category.category_id,
      });

      let sub_categories = await req.db.sub_categories.findAll({
        raw: true,
        where: { category_id: req.session.category.category_id },
      });

      res.render(`admin/sub-categories`, {
        data: {
          message: "Sub category created successfully",
          sub_categories,
        },
      });
    } catch (e) {
      console.log(e);
      res.render("404", {
        data: {
          message: e,
        },
      });
    }
  }

  static async SubCategoriesGET(req, res) {
    try {
      let slug = req.params.slug;

      let category = await req.db.categories.findAll({
        raw: true,
        where: { slug },
      });

      req.session.category = category[0];

      let sub_categories = await req.db.sub_categories.findAll({
        raw: true,
        where: { category_id: category[0].category_id },
      });

      res.render("admin/sub-categories", {
        data: {
          sub_categories,
        },
      });
    } catch (e) {
      console.log(e);
      res.render("404", {
        data: {
          message: e,
        },
      });
    }
  }

  static async ProductsGET(req, res) {
    try {
      let products = await req.db.products.findAll({ raw: true });
      req.session.sub_category_id = req.params.sub_category_id;

      console.log(req.session.sub_category_id);
      res.render("admin/products", {
        data: {
          products,
        },
      });
    } catch (e) {
      console.log(e);
      res.render("404", {
        data: {
          message: e,
        },
      });
    }
  }

  static async ProductsCreateGET(req, res) {
    try {
      res.render("admin/products-create", {
        sub_category_id: req.session.sub_category_id,
        category_slug: req.session.category.slug,
      });
    } catch (e) {
      console.log(e);
      res.render("404", {
        data: {
          message: e,
        },
      });
    }
  }

  static async ProductsCreatePOST(req, res) {
    try {
      const {
        uz_name,
        ru_name,
        en_name,
        uz_description,
        ru_description,
        en_description,
        options,
        price,
        sale,
      } = req.body;

      let thumb = [];
      for (let i of req.files) {
        thumb.push(i.filename);
      }

      const slug = slugify(uz_name.toLowerCase(), {
        remove: /[*+~.()'"!:@,;><`~]/g,
      });

      await req.db.products.create({
        uz_name,
        ru_name,
        en_name,
        uz_description,
        ru_description,
        en_description,
        options,
        price,
        slug,
        thumb,
        sale,
        sub_category_id: req.session.sub_category_id,
      });

      let products = await req.db.products.findAll({
        raw: true,
        where: { sub_category_id: req.session.sub_category_id },
      });

      res.render("admin/products", {
        data: {
          sub_category_id: req.session.sub_category_id,
          category_slug: req.session.category.slug,
          products,
          message: "Product created successfully",
        },
      });
    } catch (e) {
      console.log(e);
      res.render("404", {
        data: {
          message: e,
        },
      });
    }
  }
};
