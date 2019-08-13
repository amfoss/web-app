import React from 'react';
import 'babel-polyfill';
import { Container, Row, Col } from 'react-grid';
import LoginForm from '../components/login/loginForm';
import Topbar from '../components/topbar.js';
import SEO from '../components/Seo';

class Login extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SEO title="Login"/>
        <Topbar />
        <div className="page-container">
          <Container>
            <Row>
              <Col md={4} lg={4}/>
              <Col md={6} lg={4} style={{ top: 150 }}>
                <LoginForm />
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
