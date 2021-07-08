import express from 'express';

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/User.js';

import {
  getMeasures,
  getMeasureById,
  createMeasure,
  updateMeasure,
  deleteMeasure,
} from '../controllers/Measure.js';

import {
  getTimes,
  getTimeById,
  createTime,
  updateTime,
  deleteTime,
} from '../controllers/Time.js';

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

router.get('/times', getTimes);

export default router;
