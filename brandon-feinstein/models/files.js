const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: String,
  content: String
});

module.exports = mongoose.model('Files', fileSchema);

//curl -H "Content-Type: application/json" -X POST -d '{"username":"xyz","password":"xyz"}' http://localhost:3000/api/login
// '{"name":"Kimi Raikkonen", "raceWins":20}' '{"name":"Sebastian Vettel", "raceWins":42}'
