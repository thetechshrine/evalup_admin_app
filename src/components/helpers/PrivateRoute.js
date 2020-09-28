import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import storage from '../../utils/storage';

function PrivateRoute({ component: Component, ...otherProps }) {
  return (
    <Route
      {...otherProps}
      render={(props) => (storage.isAuthenticate() ? <Component {...props} /> : <Redirect to='/login' />)}
    />
  );
}

export default PrivateRoute;
