import User from '../models/User.js';

/**
 * Finds all users in the database and returns them in json format
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Finds a user with a specific id in the database and returns it in json format
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const getUserById = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.send(users[0]);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Creates a new user
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const createUser = async (req, res) => {
  try {
    await User.create(req.body);
    res.json({
      message: 'User created',
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * Updates a specific user with the sent data
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const updateUser = async (req, res) => {
  try {
    await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: 'User Updated',
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * Deletes a specific user
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const deleteUser = async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: 'User Deleted',
    });
  } catch (err) {
    console.error(err);
  }
};
