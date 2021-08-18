import { Sequelize } from "sequelize";
import db from "../../config/database.js";

const { DataTypes } = Sequelize;

const Category = db.define(
  "recipeCategory",
  {
    title: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    tableName: "recipeCategory",
  }
);

export default Category;
