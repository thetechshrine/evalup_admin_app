import { combineReducers } from 'redux';

import dialogsReducer from './ui/dialogs';
import authReducer from './auth';

export default combineReducers({
  ui: combineReducers({
    dialog: dialogsReducer
  }),
  auth: authReducer
});
