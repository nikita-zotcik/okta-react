const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgUrl: 'https://dev-367150.oktapreview.com',
  token: '00JxB7iIlvk0dFguWukJsja2QtHTdOIHDOgGpXfD3m'
});

module.exports = client;