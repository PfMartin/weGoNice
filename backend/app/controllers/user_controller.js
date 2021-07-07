const db = require('../models');
const User = db.user;
const Op = db.Sequelize.Op;

// Create and save a new user
const create = async (req, res) => {
  // Validate request
  if (!req.body.lastName) {
    res.status(400).send({
      message: `Content can't be empty!`
    });

    return;
  }

  // Create a User
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };

  try {
    const data = await User.create(user);
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message:
        err.message || 'Some error occurred while creating the User.'
    });
  };
};


// Retrieve all users from the database
const findAll = async (req, res) => {
  const lastName = req.query.lastName;

  const condition = lastName ? { lastName: { [Op.iLike]: `%${lastName}%`}} : null;

  try {
    const data = await User.findAll({ where: condition });
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving users.'
    })
  }

};


// Retrieve on user from the database
const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await User.findByPk(id);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: `Error retrieving User with id=${id}.`,
    });
  };
};


module.exports = {
  create: create,
  findAll: findAll,
  findOne: findOne,
  // update: update,
  // delete: delete,
  // deleteAll: deleteAll,
}
