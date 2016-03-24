'use strict';
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let mongoose = require('mongoose');
let Users = require(__dirname + '/models/users');
// let Files = require(__dirname + '/models/files');
let auth = require('./lib/authenticate');


var PORT = process.env.PORT || 3000;

let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);

app.use(bodyParser.json());

app.get('/users', (req, res) => {
  Users.find({}, (err, users) => {
    res.json({data: users});
  });
});

app.get('/users/:id', (req, res) => {
  Users.findById(req.params.id, (err, user) => {
    res.json(user);
  });
});

app.post('/users', (req, res) => { //create new user
  var newUser = new Users(req.body);
  console.log(newUser);
  newUser.save((err, user) => {
    if (err) res.json({err: 'errors'});
    res.json(user);
  });
});

//curl -H "Content-Type: application/json" -X POST -d '{"name":"user1","password":"123"}' http://localhost:3000/users


app.put('/users/:id', (req, res) => {
  Users.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
    res.json(user);
    console.log(user);
  });
});

app.delete('/users/:id', (req, res) => {
  Users.findById(req.params.id, (err, user) => {
    if (err) res.json({err: 'errors'});
    user.remove((err, user) => {
      res.json({message: user + 'User removed'});
    });
  });
});

app.post('/login', (req, res) => {
  console.log(req.headers.authorization);
  let authorizationArray = req.headers.authorization.split(' ');
  let method = authorizationArray[0];
  let base64ed = authorizationArray[1];
  let authArray = new Buffer(base64ed, 'base64').toString().split(':');
  let name = authArray[0];
  let password = authArray[1];
  console.log(authArray);
  console.log(method);
  console.log(name);
  // parse based on basic or whatever method
  Users.findOne({name: name}, (err, user) => {
    console.log('in user find');
    if (err) res.json({err: 'errors'});
    let valid = user.compareHash(password);
    if (!valid) {
      return res.json({status: 'failure'});
    }
      // generate and return the token
    res.json({token: user.generateToken()});
  });
});

app.get('/login', auth);

// app.get('/files', (req, res) => {
//   Files.find({}, (err, files) => {
//     res.json({data: files});
//   });
// });
//
// app.get('/files/:id', (req, res) => {
//   Files.findById(req.params.id, (err, file) => {
//     res.json(file);
//   });
// });
//
// app.post('/files', (req, res) => {
//   var newFile = new Files(req.body);
//   newFile.save((err, file) => {
//     res.json(file);
//   });
// });
//
// app.put('/files/:id', (req, res) => {
//   Files.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, file) => {
//     if (err) return res.send(err);
//     res.json(file);
//   });
// });
//
// app.delete('/files/:id', (req, res) => {
//   Files.findById(req.params.id, (err, file) => {
//     if (err) res.json({err: 'errors'});
//     file.remove((err, file) => {
//       res.json({message: 'File removed'});
//     });
//   });
// });

app.listen(PORT, () => {
  console.log('server started');
});

// app.get('/ferr-mostwins', (req, res) => {
//   Ferrari.find().sort({raceWins: -1}).limit(1).exec((err, fdrivers) => {
//     // console.log(fdrivers);
//     res.json({data: fdrivers});
//   });
// });

// app.get('/merc-mostwins', (req, res) => {
//   Mercedes.find().sort({raceWins: -1}).limit(1).exec((err, mdrivers) => {
//     // console.log(mdrivers);
//     res.json({data: mdrivers});
//   });
// });
