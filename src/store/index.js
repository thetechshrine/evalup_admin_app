import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';

import reducers from './reducers';

export default createStore(reducers, composeWithDevTools(applyMiddleware(reduxThunk, reduxLogger)));
