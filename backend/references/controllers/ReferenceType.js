import ReferenceType from '../models/ReferenceType.js';

/**
 * Finds all reference types in the database and returns them in json format
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const getReferenceTypes = async (req, res) => {
  try {
    const measures = await ReferenceType.findAll();
    res.send(measures);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Finds a reference type with a specific id in the database and returns it in json format
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const getReferenceTypeById = async (req, res) => {
  try {
    const measures = await ReferenceType.findAll({
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
 * Creates a new reference type
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const createReferenceType = async (req, res) => {
  try {
    await ReferenceType.create(req.body);
    res.json({
      message: 'ReferenceType created',
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * Updates a specific reference type with the sent data
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const updateReferenceType = async (req, res) => {
  try {
    await ReferenceType.update(req.body, {
      where: {
        id: param.req.id,
      },
    });
    res.json({
      message: 'ReferenceType Updated',
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * Deletes a specific reference type
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const deleteReferenceType = async (req, res) => {
  try {
    await ReferenceType.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: 'ReferenceType Deleted',
    });
  } catch (err) {
    console.error(err);
  }
};
