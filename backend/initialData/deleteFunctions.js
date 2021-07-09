import User from '../models/User.js';
import Measure from '../models/Measure.js';
import RecipeCategory from '../models/RecipeCategory.js';

export const deleteUsers = async () => {
  const users = await User.findAll();

  // const userIds = users.map((user) => {
  //   return user.id;
  // })

  console.log(users);
}
