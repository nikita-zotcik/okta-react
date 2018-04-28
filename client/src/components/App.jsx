import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import { Container } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';
import config from '../default-config';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Messages from './Messages';
import Navbar from './Navbar';
import Profile from './Profile';
import PasswordChange from './PasswordChange';

const authHandler = ({ history }) => history.push('/login');

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Security
            issuer={config.oidc.issuer}
            client_id={config.oidc.clientId}
            redirect_uri={config.oidc.redirectUri}
            onAuthRequired={authHandler}
          >
            <Navbar/>
            <ToastContainer autoClose={1500}/>
            <Container text style={{ paddingTop: '7em' }}>
              <Route path='/' exact component={Home}/>
              <Route path='/implicit/callback' component={ImplicitCallback}/>
              <Route path='/login' component={Login}/>
              <Route path='/signup' component={SignUp}/>
              <SecureRoute path='/messages' component={Messages}/>
              <SecureRoute path='/profile' component={Profile}/>
              <SecureRoute path='/change-password' component={PasswordChange}/>
            </Container>
          </Security>
        </Router>
      </div>
    );
  }
}

export default App;
