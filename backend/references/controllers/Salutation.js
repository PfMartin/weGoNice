import Salutation from '../models/Salutation.js';

/**
 * Finds all salutations in the database and returns them in json format
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const getSalutations = async (req, res) => {
  try {
    const measures = await Salutation.findAll();
    res.send(measures);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Finds a salutation with a specific id in the database and returns it in json format
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const getSalutationById = async (req, res) => {
  try {
    const measures = await Salutation.findAll({
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
 * Creates a new salutation
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const createSalutation = async (req, res) => {
  try {
    await Salutation.create(req.body);
    res.json({
      message: 'Salutation created',
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * Updates a specific salutation with the sent data
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const updateSalutation = async (req, res) => {
  try {
    await Salutation.update(req.body, {
      where: {
        id: param.req.id,
      },
    });
    res.json({
      message: 'Salutation Updated',
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * Deletes a specific salutation
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const deleteSalutation = async (req, res) => {
  try {
    await Salutation.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: 'Salutation Deleted',
    });
  } catch (err) {
    console.error(err);
  }
};
