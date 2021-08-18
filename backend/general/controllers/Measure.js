import Measure from '../models/Measure.js';

/**
 * Finds all measures in the database and returns them in json format
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const getMeasures = async (req, res) => {
  try {
    const measures = await Measure.findAll();
    res.send(measures);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Finds a measure with a specific id in the database and returns it in json format
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const getMeasureById = async (req, res) => {
  try {
    const measures = await Measure.findAll({
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
 * Creates a new measure
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const createMeasure = async (req, res) => {
  try {
    await Measure.create(req.body);
    res.json({
      message: 'Measure created',
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * Updates a specific measure with the sent data
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const updateMeasure = async (req, res) => {
  try {
    await Measure.update(req.body, {
      where: {
        id: param.req.id,
      },
    });
    res.json({
      message: 'Measure Updated',
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * Deletes a specific measure
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const deleteMeasure = async (req, res) => {
  try {
    await Measure.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: 'Measure Deleted',
    });
  } catch (err) {
    console.error(err);
  }
};
