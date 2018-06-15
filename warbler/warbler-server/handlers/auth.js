const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function(req, res, next) {
  try {
    // finding a user
    let user = await db.User.findOne({
      email: req.body.email
    });
    let { id, username, profileImageUrl } = user;
    // cheching if his password matches what we sent to the server
    let isMatch = await user.comparePassword(req.body.password);
    // if it al matches
    if (isMatch) {
      let token = jwt.sign(
        {
          id,
          username,
          profileImageUrl
        },
        process.env.SECRET_KEY
      );
      // log them in
      return res.status(200).json({
        id,
        username,
        profileImageUrl,
        token
      });
    } else {
      return next({
        status: 400,
        message: "Invalid Email/Password."
      });
    }
  } catch (err) {
    return next(err);
  }
};

exports.signup = async function(req, res, next) {
  try {
    // create a user
    let user = await db.User.create(req.body);
    let { id, username, profileImageUrl } = user;
    // create a token (signin a token)
    let token = jwt.sign(
      {
        id,
        username,
        profileImageUrl
      },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token
    });
  } catch (err) {
    // see what kind of error
    // if it is a certain error
    // if a validation fails!
    if (err.code === 11000) {
      // respond with username/email already taken
      err.message = "Sorry, that username and/or email is taken";
    }
    // otherwise just send back a generic 400
    return next({
      status: 400,
      message: err.message
    });
  }
};
