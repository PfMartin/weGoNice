import AcademicTitle from '../models/AcademicTitle.js';

export const getAcademicTitles = async (req, res) => {
  try {
    const measures = await AcademicTitle.findAll();
    res.send(measures);
  } catch (err) {
    console.error(err);
  }
};

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
