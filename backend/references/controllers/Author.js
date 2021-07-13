import Author from '../models/Author.js';

export const getAuthors = async (req, res) => {
  try {
    const measures = await Author.findAll();
    res.send(measures);
  } catch (err) {
    console.error(err);
  }
}

export const getAuthorById = async (req, res) => {
  try {
    const measures = await Author.findAll({
      where: {
        id: req.params.id,
      }
    });
    res.send(measures[0]);
  } catch (err) {
    console.error(err);
  }
}

export const createAuthor = async (req, res) => {
  try {
    await Author.create(req.body);
    res.json({
      'message': 'Author created',
    });
  } catch (err) {
    console.error(err);
  }
}

export const updateAuthor = async (req, res) => {
  try {
    await Author.update(req.body, {
      where: {
        id: param.req.id,
      }
    });
    res.json({
      'message': 'Author Updated',
    })
  } catch (err) {
    console.error(err);
  }
}

export const deleteAuthor = async (req, res) => {
  try {
    await Author.destroy({
      where: {
        id: req.params.id,
      }
    });
    res.json({
      'message': 'Author Deleted',
    })
  } catch (err) {
    console.error(err);
  }
}
