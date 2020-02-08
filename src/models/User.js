'use strict';
// Node imports
const mongoose = require('mongoose');
const { Schema } = mongoose;
// Own imports
const log = require('../utils/log');

/**
 * Anuncio en nodepop
 */
const UserSchema = new Schema(
  {
    username: { type: String, required: true, max: 30, index: true },
    password: { type: String, max: 100 }
  },
  {
    timestamps: true
  }
);

UserSchema.statics.login = async function(username, password) {
  try {
    const user = await User.findOne({ username });

    return user && user.password === password;
  } catch (error) {
    // Error no controlado
    log.fatal('Usuario no encontrado');
    log.fatal(error);
  }
};

UserSchema.statics.exists = async function(username) {
  try {
    return !!(await User.findOne({ username }));
  } catch (error) {
    // Error no controlado
    log.fatal('Usuario no encontrado');
    log.fatal(error);
  }
};

UserSchema.statics.register = async function(user) {
  try {
    // The password must be encrypted, due educational porpoise and CPU usage we do not encrypt it
    return await User({
      username: user.username,
      password: user.password
    }).save();
  } catch (error) {
    // Error no controlado
    log.fatal('Error insertando usuario.');
    log.fatal(error);
  }
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
