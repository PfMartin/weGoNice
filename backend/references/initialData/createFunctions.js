import AcademicTitle from '../models/AcademicTitle.js';
import Gender from '../models/Gender.js';

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
};

/**
 * Creates genders for select fields
 * @return {Promise}
 */
export const createGenders = async () => {
  await Gender.create({
    title: 'Div.',
  });

  await Gender.create({
    title: 'Female',
  });

  await Gender.create({
    title: 'Male',
  });
};
