import Measure from '../models/Measure.js';

export const getMeasures = async (req, res) => {
  try {
    const measures = await Measure.findAll();
    res.send(measures);
  } catch (err) {
    console.error(err);
  }
};

export const getMeasureById = async (req, res) => {
  try {
    const measures = await Measure.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.send(measures[0]);
  } catch (err) {
    console.error(err);
  }
};

export const createMeasure = async (req, res) => {
  try {
    await Measure.create(req.body);
    res.json({
      message: 'Measure created',
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateMeasure = async (req, res) => {
  try {
    await Measure.update(req.body, {
      where: {
        id: param.req.id,
      },
    });
    res.json({
      message: 'Measure Updated',
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteMeasure = async (req, res) => {
  try {
    await Measure.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: 'Measure Deleted',
    });
  } catch (err) {
    console.error(err);
  }
};
