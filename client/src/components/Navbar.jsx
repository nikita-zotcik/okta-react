import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { Container, Icon, Image, Menu } from 'semantic-ui-react';
import { checkAuthentication } from '../helpers';
import { Link, Redirect } from 'react-router-dom';

export default withAuth(class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = checkAuthentication.bind(this);
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

  async logout() {
    await this.checkAuthentication();
    if (this.state.authenticated) {
      this.props.auth.logout('/login');
    }
  }

  render() {
    return (
      <div>
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item as={Link} header to='/'>
              <Image size='mini' src='/react.svg'/>
              &nbsp;
              Okta-React-Node
            </Menu.Item>
            {this.state.authenticated === true &&
            <Menu.Item id='messages-button' as={Link} to='/messages'><Icon name='mail outline'/>Messages</Menu.Item>}
            {this.state.authenticated === true &&
            <Menu.Item id='profile-button' as={Link} to='/profile'>Profile</Menu.Item>}
            {this.state.authenticated === true &&
            <Menu.Item id='profile-button' as={Link} to='/change-password'>Password Change</Menu.Item>}
            {this.state.authenticated === true &&
            <Menu.Item id='logout-button' as='a' onClick={() => this.logout()}>Logout</Menu.Item>}
            {this.state.authenticated === false && <Menu.Item as='a' onClick={() => this.login()}>Login</Menu.Item>}
            {this.state.authenticated === false && <Menu.Item as={Link} to='/signup'>Registration</Menu.Item>}
          </Container>
        </Menu>
      </div>
    );
  }
});
