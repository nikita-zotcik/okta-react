import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { Header, Icon, Message, Table } from 'semantic-ui-react';
import config from '../default-config';
import axios from 'axios';

export default withAuth(class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: null, failed: null };
  }

  componentDidMount() {
    this.getMessages();
  }

  async getMessages() {
    if (!this.state.messages) {
      const accessToken = await this.props.auth.getAccessToken();

      axios.get(`${config.resourceServer.api}/messages`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      .then((res) => {
        if (res.status !== 200) {
          this.setState({ failed: true });
          return;
        }
        const messages = res.data.messages.map((message, i) => {
          const date = new Date(message.date);
          const day = date.toLocaleDateString();
          const time = date.toLocaleTimeString();
          return {
            date: `${day} ${time}`,
            text: message.text,
            id: `message-${i}`,
          };
        });
        this.setState({ messages, failed: false });
      })
      .catch((e) => {
        this.setState({ failed: true });
        console.error('err', e)
      });
    }
  }

  render() {
    const possibleErrors = [
      'You\'ve downloaded one of our resource server examples, and it\'s running on port 8000.',
      'Your resource server example is using the same Okta authorization server (issuer) that you have configured this React application to use.',
    ];
    return (
      <div>
        <Header as='h1'><Icon name='mail outline'/> My Messages</Header>
        {this.state.failed === true &&
        <Message error header='Failed to fetch messages.  Please verify the following:' list={possibleErrors}/>}
        {this.state.failed === null && <p>Fetching Messages..</p>}
        {this.state.messages &&
        <div>
          <Table>
            <thead>
            <tr>
              <th>Date</th>
              <th>Message</th>
            </tr>
            </thead>
            <tbody>
            {this.state.messages.map(message => <tr id={message.id} key={message.id}>
              <td>{message.date}</td>
              <td>{message.text}</td>
            </tr>)}
            </tbody>
          </Table>
        </div>
        }
      </div>
    );
  }
});
