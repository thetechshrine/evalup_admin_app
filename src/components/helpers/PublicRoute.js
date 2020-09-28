import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import storage from '../../utils/storage';

function PublicRoute({ path, component: Component, ...otherProps }) {
  return (
    <Route
      path={path}
      {...otherProps}
      render={function (props) {
        let resultComponent = <Component {...props} />;
        if (path !== '/' && storage.isAuthenticate()) resultComponent = <Redirect to='/' />;

        return resultComponent;
      }}
    />
  );
}

export default PublicRoute;
