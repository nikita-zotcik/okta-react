import React, { Component } from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { toast } from 'react-toastify';
import config from '../default-config';
import { Button, Divider, Form, Header } from 'semantic-ui-react';
import { checkAuthentication } from '../helpers';
import { withAuth } from '@okta/okta-react';

export default withAuth(class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.checkAuthentication = checkAuthentication.bind(this);
    this.state = {
      authenticated: null,
      username: '',
      password: '',
      sessionToken: null,
      isLoading: false,
      errors: {}
    };
    this.oktaAuth = new OktaAuth({ url: config.oidc.issuer.split('/oauth2')[0] });
  }

  async componentDidMount() {
    await this.checkAuthentication();
  }

  async componentDidUpdate() {
    if (this.state.authenticated) {
      this.props.history.push('/')
    }
  }

  onInputChange = ({ target: { value = '', name = '' } }) => {
    this.setState({
      [name]: value,
      errors: {...this.state.errors, [name]: false}
    });
  };

  handleSubmit = () => {
    const { username, password } = this.state;

    if (!username && !password) {
      toast('User Name and Password must be filled', {type: 'error'});
      return this.setState({ errors: { username: true, password: true } });
    }

    if (!username) {
      toast('User Name must be filled', {type: 'error'});
      return this.setState({ errors: { username: true } });
    }

    if (!password) {
      toast('Password must be filled', {type: 'error'});
      return this.setState({ errors: { password: true } });
    }

    this.setState({ isLoading: true });

    this.oktaAuth.signIn({
      username,
      password
    })
    .then((res) => {
      this.props.auth.redirect({ sessionToken: res.sessionToken });
      this.setState({
        sessionToken: res.sessionToken,
        isLoading: false
      });
    })
    .catch((err) => {
      this.setState({ isLoading: false });
      toast('Authentication failed', {type: 'error'});
    });
  };

  render() {
    const { errors } = this.state;
    return (
      <div className='login-page-container'>
        <Header textAlign='center' as='h1'>Login</Header>

        <Form loading={this.state.isLoading} className='login-form' size='small' widths='equal'>
          <Form.Field error={errors.username} onChange={this.onInputChange} label='User Name/Email' control='input'
                      placeholder='User name'
                      name='username'/>
          <Form.Field error={errors.password} onChange={this.onInputChange} label='Password' control='input'
                      placeholder='Password'
                      name='password' type='password'/>
          <Button fluid onClick={this.handleSubmit} type='submit'>Login</Button>
          <Divider hidden/>
        </Form>
      </div>
    );
  }
})

