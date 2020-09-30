import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import './styles/react-date-picker.css';
import './styles/google-autocomplete.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import store from './store';

import App from './components/App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
