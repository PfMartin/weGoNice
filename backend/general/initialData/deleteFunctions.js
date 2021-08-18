import User from '../models/User.js';
import Measure from '../models/Measure.js';

export const deleteUsers = async () => {
  const users = await User.findAll();

  const userIds = users.map((user) => {
    return user.id;
  });

  userIds.forEach((userId) => {
    try {
      User.destroy({
        where: {
          id: userId,
        },
      });
    } catch (err) {
      console.error(err.message);
    }
  });
};
