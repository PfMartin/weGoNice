// import { Sequelize } from "sequelize";
// import db from "../config/database.js";
//
// import Value from "../general/models/Value.js";
// import Reference from "../references/models/Reference.js";
// import Ingredient from "./Ingredient.js";
//
// const { dataTypes } = Sequelize;
//
// const Recipe = db.define("recipeRecipe", {
//   title: {
//     type: DataTypes.STRING,
//   },
//
//   tableName: "recipeRecipe",
// });
//
// Recipe.belongsToMany(Ingredient, { through: "recipesRecipeIngredient" });
// Recipe.belongsTo(Reference);
