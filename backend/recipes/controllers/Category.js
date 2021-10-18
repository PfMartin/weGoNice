import Category from '../models/Category.js';

/**
 * Finds all recipe categories in the database and returns them in json format
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const getRecipeCategories = async (req, res) => {
  try {
    const recipeCategories = await Category.findAll();
    res.send(recipeCategories);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Finds a category with a specific id in the database and returns it in json format
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const getCategoryById = async (req, res) => {
  try {
    const recipeCategories = await Category.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.send(recipeCategories[0]);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Creates a new category
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const createCategory = async (req, res) => {
  try {
    await Category.create(req.body);
    res.json({
      message: 'Category created',
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * Updates a specific category with the sent data
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const updateCategory = async (req, res) => {
  try {
    await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: 'Category Updated',
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * Deletes a specific category
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const deleteCategory = async (req, res) => {
  try {
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: 'Category Deleted',
    });
  } catch (err) {
    console.error(err);
  }
};
