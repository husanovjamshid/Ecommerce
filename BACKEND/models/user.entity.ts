import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../modules/db_connect";

class User extends Model {
  public id!: string;
  public full_name!: string;
  public phone_number!: number;
  public email!: string;
  public role!: string;
  public user_attempts!: number;
  public avatar!: string;
}

User.init(
  {
    id: {
      type: Datatypes.UUID,
      defaultValue: Datatypes.UUIDV4(),
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(12),
      is: /^998[389][01345789][0-9]{7}$/,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(64),
      is: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(10),
      isIn: [["user", "superadmin", "admin"]],
      defaultValue: "user",
    },
    user_attempts: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default.png",
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);
