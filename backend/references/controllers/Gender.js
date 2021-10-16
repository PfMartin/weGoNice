import Gender from '../models/Gender.js';

/**
 * Finds all genders in the database and returns them in json format
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const getGenders = async (req, res) => {
  try {
    const measures = await Gender.findAll();
    res.send(measures);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Finds a gender with a specific id in the database and returns it in json format
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const getGenderById = async (req, res) => {
  try {
    const measures = await Gender.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.send(measures[0]);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Creates a new gender
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const createGender = async (req, res) => {
  try {
    await Gender.create(req.body);
    res.json({
      message: 'Gender created',
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * Updates a specific gender with the sent data
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const updateGender = async (req, res) => {
  try {
    await Gender.update(req.body, {
      where: {
        id: param.req.id,
      },
    });
    res.json({
      message: 'Gender Updated',
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * Deletes a specific gender
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const deleteGender = async (req, res) => {
  try {
    await Gender.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: 'Gender Deleted',
    });
  } catch (err) {
    console.error(err);
  }
};
