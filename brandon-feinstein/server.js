'use strict';
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let mongoose = require('mongoose');
let Users = require(__dirname + '/models/users');
let Files = require(__dirname + '/models/files');
let auth = require('./lib/authenticate');

process.env.SECRET = process.env.SECRET || 'change me';

var PORT = process.env.PORT || 3000;

// let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
let DB_PORT = 'mongodb://localhost/db';
mongoose.connect(DB_PORT);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use(bodyParser.json());

app.get('/users', (req, res) => {
  Users.find({}, (err, users) => {
    res.json({data: users});
  });
});

app.get('/users/:id', (req, res) => {
  Users.findById(req.params.id)
  .populate('files')
  .exec(function (err, user) {
    if (err) return console.log(err);
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

//curl -H "Content-Type: application/json" -X POST -d '{"name":"user2","password":"123"}' http://localhost:3000/users


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

//curl -X POST -u user2:123 http://localhost:3000/login

// app.get('/login', auth, (req, res) => {
//   res.json({decoded: req.decodedToken, msg: 'user logged in!'});
// });

// app.get('/login', (req, res) => {
//   res.json({decoded: req.decodedToken, msg: 'user logged in!'});
// });


//curl -X GET -H 'authorization: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NmY0MjQ1MTE4NTdkM2FmMGFkMDE0NzQiLCJpYXQiOjE0NTg4NDA2ODR9.rAqzohoKLAfFCA1FaW_W4CrPWqN2Q09_DoG1YdRqkDk' http://localhost:3000/login

app.get('/files', (req, res) => {
  Files.find({}, (err, files) => {
    res.json({data: files});
  });
});

app.get('/files/:id', (req, res) => {
  Files.findById(req.params.id)
    .populate('_creator')
    .exec(function (err, file) {
      if (err) return console.log(err);
      res.json(file);
    });
});

app.post('/files', (req, res) => {
  var newFile = new Files(req.body);
  // console.log(req.body);
  newFile.save((err, file) => {
    Users.findByIdAndUpdate(req.body._creator, {$push: {files: file._id}}, {new: true}, function(err, data){
      if (err) console.log(err);
      res.json(file);
    });
    // console.log(err);
  });
});

//curl -H "Content-Type: application/json" -X POST -d '{"_creator":56f424511857d3af0ad01474,"name":"file1","content":"Hello World!"}' http://localhost:3000/files

app.put('/files/:id', (req, res) => {
  Files.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, file) => {
    if (err) return res.send(err);
    res.json(file);
  });
});

app.delete('/files/:id', (req, res) => {
  Files.findById(req.params.id, (err, file) => {
    if (err) res.json({err: 'errors'});
    file.remove((err, file) => {
      res.json({message: 'File removed'});
    });
  });
});

app.listen(PORT, () => {
  console.log('server started 3000');
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
