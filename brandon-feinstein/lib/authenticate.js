var jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  var decoded;
  try {
    // header from Authorization: token myToken
    console.log('hello ' + req.headers.authorization);
    var token = req.headers.authorization;
    decoded = jwt.verify(token, process.env.SECRET || 'CHANGE ME');
    console.log("decoded: " + decoded);
    req.decodedToken = decoded;
    next();
  }
  catch (e) {
    console.log(req.headers);
    console.log(e);
    return res.status(418).json({msg: 'authentication failed'});
  }

};
