import React, {Component, useState} from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import '@blueprintjs/core/lib/css/blueprint';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import 'react-quill/dist/quill.snow.css';
import 'react-dropzone-component/styles/filepicker.css';
import './styles/styles.sass';

import Cookies from 'universal-cookie';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Task from './pages/Task';
import Profile from './pages/Profile';
import Edit from './pages/Edit';
import Attendance from "./pages/Attendance";
import CheckIn from "./pages/Check-in";
import PrivateRoute from './components/PrivateRoute';

const cookies = new Cookies();

const LogoutPage = () => {
  cookies.remove('token');
  cookies.remove('refreshToken');
  cookies.remove('username');
  localStorage.clear();
  return <Redirect to="/login" />;
};

const LoginPage = () => {
  return <Login />;
};

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>amFOSS App</title>
        </Helmet>
        <BrowserRouter>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard}/>
            <Route path="/login" component={LoginPage}/>
            <PrivateRoute exact path="/logout" component={LogoutPage}/>
            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            <PrivateRoute exact path="/tasks" component={Tasks}/>
            <PrivateRoute exact path="/tasks/:id" component={Task}/>
            <PrivateRoute exact path="/profile" component={Profile}/>
            <PrivateRoute exact path="/update-profile" component={Edit}/>
            <PrivateRoute exact path="/attendance" component={Attendance}/>
            <PrivateRoute exact path="/events/check-in" component={CheckIn}/>
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}
