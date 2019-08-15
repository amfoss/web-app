import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import '@blueprintjs/core/lib/css/blueprint';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import './styles/styles.sass';

import Cookies from 'universal-cookie';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Task from './pages/Task';
import Profile from './pages/Profile';
import Edit from "./pages/Edit";

const cookies = new Cookies();

const LogoutPage = () => {
  cookies.remove('token');
  cookies.remove('refreshToken');
  cookies.remove('username');
  localStorage.clear();
  return <Redirect to="/login" />;
};

const AppRoutes = () => {
  const token = cookies.get('token');
  if (!token) return <Login />;
  return (
    <Switch>
      <Route exact path="/" component={() => <Dashboard />} />
      <Route exact path="/login" component={() => <Login />} />
      <Route exact path="/logout" component={LogoutPage} />
      <Route exact path="/dashboard" component={() => <Dashboard />} />
      <Route exact path="/tasks" component={() => <Tasks />} />
      <Route exact path="/tasks/:id" component={Task} />
      <Route exact path="/profile" component={() => <Profile />} />
      <Route exact path="/update-profile" component={() => <Edit/>} />
    </Switch>
  );
};

export default class App extends Component {
  render() {
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
}
