import User from '../models/User.js';
import Measure from '../models/Measure.js';
import Value from '../models/Value.js';

export const createUsers = async () => {
  await User.create({
    firstName: 'Martin',
    lastName: 'Pfatrisch',
    userName: 'martin',
  });

  await User.create({
    userName: 'lea',
    firstName: 'Lea',
    lastName: 'Haberl',
  });
};

/**
 * Creates time measures for select fields
 * @return {Promise}
 */
export const createMeasures = async () => {
  await Measure.create({
    title: 'sec',
    description: 'Seconds',
    category: 'time',
  });

  await Measure.create({
    title: 'min',
    description: 'Minutes',
    category: 'time',
  });

  await Measure.create({
    title: 'h',
    description: 'Hours',
    category: 'time',
  });

  await Measure.create({
    title: 'g',
    description: 'Grams',
    category: 'quantity',
  });

  await Measure.create({
    title: 'ml',
    description: 'Millilitres',
    category: 'quantity',
  });

  await Measure.create({
    title: 'pc',
    description: 'Pieces',
    category: 'quantity',
  });
};
