import PrepStep from '../models/PrepStep.js';

export const getPrepSteps = async (req, res) => {
  try {
    const prepSteps = await PrepStep.findAll();
    res.send(prepSteps);
  } catch (err) {
    console.error(err);
  }
};

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

export const createPrepStep = async (req, res) => {
  try {
    await PrepStep.create(req.body);
    res.json({
      message: 'PrepStep created',
    });
  } catch (err) {
    console.error(err);
  }
};

export const updatePrepStep = async (req, res) => {
  try {
    await PrepStep.update(req.body, {
      where: {
        id: param.req.id,
      },
    });
    res.json({
      message: 'PrepStep Updated',
    });
  } catch (err) {
    console.error(err);
  }
};

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
