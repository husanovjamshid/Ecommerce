const { Sequelize, DataTypes } = require("sequelize");
const { DB_URL } = require("../config");
const Models = require("../models/models");

const sequelize = new Sequelize(DB_URL, {
  // logging: (e) => console.log("SQL ", e),
  logging: false,
});

async function postgres() {
  try {
    const db = {};

    // models
    db.users = await Models.Users(DataTypes, sequelize);
    db.attempts = await Models.Attempts(DataTypes, sequelize);
    db.categories = await Models.Categories(DataTypes, sequelize);
    db.sub_categories = await Models.SubCategories(DataTypes, sequelize);
    db.products = await Models.Products(DataTypes, sequelize);

    await sequelize.sync({ force: false });
    // await sequelize.sync({ alter: true });
    return db;
  } catch (e) {
    console.log("DB ERROR", e);
  }
}

module.exports = postgres;
