import AcademicTitle from '../models/AcademicTitle.js';

/**
 * Finds all academic titles in the database and returns them in json format
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const getAcademicTitles = async (req, res) => {
  try {
    const measures = await AcademicTitle.findAll();
    res.send(measures);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Finds an academic title with a specific id in the database and returns it in json format
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const getAcademicTitleById = async (req, res) => {
  try {
    const measures = await AcademicTitle.findAll({
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
 * Creates a new academic title
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const createAcademicTitle = async (req, res) => {
  try {
    await AcademicTitle.create(req.body);
    res.json({
      message: 'AcademicTitle created',
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * Updates a specific academic title with the sent data
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const updateAcademicTitle = async (req, res) => {
  try {
    await AcademicTitle.update(req.body, {
      where: {
        id: param.req.id,
      },
    });
    res.json({
      message: 'AcademicTitle Updated',
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * Deletes a specific academic title
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const deleteAcademicTitle = async (req, res) => {
  try {
    await AcademicTitle.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: 'AcademicTitle Deleted',
    });
  } catch (err) {
    console.error(err);
  }
};
