import User from '../models/User.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (err) {
    console.error(err);
  }
};

export const getUserById = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.send(users[0]);
  } catch (err) {
    console.error(err);
  }
};

export const createUser = async (req, res) => {
  try {
    await User.create(req.body);
    res.json({
      message: 'User created',
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateUser = async (req, res) => {
  try {
    await User.update(req.body, {
      where: {
        id: param.req.id,
      },
    });
    res.json({
      message: 'User Updated',
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: 'User Deleted',
    });
  } catch (err) {
    console.error(err);
  }
};
