import React from 'react';
import { Route } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Login from "../pages/Login";

const cookies = new Cookies();

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        cookies.get('token') ? (
          <Component {...props} />
        ) : (
          <Login lastLocation={props.location} />
        )
      }
    />
  );
};

export default PrivateRoute;
