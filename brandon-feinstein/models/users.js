'use strict';
const mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {type: String, unique: true},
  authentication: {
    email: String,
    password: String
  },
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Files' }]
});

userSchema.pre('save', function(next) {
  console.log(this.password);
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  next();
});
//userSchema.method.hashPassword
userSchema.methods.compareHash = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateToken = function() {
  return jwt.sign({_id: this._id}, process.env.SECRET || 'change me');
};

module.exports = exports = mongoose.model('User', userSchema);

//curl -H "Content-Type: application/json" -X POST -d '{"username":"xyz","password":"xyz"}' http://localhost:3000/api/login
// '{"name":"Kimi Raikkonen", "raceWins":20}' '{"name":"Sebastian Vettel", "raceWins":42}'


//curl -X POST -d '{"name":"Kimi Raikkonen", "raceWins":"20"}' http://localhost:3000/ferrari-drivers
