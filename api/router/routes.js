const express = require('express');
const router = express.Router();
const oktaClient = require('../../oktaClient');

const { authentication } = require('../middleware');

router.post('/users', (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const { firstName, lastName, email, password } = req.body;

  const newUser = {
    profile: {
      firstName,
      lastName,
      email,
      login: email
    },
    credentials: {
      password: {
        value: password
      }
    }
  };
  oktaClient.createUser(newUser)
  .then((user) => {
    res.status(201);
    res.send(user);
  })
  .catch((err) => {
    res.status(400);
    res.send(err);
  })
});

router.post('/change_password', authentication, (req, res) => {
  const { newPassword, oldPassword, userId } = req.body;
  if (!newPassword && !oldPassword && !userId) return res.sendStatus(400);

  const password = {
    oldPassword: { value: oldPassword },
    newPassword: { value: newPassword }
  };
  oktaClient.changePassword(userId, password)
  .then((pass) => {
    console.log(pass);
    res.status(200);
    res.send(pass);
  })
  .catch((err) => {
    res.status(400);
    res.send(err);
  })
});

router.get('/messages', authentication, (req, res) => {
  res.json({
    messages: [
      {
        date: new Date(),
        text: 'I am a robot.'
      },
      {
        date: new Date(new Date().getTime() - 1000 * 60 * 60),
        text: 'Hello, world!'
      }
    ]
  });
});

module.exports = router;