import Reference from '../models/Reference.js';

export const getReferences = async (req, res) => {
  try {
    const measures = await Reference.findAll();
    res.send(measures);
  } catch (err) {
    console.error(err);
  }
}

export const getReferenceById = async (req, res) => {
  try {
    const measures = await Reference.findAll({
      where: {
        id: req.params.id,
      }
    });
    res.send(measures[0]);
  } catch (err) {
    console.error(err);
  }
}

export const createReference = async (req, res) => {
  try {
    await Reference.create(req.body);
    res.json({
      'message': 'Reference created',
    });
  } catch (err) {
    console.error(err);
  }
}

export const updateReference = async (req, res) => {
  try {
    await Reference.update(req.body, {
      where: {
        id: param.req.id,
      }
    });
    res.json({
      'message': 'Reference Updated',
    })
  } catch (err) {
    console.error(err);
  }
}

export const deleteReference = async (req, res) => {
  try {
    await Reference.destroy({
      where: {
        id: req.params.id,
      }
    });
    res.json({
      'message': 'Reference Deleted',
    })
  } catch (err) {
    console.error(err);
  }
}
