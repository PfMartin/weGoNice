import express from 'express';

import * as referencesAcademicTitleCtrl from '../controllers/AcademicTitle.js';
import * as referencesSalutationCtrl from '../controllers/Salutation.js';
import * as referencesAuthorCtrl from '../controllers/Author.js';

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

export default recipeRouter;
