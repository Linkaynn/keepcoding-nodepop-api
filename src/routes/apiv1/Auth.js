'use strict';
// Node imports
const express = require('express');
const { query, param, body } = require('express-validator');
// Own imports
const AuthCtrl = require('../../controllers/apiv1/Auth');

module.exports = () => {
  const router = express.Router();

  router.post(
    '/login/',
    [
      body('username')
        .isLength({
          min: 1,
          max: 30
        })
        .withMessage('debe estar entre 1 y 30 carácteres'),
      body('password')
        .isLength({
          min: 1,
          max: 100
        })
        .withMessage('debe estar entre 1 y 100 carácteres')
    ],
    AuthCtrl.login
  );

  router.post(
    '/register/',
    [
      body('username')
        .isLength({
          min: 1,
          max: 30
        })
        .withMessage('debe estar entre 1 y 30 carácteres'),
      body('password')
        .isLength({
          min: 1,
          max: 100
        })
        .withMessage('debe estar entre 1 y 100 carácteres')
    ],
    AuthCtrl.register
  );

  return router;
};
