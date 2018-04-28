const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const {api} = require('./api/router');
const PORT = process.env.PORT || 5000;
const app = express();
const clientDist = path.join(__dirname + '/client/build/');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(clientDist));

app.use('/api', api);

app.listen(PORT, () => {
  console.log(`Resource Server Ready on port ${PORT}`);
});
