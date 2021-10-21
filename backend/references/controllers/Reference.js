import Reference from '../models/Reference.js';
import AcademicTitle from '../models/AcademicTitle.js';
import Gender from '../models/Gender.js';

/**
 * Finds all references in the database and returns them in json format
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const getReferences = async (req, res) => {
  try {
    const measures = await Reference.findAll({
      include: [
        {
          model: AcademicTitle,
        },
        {
          model: Gender,
        },
      ],
    });
    res.send(measures);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Finds a reference with a specific id in the database and returns it in json format
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const getReferenceById = async (req, res) => {
  try {
    const measures = await Reference.findAll({
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
 * Creates a new reference
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const createReference = async (req, res) => {
  try {
    await Reference.create(req.body);
    res.json({
      message: 'Reference Created',
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * Updates a specific reference with the sent data
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const updateReference = async (req, res) => {
  try {
    await Reference.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: 'Reference Updated',
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * Deletes a specific reference
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const deleteReference = async (req, res) => {
  try {
    await Reference.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: 'Reference Deleted',
    });
  } catch (err) {
    console.error(err);
  }
};
