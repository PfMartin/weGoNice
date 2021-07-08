import express from 'express';

import * as users_ctrl from '../controllers/User.js';
import * as measure_ctrl from '../controllers/Measure.js';
import * as time_ctrl from '../controllers/Time.js';

const router = express.Router();

router.get('/users', users_ctrl.getUsers);
router.get('/users/:id', users_ctrl.getUserById);
router.post('/users', users_ctrl.createUser);
router.put('/users/:id', users_ctrl.updateUser);
router.delete('/users/:id', users_ctrl.deleteUser);

router.get('/times', time_ctrl.getTimes);
router.get('/times/:id', time_ctrl.getTimeById);
router.post('/times', time_ctrl.createTime);
router.put('/times/:id', time_ctrl.updateTime);
router.delete('/times/:id', time_ctrl.deleteTime);

router.get('/measures', measure_ctrl.getMeasures);
router.get('/measures/:id', measure_ctrl.getMeasureById);
router.post('/measures', measure_ctrl.createMeasure);
router.put('/measures/:id', measure_ctrl.updateMeasure);
router.delete('/measures/:id', measure_ctrl.deleteMeasure);

export default router;
