import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        cookies.get('token') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
