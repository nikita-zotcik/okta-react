import React, { Component } from 'react';
import OktaAuth from '@okta/okta-auth-js';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../default-config';
import { Button, Divider, Form, Header } from 'semantic-ui-react';
import { checkAuthentication } from '../helpers';
import { withAuth } from '@okta/okta-react';

const fields = ['email', 'firstName', 'lastName', 'password'];

export default withAuth(class SignUp extends Component {
  constructor(props) {
    super(props);
    this.checkAuthentication = checkAuthentication.bind(this);
    this.state = {
      authenticated: null,
      sessionToken: null,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
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
      errors: { ...this.state.errors, [name]: false }
    });
  };

  handleSubmit = () => {
    const { email, firstName, lastName, password } = this.state;
    let error;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const errors = {};
    for (let item of fields) {
      if (!this.state[item]) {
        errors[item] = true;
        let fieldName = item[0].toUpperCase() + item.split(/(?=[A-Z])/).join(' ').slice(1);
        toast(`${fieldName} is required`, { type: 'error' });
        error = true;
      } else if (item === 'email' && !re.test(this.state[item])) {
        errors[item] = true;
        toast('Email does not match required pattern', { type: 'error' });
        error = true;
      } else {
        errors[item] = false;
      }

      this.setState({ errors })
    }

    if (error) return;

    this.setState({ isLoading: true });
    axios.post(`${config.resourceServer.api}/users`, {
      email, password, firstName, lastName
    })
    .then(() => {
      this.oktaAuth.signIn({
        username: email,
        password
      })
      .then((res) => {
        this.props.auth.redirect({ sessionToken: res.sessionToken });
        this.setState({
          isLoading: false
        });
      });
    })
    .catch((e) => {
      this.setState({ isLoading: false });
      if (e.response.status === 400) {
        for (let i of e.response.data.errorCauses) {
          if (i.errorSummary.includes('login:')) {
            toast('Email already exists', {type: 'error'})
          }
          if (i.errorSummary.includes('Password')) {
            toast(i.errorSummary, {type: 'error', autoClose: 8000})
          }
        }
      }
    })
  };

  render() {
    const { errors } = this.state;
    return (
      <div className='sign-up-page-container'>
        <Header textAlign='center' as='h1'>Registration</Header>
        <Form loading={this.state.isLoading} size='small' widths='equal'>
          <Form.Field error={errors.firstName} onChange={this.onInputChange} label='First Name' control='input'
                      placeholder='First Name'
                      name='firstName'/>
          <Form.Field error={errors.lastName} onChange={this.onInputChange} label='Last Name' control='input'
                      placeholder='Last Name'
                      name='lastName'/>
          <Form.Field error={errors.email} onChange={this.onInputChange} label='Email' control='input'
                      placeholder='Email'
                      name='email'/>
          <Form.Field error={errors.password} onChange={this.onInputChange} label='Password' control='input'
                      placeholder='Password'
                      name='password' type='password'/>
          <Button loading={this.state.isLoading} fluid onClick={this.handleSubmit} type='submit'>Register</Button>
          <Divider hidden/>
        </Form>
      </div>
    );
  }
})

