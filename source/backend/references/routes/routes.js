import express from 'express';

import * as referencesAcademicTitleCtrl from '../controllers/AcademicTitle.js';
import * as referencesGenderCtrl from '../controllers/Gender.js';
import * as referencesReferenceCtrl from '../controllers/Reference.js';

const referenceRouter = express.Router();

// Academic Title
referenceRouter.get(
  '/references/academic_titles',
  referencesAcademicTitleCtrl.getAcademicTitles
);
referenceRouter.get(
  '/references/academic_titles/:id',
  referencesAcademicTitleCtrl.getAcademicTitleById
);
referenceRouter.post(
  '/references/academic_titles',
  referencesAcademicTitleCtrl.createAcademicTitle
);
referenceRouter.put(
  '/references/academic_titles/:id',
  referencesAcademicTitleCtrl.updateAcademicTitle
);
referenceRouter.delete(
  '/references/academic_titles/:id',
  referencesAcademicTitleCtrl.deleteAcademicTitle
);

// Gender
referenceRouter.get(
  '/references/genders',
  referencesGenderCtrl.getGenders
);
referenceRouter.get(
  '/references/genders/:id',
  referencesGenderCtrl.getGenderById
);
referenceRouter.post(
  '/references/genders',
  referencesGenderCtrl.createGender
);
referenceRouter.put(
  '/references/genders/:id',
  referencesGenderCtrl.updateGender
);
referenceRouter.delete(
  '/references/genders/:id',
  referencesGenderCtrl.deleteGender
);

// Reference
referenceRouter.get(
  '/references/references',
  referencesReferenceCtrl.getReferences
);
referenceRouter.get(
  '/references/references/:id',
  referencesReferenceCtrl.getReferenceById
);
referenceRouter.post(
  '/references/references',
  referencesReferenceCtrl.createReference
);
referenceRouter.put(
  '/references/references/:id',
  referencesReferenceCtrl.updateReference
);
referenceRouter.delete(
  '/references/references/:id',
  referencesReferenceCtrl.deleteReference
);

export default referenceRouter;
