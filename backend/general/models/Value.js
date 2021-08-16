import { Sequelize } from "sequelize";
import db from "../../config/database.js";
import Measure from "./Measure.js";

const { DataTypes } = Sequelize;

// Input field for the time
const Value = db.define(
  "generalValue",
  {
    value: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "generalValue",
  }
);

Value.belongsTo(Measure);

export default Value;
