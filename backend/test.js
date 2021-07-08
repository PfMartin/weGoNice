import User from './models/User.js';
import Time from './models/Time.js';
import Measure from './models/Measure.js';
import { getTimes } from './controllers/Time.js';


// Users
const postUser = async () => {
  await User.create({
    'user_name': 'martin',
    'first_name': 'Lea',
    'last_name': 'Haberl',
    'email': 'leahaberl@gmail.com',
  })
}

const updateUser = async () => {
  await User.update({
    'user_name': 'lea',
  }, {
    where: {
      id: 3,
    }
  })
}


// Measures
const createMeasures = async () => {
  await Measure.create({
    'title': 'Seconds',
    'abbreviation': 'sec',
    'category': 'time',
  });

  await Measure.create({
    'title': 'Minutes',
    'abbreviation': 'min',
    'category': 'time',
  });

  await Measure.create({
    'title': 'Hours',
    'abbreviation': 'h',
    'category': 'time',
  });
}


// Times
const createTimes = async () => {
  await Time.create({
    'time': 24,
    'measureId': 3,
  })
}

createTimes();
