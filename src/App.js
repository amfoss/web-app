import React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import '@blueprintjs/core/lib/css/blueprint';
import './styles/styles.sass';

import Cookies from 'universal-cookie';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const cookies = new Cookies();

function HomePage() {
  const token = cookies.get('token');
  if (token) return <Redirect to="/dashboard" />;
  return <Redirect to="/login" />;
}

function LoginPage() {
  return <Login />;
}

function LogoutPage() {
  cookies.remove('token');
  cookies.remove('refreshToken');
  cookies.remove('username');
  localStorage.clear();
  return <Redirect to="/login" />;
}

function DashboardPage() {
  const token = cookies.get('token');
  if (!token) return <Redirect to="/login" />;
  return <Dashboard />;
}

function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/logout" component={LogoutPage} />
      <Route exact path="/dashboard" component={DashboardPage} />
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
