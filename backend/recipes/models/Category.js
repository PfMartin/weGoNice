import { Sequelize } from "sequelize";
import db from "../../config/database.js";

const { DataTypes } = Sequelize;

const Category = db.define(
  "recipesCategory",
  {
    title: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    tableName: "recipesCategory",
  }
);

export default Category;
