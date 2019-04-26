import React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import '@blueprintjs/core/lib/css/blueprint';
import './styles/styles.sass';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function HomePage() {
  return <h1>hello</h1>;
}

function LoginPage() {
  return <Login />;
}

function DashboardPage() {
  return <Dashboard />;
}

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
      <Route exact path="/dashboard" component={DashboardPage} />
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
