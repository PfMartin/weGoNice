import { Sequelize } from "sequelize";
import db from "../../config/database.js";

import Value from "../general/models/Value.js";
import Recipe from "../Recipe.js";

const { DataTypes } = Sequelize;

const Time = db.define(
  "recipesTime",
  {
    title: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "recipesTime",
  }
);

Time.belongsTo(Value);
Time.belongsTo(Recipe);
