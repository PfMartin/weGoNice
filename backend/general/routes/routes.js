import express from 'express';

import * as usersCtrl from '../controllers/User.js';
import * as measureCtrl from '../controllers/Measure.js';

const generalRouter = express.Router();

generalRouter.get('/general/users', usersCtrl.getUsers);
generalRouter.get('/general/users/:id', usersCtrl.getUserById);
generalRouter.post('/general/users', usersCtrl.createUser);
generalRouter.put('/general/users/:id', usersCtrl.updateUser);
generalRouter.delete('/general/users/:id', usersCtrl.deleteUser);

generalRouter.get('/general/measures', measureCtrl.getMeasures);
generalRouter.get('/general/measures/:id', measureCtrl.getMeasureById);
generalRouter.post('/general/measures', measureCtrl.createMeasure);
generalRouter.put('/general/measures/:id', measureCtrl.updateMeasure);
generalRouter.delete('/general/measures/:id', measureCtrl.deleteMeasure);

export default generalRouter;
