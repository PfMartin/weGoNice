import ReferenceType from '../models/ReferenceType.js';

export const getReferenceTypes = async (req, res) => {
  try {
    const measures = await ReferenceType.findAll();
    res.send(measures);
  } catch (err) {
    console.error(err);
  }
};

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
