import express from 'express';

import * as referencesAcademicTitleCtrl from '../controllers/AcademicTitle.js';
import * as referencesSalutationCtrl from '../controllers/Salutation.js';
import * as referencesAuthorCtrl from '../controllers/Author.js';
import * as referencesReferenceTypeCtrl from '../controllers/ReferenceType.js';
import * as referencesReferenceCtrl from '../controllers/Reference.js';


const recipeRouter = express.Router();

recipeRouter.get('/references/academic_titles', referencesAcademicTitleCtrl.getAcademicTitles);
recipeRouter.get('/references/academic_titles/:id', referencesAcademicTitleCtrl.getAcademicTitleById);
recipeRouter.post('/references/academic_titles', referencesAcademicTitleCtrl.createAcademicTitle);
recipeRouter.put('/references/academic_titles/:id', referencesAcademicTitleCtrl.updateAcademicTitle);
recipeRouter.delete('/references/academic_titles/:id', referencesAcademicTitleCtrl.deleteAcademicTitle);

recipeRouter.get('/references/salutations', referencesSalutationCtrl.getSalutations);
recipeRouter.get('/references/salutations/:id', referencesSalutationCtrl.getSalutationById);
recipeRouter.post('/references/salutations', referencesSalutationCtrl.createSalutation);
recipeRouter.put('/references/salutations/:id', referencesSalutationCtrl.updateSalutation);
recipeRouter.delete('/references/salutations/:id', referencesSalutationCtrl.deleteSalutation);

recipeRouter.get('/references/authors', referencesAuthorCtrl.getAuthors);
recipeRouter.get('/references/authors/:id', referencesAuthorCtrl.getAuthorById);
recipeRouter.post('/references/authors', referencesAuthorCtrl.createAuthor);
recipeRouter.put('/references/authors/:id', referencesAuthorCtrl.updateAuthor);
recipeRouter.delete('/references/authors/:id', referencesAuthorCtrl.deleteAuthor);

recipeRouter.get('/references/reference_types', referencesReferenceTypeCtrl.getReferenceTypes);
recipeRouter.get('/references/reference_types/:id', referencesReferenceTypeCtrl.getReferenceTypeById);
recipeRouter.post('/references/reference_types', referencesReferenceTypeCtrl.createReferenceType);
recipeRouter.put('/references/reference_types/:id', referencesReferenceTypeCtrl.updateReferenceType);
recipeRouter.delete('/references/reference_types/:id', referencesReferenceTypeCtrl.deleteReferenceType);

recipeRouter.get('/references/references', referencesReferenceCtrl.getReferences);
recipeRouter.get('/references/references/:id', referencesReferenceCtrl.getReferenceById);
recipeRouter.post('/references/references', referencesReferenceCtrl.createReference);
recipeRouter.put('/references/references/:id', referencesReferenceCtrl.updateReference);
recipeRouter.delete('/references/references/:id', referencesReferenceCtrl.deleteReference);

export default recipeRouter;
