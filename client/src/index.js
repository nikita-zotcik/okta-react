import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './assets/index.css';

/* global document */
/* eslint-disable react/jsx-filename-extension */
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
