import Time from '../models/Time.js';
import Measure from '../models/Measure.js';

export const getTimes = async (req, res) => {
  try {
    const times = await Time.findAll({
      include: [{
        model: Measure,
      }]
    });
    res.send(times);
  } catch (err) {
    console.error(err);
  }
}

export const getTimeById = async (req, res) => {
  try {
    const times = await Time.findAll({
      where: {
        id: req.params.id,
      }
    });
    res.send(times[0]);
  } catch (err) {
    console.error(err);
  }
}

export const createTime = async (req, res) => {
  try {
    await Time.create(req.body);
    res.json({
      'message': 'Time created',
    });
  } catch (err) {
    console.error(err);
  }
}

export const updateTime = async (req, res) => {
  try {
    await Time.update(req.body, {
      where: {
        id: param.req.id,
      }
    });
    res.json({
      'message': 'Time Updated',
    })
  } catch (err) {
    console.error(err);
  }
}

export const deleteTime = async (req, res) => {
  try {
    await Time.destroy({
      where: {
        id: req.params.id,
      }
    });
    res.json({
      'message': 'Time Deleted',
    })
  } catch (err) {
    console.error(err);
  }
}
