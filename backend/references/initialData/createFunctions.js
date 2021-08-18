import AcademicTitle from '../models/AcademicTitle.js';
import Salutation from '../models/Salutation.js';

/**
 * Creates academic titles for select fields
 * @return {Promise}
 */
export const createAcademicTitles = async () => {
  await AcademicTitle.create({
    title: 'B.Sc.',
    description: 'Bachelor of Science',
  });

  await AcademicTitle.create({
    title: 'M.Sc.',
    description: 'Master of Science',
  });

  await AcademicTitle.create({
    title: 'Dr.',
    description: 'Medical Doctor',
  });

  await AcademicTitle.create({
    title: 'PhD.',
    description: 'Doctor of Philosophy',
  });

  console.log('Done.');
};

/**
 * Creates salutations for select fields
 * @return {Promise}
 */
export const createSalutations = async () => {
  await Salutation.create({
    title: 'Ms.',
    description: 'Miss',
  });

  await Salutation.create({
    title: 'Mrs.',
    description: 'Mistress',
  });

  await Salutation.create({
    title: 'Mr.',
    description: 'Mister',
  });

  await Salutation.create({
    title: 'Div.',
    description: 'Divers',
  });

  console.log('Done.');
};
