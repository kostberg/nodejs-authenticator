let jwt = require('jsonwebtoken');

let checkToken = (req, res, next) => {
  let token = req.body.token

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(400).json({
          error: 'Token is not valid'
        });
        return
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(400).json({
      error: 'Auth token is not supplied'
    });
    return
  }
};

module.exports = {
  checkToken: checkToken
}