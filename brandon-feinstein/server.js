'use strict';
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let mongoose = require('mongoose');
let Ferrari = require(__dirname + '/models/ferrari-f1-drivers');
let Mercedes = require(__dirname + '/models/mercedes-f1-drivers');


let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db'
mongoose.connect(DB_PORT);

app.use(bodyParser.json());

app.get('/ferrari-drivers', (req, res) => {
  Ferrari.find({}, (err, fdrivers) => {
    res.json({data: fdrivers});
  })
})

app.get('/ferrari-drivers/:id', (req, res) => {
  Ferrari.findById(req.params.id, (err, fdriver) => {
    res.json(fdriver);
  })
})

app.post('/ferrari-drivers', (req, res) => {
  var newFdriver = new Ferrari(req.body);
  newFdriver.save((err, fdriver) => {
    res.json(fdriver);
  })
})

app.put('/ferrari-drivers/:id', (req, res) => {
  Ferrari.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, fdriver) => {
    res.json(fdriver);
    console.log(fdriver);
  })
})

app.delete('/ferrari-drivers/:id', (req, res) => {
  Ferrari.findById(req.params.id, (err, fdriver) => {
    if (err) res.json({err: 'errors'})
    fdriver.remove((err, fdriver) => {
      res.json({message: 'Ferrari driver removed'});
    })
  })
})

app.get('/ferr-mostwins', (req, res) => {
  Ferrari.find().sort({raceWins: -1}).limit(1).exec((err, fdrivers) => {
    // console.log(fdrivers);
    res.json({data: fdrivers});
  });
});

app.get('/mercedes-drivers', (req, res) => {
  Mercedes.find({}, (err, mdrivers) => {
    res.json({data: mdrivers});
  })
})

app.get('/mercedes-drivers/:id', (req, res) => {
  Mercedes.findById(req.params.id, (err, mdriver) => {
    res.json(mdriver);
  })
})

app.post('/mercedes-drivers', (req, res) => {
  var newMdriver = new Mercedes(req.body);
  newMdriver.save((err, mdriver) => {
    res.json(mdriver);
  })
})

app.put('/mercedes-drivers/:id', (req, res) => {
  Mercedes.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, mdriver) => {
    if (err) return res.send(err);
    res.json(mdriver);
  })
})

app.delete('/mercedes-drivers/:id', (req, res) => {
  Mercedes.findById(req.params.id, (err, mdriver) => {
    if (err) res.json({err: 'errors'})
    mdriver.remove((err, mdriver) => {
      res.json({message: 'Mercedes driver removed'});
    })
  })
})

app.get('/merc-mostwins', (req, res) => {
  Mercedes.find().sort({raceWins: -1}).limit(1).exec((err, mdrivers) => {
    // console.log(mdrivers);
    res.json({data: mdrivers});
  });
});

app.listen(3000, () => {
  console.log('server started')
})
