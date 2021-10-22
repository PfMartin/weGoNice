import Value from '../models/Value.js';
import Measure from '../models/Measure.js';

/**
 * Finds all values in the database and returns them in json format
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const getValues = async (req, res) => {
  try {
    const values = await Value.findAll({
      include: [
        {
          model: Measure,
          as: 'generalMeasure',
        },
      ],
    });
    res.send(values);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Finds a value with a specific id in the database and returns it in json format
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const getValueById = async (req, res) => {
  try {
    const values = await Value.findAll({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Measure,
          as: 'generalMeasure',
        },
      ],
    });
    res.send(values[0]);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Creates a new value
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const createValue = async (req, res) => {
  try {
    await Value.create(req.body);
    res.json({
      message: 'Value created',
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * Updates a specific value with the sent data
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const updateValue = async (req, res) => {
  try {
    await Value.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: 'Value Updated',
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * Deletes a specific value
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const deleteValue = async (req, res) => {
  try {
    await Value.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: 'Value Deleted',
    });
  } catch (err) {
    console.error(err);
  }
};
