import React, { Component } from 'react';
import HttpsRedirect from 'react-https-redirect';

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
import CheckIn from './pages/Check-in';
import Messages from "./modules/statusUpdates/Messages";

import NotFound from './pages/404';

import PrivateRoute from './components/PrivateRoute';

import DailyReport from './pages/attendance/DailyReport';
import LiveReport from './pages/attendance/LiveReport';
import AttendanceDashboard from './pages/attendance/Dashboard';
import TasksDashboard from './pages/tasks/Dashboard';
import ViewForms from './pages/forms/ViewForms';
import Entries from './pages/forms/Entries';
import Form from './pages/forms/Form';
import ViewCalendar from './pages/calendar/ViewCalendar';
import CreateEvent from "./pages/calendar/CreateEvent";
import {message} from "antd";
import IndividualReport from "./modules/statusUpdates/IndividualReport";
import Stats from "./pages/attendance/Stats";
import DailyStatusReport from './pages/status/DailyReport';
import StatusStats from "./pages/status/Stats";
import Password from "./pages/account/password";
import ChangePassword from "./pages/account/ChangePassword";
import Webspace from "./pages/webspace/Upload";

const cookies = new Cookies();

const LogoutPage = () => {
  cookies.remove('token');
  cookies.remove('refreshToken');
  cookies.remove('username');
  localStorage.clear();
  return <Redirect to="/login" />;
};

const redirectToTasksDashboard = () => {
  return <Redirect to="/tasks/dashboard" />;
};

const redirectToAttendanceDashboard = () => {
  return <Redirect to="/attendance/dashboard" />;
};

export default class App extends Component {
  render() {
    return (
      <HttpsRedirect>
        <Helmet>
          <title>amFOSS App</title>
        </Helmet>
        <BrowserRouter>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <Route path="/login" component={Login} />
            <PrivateRoute exact path="/logout" component={LogoutPage} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/update-profile" component={Edit} />
            <PrivateRoute exact path="/events/check-in" component={CheckIn} />

            <PrivateRoute
              exact
              path="/tasks"
              component={redirectToTasksDashboard}
            />
            <PrivateRoute
              exact
              path="/tasks/dashboard"
              component={TasksDashboard}
            />

            <PrivateRoute
              exact
              path="/attendance"
              component={redirectToAttendanceDashboard}
            />
            <PrivateRoute
              exact
              path="/attendance/dashboard"
              component={AttendanceDashboard}
            />
            <PrivateRoute
              exact
              path="/attendance/daily-report"
              component={DailyReport}
            />
            <PrivateRoute
              exact
              path="/attendance/live-report"
              component={LiveReport}
            />
            <PrivateRoute
              exact
              path="/attendance/attendance-stats"
              component={Stats}
            />
            <PrivateRoute
              exact
              path="/status-updates/messages"
              component={Messages}
            />
            <PrivateRoute
              exact
              path="/status-updates/individual-report"
              component={IndividualReport}
            />
            <PrivateRoute
              exact
              path="/status-updates/daily-report"
              component={DailyStatusReport}
            />
            <PrivateRoute
              exact
              path="/status-updates/status-stats"
              component={StatusStats}
            />

            <PrivateRoute
              exact
              path="/account/passwords"
              component={Password}
            />
            <PrivateRoute
              exact
              path="/account/change-password"
              component={ChangePassword}
            />
            <PrivateRoute
              exact
              path="/webspace/upload"
              component={Webspace}
            />

            <PrivateRoute exact path="/calendar/view-calendar" component={ViewCalendar} />
            <PrivateRoute exact path="/calendar/create-event" component={CreateEvent} />

            <PrivateRoute exact path="/form/view-forms" component={ViewForms} />
            <PrivateRoute exact path="/form/:formId(\d+)" component={Form} />
            <PrivateRoute exact path="/form/:formId/entries" component={Entries} />

            <PrivateRoute component={NotFound} />
          </Switch>
        </BrowserRouter>
      </HttpsRedirect>
    );
  }
}
