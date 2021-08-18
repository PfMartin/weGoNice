import Salutation from '../models/Salutation.js';

export const getSalutations = async (req, res) => {
  try {
    const measures = await Salutation.findAll();
    res.send(measures);
  } catch (err) {
    console.error(err);
  }
};

export const getSalutationById = async (req, res) => {
  try {
    const measures = await Salutation.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.send(measures[0]);
  } catch (err) {
    console.error(err);
  }
};

export const createSalutation = async (req, res) => {
  try {
    await Salutation.create(req.body);
    res.json({
      message: 'Salutation created',
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateSalutation = async (req, res) => {
  try {
    await Salutation.update(req.body, {
      where: {
        id: param.req.id,
      },
    });
    res.json({
      message: 'Salutation Updated',
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteSalutation = async (req, res) => {
  try {
    await Salutation.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: 'Salutation Deleted',
    });
  } catch (err) {
    console.error(err);
  }
};
