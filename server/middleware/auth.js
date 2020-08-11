const { User } = require('../models/User');

let auth = (req, res, next) => {
  let token = req.cookies.w_auth; // Current browser token

  // Checking if the user is logged in (has a valid token)

  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true
      });

    req.token = token;
    req.user = user; // to be used in logout
    next();
  });
};

module.exports = { auth };
