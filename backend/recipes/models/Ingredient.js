import { Sequelize } from "sequelize";
import db from "../../config/database.js";

import Value from "../general/models/Value.js";

const { DataTypes } = Sequelize;

const Ingredient = db.define(
  "referencesIngredient",
  {
    title: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "referencesIngredient",
  }
);

Ingredient.belongsTo(Value);
