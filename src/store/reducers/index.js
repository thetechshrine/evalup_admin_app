import { combineReducers } from 'redux';

import dialogsReducer from './ui/dialogs';
import loadingReducer from './ui/loading';
import authReducer from './auth';
import groupsReducer from './groups';
import coursesReducer from './courses';
import studentsReducer from './students';
import teachersReducer from './teachers';
import assessmentsReducer from './assessments';

export default combineReducers({
  ui: combineReducers({
    dialog: dialogsReducer,
    loading: loadingReducer
  }),
  auth: authReducer,
  groups: groupsReducer,
  courses: coursesReducer,
  students: studentsReducer,
  teachers: teachersReducer,
  assessments: assessmentsReducer
});
