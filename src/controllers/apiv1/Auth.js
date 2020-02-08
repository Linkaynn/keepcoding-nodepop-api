'use strict';
// Own imports
const { validationResult } = require('express-validator');
// Node imports
const User = require('../../models/User');
const Log = require('../../utils/log');

const ctrl = {};

ctrl.login = async (req, res, next) => {
  try {
    // Validaciones
    validationResult(req).throw();
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      throw Error('User not found');
    }

    const user = await User.login(username, password);
    if (user) {
      req.session.user = user;

      res.json({
        success: true
      });
      return;
    }
    // Si llegamos aquí es que no se ha encontrado un resultado
    throw Error('User not found');
  } catch (error) {
    // Los errores de validación de usuario NO me interesa loguerarlos
    if (!error.array) Log.fatal(`Error incontrolado: ${error}`);
    next(error);
  }
};

ctrl.register = async (req, res, next) => {
  try {
    // Validaciones
    validationResult(req).throw();
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      if (!username || !password) {
        throw Error('No username or password send');
      }
    }

    const exist = await User.exists(username);

    if (exist) {
      throw Error('Username already taken');
    }

    const user = await User.register({ username, password });
    if (user) {
      res.json({
        success: true
      });
      return;
    }

    throw Error('User not registered');
  } catch (error) {
    // Los errores de validación de usuario NO me interesa loguerarlos
    if (!error.array) Log.fatal(`Error incontrolado: ${error}`);
    next(error);
  }
};

ctrl.tags = async (req, res, next) => {
  try {
    // Listado
    let results = await User.find().distinct('tags');
    if (results) {
      res.json({
        success: true,
        count: results.length,
        results: results
      });
      return;
    }
    // Si llegamos aquí es que no se ha encontrado un resultado
    next({ status: 404, error: 'Not Found' });
  } catch (error) {
    // Los errores de validación de usuario NO me interesa loguerarlos
    if (!error.array) Log.fatal(`Error incontrolado: ${error}`);
    next(error);
  }
};

module.exports = ctrl;
