const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = fs.readFileSync('jwtRS256.key');

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      return handleError(err);
    }
    if (user == null) {
      res.status(400).send({ message: "user not found" });
      return;
    }

    //check password
    validatePassword(password, user.password)
      .then((result) => {
        if (!result) {
          res.status(400).send({ message: "invalid password" });
          return;
        }
        // sign JWT token
        const token = jwt.sign(
          { id: user._id, username: user.username },
          privateKey,
          { algorithm: 'RS256' }
        );

        if (!token) {
          res.status(400).send({ message: "authenication error" });
          return;
        }

        res.cookie('token', token, {
          httpOnly: true,
          secure: false,
          expires: new Date(Date.now() + 90000000),
        });

        res.status(200).send({ message: "login successful!" });
      });
  });
};

const register = (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const regVal = registerValidation(username, email, password);
  
  if (regVal.status == 400) {
    return res.status(400).send({ status: 400, message: regVal.message });
  }

  hashPassword(password)
    .then(hash => {
      User.create({
        username: username,
        email: email,
        password: hash,
      }).then(res.status(200).send({ message: regVal.message }))
        .catch((err) => console.log(err));
    })
};

// server form validation for the registration
const registerValidation = (username, email, password) => {
  if (username.length <= 2) {
    return { status: 400, message: "username must be longer than 2 characters" };
  }

  if (!email.match(/\S+@\S+\.\S+/)) {
    return { status: 400, message: "invalid email format" };
  }

  if (!password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*., ?]).{6,}/ )) {
    return { status: 400, message: "invalid password format" };
  }

  // Send back status 200 with success message
  return { status: 200, message: "Reg success" };
};

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

const validatePassword = async (password, hash) => {
  const check = await bcrypt.compare(password, hash);
  return check;
};

const getUserInfo = (req, res) => {
  User.findById(res.locals.user.id, (err, user) => {
    if (err) return handleError(err);
    return res.status(200).send({ username: user.username });
  });
};

const logout = (req, res) => {
  res.cookie('token', '', { maxAge: 1 });
  res.status(302).send({ message: 'logout successful' });
};

module.exports = {
  login,
  register,
  getUserInfo,
  logout,
};
