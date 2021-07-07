import User from './models/User.js';

const postUser = async () => {
  await User.create({
    'user_name': 'martin',
  })
}

// postUser();

const updateUser = async () => {
  await User.update({
    'first_name': 'Martin',
    'last_name': 'Pfatrisch',
    'email': 'martinpfatrisch@gmail.com',
  }, {
    where: {
      id: 2,
    }
  })
}

updateUser();
