import Value from '../models/Value.js';
import Measure from '../models/Measure.js';

export const getValues = async (req, res) => {
  try {
    const values = await Value.findAll({
      include: [
        {
          model: Measure,
        },
      ],
    });
    res.send(values);
  } catch (err) {
    console.error(err);
  }
};

export const getValueById = async (req, res) => {
  try {
    const values = await Value.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.send(values[0]);
  } catch (err) {
    console.error(err);
  }
};

export const createValue = async (req, res) => {
  try {
    await Value.create(req.body);
    res.json({
      message: 'Value created',
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateValue = async (req, res) => {
  try {
    await Value.update(req.body, {
      where: {
        id: param.req.id,
      },
    });
    res.json({
      message: 'Value Updated',
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteValue = async (req, res) => {
  try {
    await Value.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: 'Value Deleted',
    });
  } catch (err) {
    console.error(err);
  }
};
