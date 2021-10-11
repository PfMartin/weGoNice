import express from 'express';

import * as referencesAcademicTitleCtrl from '../controllers/AcademicTitle.js';
import * as referencesSalutationCtrl from '../controllers/Salutation.js';
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

// Salutation
referenceRouter.get(
  '/references/salutations',
  referencesSalutationCtrl.getSalutations
);
referenceRouter.get(
  '/references/salutations/:id',
  referencesSalutationCtrl.getSalutationById
);
referenceRouter.post(
  '/references/salutations',
  referencesSalutationCtrl.createSalutation
);
referenceRouter.put(
  '/references/salutations/:id',
  referencesSalutationCtrl.updateSalutation
);
referenceRouter.delete(
  '/references/salutations/:id',
  referencesSalutationCtrl.deleteSalutation
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
