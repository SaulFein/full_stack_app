const mongoose = require('mongoose');

const ferrariSchema = new mongoose.Schema({
  name: String,
  raceWins: Number,
  team: {type: String, default: 'Ferrari'}
});

module.exports = mongoose.model('Ferrari', ferrariSchema);

//curl -H "Content-Type: application/json" -X POST -d '{"username":"xyz","password":"xyz"}' http://localhost:3000/api/login
// '{"name":"Kimi Raikkonen", "raceWins":20}' '{"name":"Sebastian Vettel", "raceWins":42}'


//curl -X POST -d '{"name":"Kimi Raikkonen", "raceWins":"20"}' http://localhost:3000/ferrari-drivers
