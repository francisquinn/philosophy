const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = fs.readFileSync('jwtRS256.key');

const login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (user == null) {
        res.status(400).send({ staus: 400, message: "user not found" });
        return;
      }
      // check password
      validatePassword(password, user.password)
        .then(result => {
          if (!result) {
            res.status(400).send({ staus: 400, message: "user not found" });
            return;
          }
          // sign JWT token
          const token = jwt.sign(
            { id: user._id }, 
            privateKey,
            { algorithm: 'RS256', expiresIn: '1h' });

            if (!token) {
              res.status(400).send({ staus: 400, message: "authenication error" });
              return;
            }

            res.status(200).send({ status: 200, message: "login successful!", token: token });
           
        });
    })
    .catch((err) => console.log(err));
};

const register = (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const regVal = registerValidation(firstName, lastName, username, email, password);
  
  if (regVal.status == 400) {
    res.status(400).send({ status: 400, message: regVal.message });
    return;
  }

  hashPassword(password)
    .then(hash => {
      User.create({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: hash,
      }).then(res.status(200).send({ status: 200, message: regVal.message }))
        .catch((err) => console.log(err));
    })
};

// server form validation for the registration
const registerValidation = (firstName, lastName, username, email, password) => {
  if (firstName.length < 2) {
    return { status: 400, message: "first name must be longer than 2 characters" };
  }

  if (lastName.length < 2) {
    return { status: 400, message: "last name must be longer than 2 characters" };
  }

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
  User.findById(res.locals.user)
    .then((user) => {
      res.status(200).send({ username: user.username });
    })
    .catch((err) => console.log(err))
};

module.exports = {
  login,
  register,
  getUserInfo
};
