import PrepStep from '../models/PrepStep.js';

/**
 * Finds all preparation steps in the database and returns them in json format
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const getPrepSteps = async (req, res) => {
  try {
    const prepSteps = await PrepStep.findAll();
    res.send(prepSteps);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Finds a preparation step with a specific id in the database and returns it in json format
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const getPrepStepById = async (req, res) => {
  try {
    const prepSteps = await PrepStep.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.send(prepSteps[0]);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Creates a new preparation step
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const createPrepStep = async (req, res) => {
  try {
    await PrepStep.create(req.body);
    res.json({
      message: 'PrepStep Created',
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * Updates a specific preparation step with the sent data
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const updatePrepStep = async (req, res) => {
  try {
    await PrepStep.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: 'PrepStep Updated',
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * Deletes a specific preparation step
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const deletePrepStep = async (req, res) => {
  try {
    await PrepStep.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: 'PrepStep Deleted',
    });
  } catch (err) {
    console.error(err);
  }
};
