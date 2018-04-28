export default {
  oidc: {
    clientId: '0oaeton9tdjh6R4Ff0h7',
    issuer: 'https://dev-367150.oktapreview.com/oauth2/default',
    redirectUri: window.location.origin + '/implicit/callback',
    scope: 'openid profile email',
  },
  resourceServer: {
    api: 'http://localhost:8000/api'
  },
};
