// This page is responsible for routing the server

const express = require('express');

const router = express.Router();
const DatabaseInfo = require('../models/database');

// The page is expecting post request since the user will give the page some information
router.post('/register', (request, response) => {
  const UserInfo = new DatabaseInfo({
    // this is where this method will grab a user's information and make
    //  sure it does before the user can submit
    name: request.body.name,
    userName: request.body.userName,
    password: request.body.password,
  });
  UserInfo.save()
    .then((info) => {
      response.json(info);
    })
    .catch((error) => {
      response.json(error);
    });
});

module.exports = router;
