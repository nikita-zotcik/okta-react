import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import { checkAuthentication } from '../helpers';
import { Link } from 'react-router-dom'

export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null, userinfo: null };
    this.checkAuthentication = checkAuthentication.bind(this);
    this.login = this.login.bind(this);
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  async login() {
    this.props.auth.login('/');
  }

  render() {
    return (
      <div>
        {this.state.authenticated !== null &&
        <div>
          <Header textAlign='center' as="h1">Home page</Header>
          {this.state.authenticated &&
          <div>
            <p>Welcome back, {this.state.userinfo.name}!</p>
            <p>
              You have successfully authenticated against your Okta org, and have been redirected back to this
              application. You now have an ID token and access token in local storage.
              Visit the <Link to="/profile">My Profile</Link> page to take a look inside the ID token.
            </p>
          </div>
          }
        </div>
        }
      </div>
    );
  }
});
