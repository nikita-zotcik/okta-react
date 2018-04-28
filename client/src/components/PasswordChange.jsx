import React, { Component } from 'react';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import '@okta/okta-signin-widget/dist/css/okta-theme.css';
import OktaAuth from '@okta/okta-auth-js';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../default-config';
import { Button, Divider, Form } from 'semantic-ui-react';
import { withAuth } from '@okta/okta-react';

export default withAuth(class PasswordChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      user: null,
      isLoading: false
    };
    this.oktaAuth = new OktaAuth({ url: config.oidc.issuer.split('/oauth2')[0] });
  }

  async componentDidMount() {
    this.getCurrentUser();
  }

  async getCurrentUser() {
    this.props.auth.getUser().then(user => this.setState({ user }));
  }

  onInputChange = ({ target: { value = '', name = '' } }) => {
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async () => {
    const { oldPassword, newPassword } = this.state;
    const data = {
      userId: this.state.user.sub,
      oldPassword,
      newPassword
    };
    this.setState({ isLoading: true });
    const accessToken = await this.props.auth.getAccessToken();

    axios.post(`${config.resourceServer.api}/change_password`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
    .then((res) => {
      if (res.status === 200) {
        toast('Password successfully changed', { type: 'success' })
      }
      this.setState({
        isLoading: false, oldPassword: '',
        newPassword: ''
      });
    })
    .catch((e) => {
      this.setState({ isLoading: false });
      if (e.response.status === 400) {
        for (let i of e.response.data.errorCauses) {
          if (i.errorSummary.includes('Password')) {
            toast(i.errorSummary, {type: 'error', autoClose: 8000})
          }
        }
      }
    })
  };

  render() {
    return (
      <div className='sign-up-page-container'>
        <Form loading={this.state.isLoading} size='small' widths='equal'>
          <Form.Field value={this.state.oldPassword} onChange={this.onInputChange} label='Old Password' control='input' placeholder='Old Password'
                      name='oldPassword' type='password'/>
          <Form.Field value={this.state.newPassword} onChange={this.onInputChange} label='New Password' control='input' placeholder='New Password'
                      name='newPassword' type='password'/>
          <Button loading={this.state.isLoading} fluid onClick={this.handleSubmit} type='submit'>Send</Button>
          <Divider hidden/>
        </Form>
      </div>
    );
  }
})

