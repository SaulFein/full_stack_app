const mongoose = require('mongoose');

const mercedesSchema = new mongoose.Schema({
  name: String,
  raceWins: Number,
  team: {type: String, default: 'Mercedes'}
});

module.exports = mongoose.model('Mercedes', mercedesSchema);

//curl -H "Content-Type: application/json" -X POST -d '{"username":"xyz","password":"xyz"}' http://localhost:3000/api/login
// '{"name":"Kimi Raikkonen", "raceWins":20}' '{"name":"Sebastian Vettel", "raceWins":42}'
