import React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import '@blueprintjs/core/lib/css/blueprint';
import './styles/styles.sass';

import Login from './pages/Login';

function HomePage() {
  return <h1>hello</h1>;
}

function LoginPage() {
  return <Login />;
}

const checkAuth = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  if (!token || !refreshToken) {
    return false;
  }

  console.log('login worked');
};

const logout = () =>{
  // Remove token from localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
}

function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Redirect to="/" />
    </Switch>
  );
}

export default function App() {
  return (
    <React.Fragment>
      <Helmet>
        <title>amFOSS App</title>
      </Helmet>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </React.Fragment>
  );
}
