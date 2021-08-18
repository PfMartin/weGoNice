import Author from '../models/Author.js';

/**
 * Finds all authors in the database and returns them in json format
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const getAuthors = async (req, res) => {
  try {
    const measures = await Author.findAll();
    res.send(measures);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Finds an author with a specific id in the database and returns it in json format
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const getAuthorById = async (req, res) => {
  try {
    const measures = await Author.findAll({
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
 * Creates a new author
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const createAuthor = async (req, res) => {
  try {
    await Author.create(req.body);
    res.json({
      message: 'Author created',
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * Updates a specific author with the sent data
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const updateAuthor = async (req, res) => {
  try {
    await Author.update(req.body, {
      where: {
        id: param.req.id,
      },
    });
    res.json({
      message: 'Author Updated',
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * Deletes a specific author
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const deleteAuthor = async (req, res) => {
  try {
    await Author.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: 'Author Deleted',
    });
  } catch (err) {
    console.error(err);
  }
};
