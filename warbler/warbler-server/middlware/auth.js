require("dotenv").load();
const jwt = require("jsonwebtoken");

// make sure the user is logged - Authentication
exports.loginRequired = function(req, res, next) {
  try {
    // get token from header > authorization: Bearer reuwqio2313281432oiewur
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if (decoded) {
        return next();
      } else {
        return next({
          status: 401,
          message: "Please log in first"
        });
      }
    });
  } catch (err) {
    return next(err);
  }
};

// make sure we get the correct user - Authorization
exports.ensureCorrectUser = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ");
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      // ensure that the loged in user's id is the same as the user's id from params to create the message
      if (decoded && decoded.id === req.params.id) {
        return next();
      } else {
        return next({
          status: 401,
          message: "Unauthorized"
        });
      }
    });
  } catch (error) {
    return next({
      status: 401,
      message: "Unauthorized"
    });
  }
};
