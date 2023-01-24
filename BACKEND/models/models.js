module.exports = class Models {
  static async Users(Datatypes, sequelize) {
    return sequelize.define(
      "users",
      {
        id: {
          type: Datatypes.UUID,
          defaultValue: Datatypes.UUIDV4(),
          primaryKey: true,
        },
        full_name: {
          type: Datatypes.STRING(64),
          allowNull: false,
        },
        phone_number: {
          type: Datatypes.STRING(12),
          is: /^998[389][01345789][0-9]{7}$/,
          allowNull: false,
        },
        email: {
          type: Datatypes.STRING(64),
          is: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
          allowNull: false,
        },
        role: {
          type: Datatypes.STRING(10),
          isIn: [["user", "superadmin", "admin"]],
          defaultValue: "user",
        },
        user_attempts: {
          type: Datatypes.SMALLINT,
          allowNull: false,
          defaultValue: 0,
        },
        password: {
          type: Datatypes.STRING,
        },
        avatar: {
          type: Datatypes.STRING,
          allowNull: false,
          defaultValue: "default.png",
        },
      },
      {
        timestamps: false,
      }
    );
  }

  static async Attempts(DataTypes, sequelize) {
    return sequelize.define("attempts", {
      attempt_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      code: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      attempts: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1,
      },
    });
  }

  static async Categories(DataTypes, sequelize) {
    sequelize.define("categories", {
      category_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      uz_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ru_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      en_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      icon: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
    });
  }

  static async SubCategories(DataTypes, sequelize) {
    return sequelize.define("subcategories", {
      sub_category_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      uz_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ru_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      en_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sub_category_slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sub_category_image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  }

  static async Products(DataTypes, sequelize) {
    return sequelize.define("products", {
      product_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      uz_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ru_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      en_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      thumb: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      sale: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      in_stock: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      uz_description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      ru_description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      en_description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      options: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    });
  }
};
