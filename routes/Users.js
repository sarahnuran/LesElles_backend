const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
jwt_secret = process.env.JWT_SECRET_KEY;


const User = require('../models/User')
users.use(cors())

process.env.SECRET_KEY = 'secret'

// Load Input Validation
const validateRegister = require("../validation/validateRegister");

// Load Login Validation
const validateLogin = require("../validation/validateLogin");

// Route POST users/register
users.post("/register", (req, res) => {
  const { errors, isValid } = validateRegister(req.body);

  // Check Validation
  if (!isValid) {
    res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }) // Search for a email in the DB
    .then(user => {
      if (user) {
        // If exists an user with that email return an error

        errors.email = "Email déjà existant";
        return res.status(400).json(errors);
      } else {

        // Else, create a new user
        const today = new Date()
        const newUser = new User({
          avatar_color: Math.floor(Math.random() * 18) + 1,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: req.body.password,
          created_at: today,
        });

          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                res.status(201).json({ user });
              })
              .catch((err) => {
                res.status(400).json({ error: err });
              });
          });
        
      }
    });
});

// Route POST users/login

users.post('/login', (req, res) => {
  const { errors, isValid } = validateLogin(req.body);

  // Check Validation
  if (!isValid) {
    res.status(400).json(errors);
  }
  // Find user by email
  User.findOne({ email: req.body.email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = "Utilisateur non trouvé";
      return res.status(404).json(errors);
    }

    // Check password
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: 'Echec authentification'
        });
      }
      if (result) {
        // User Matched

        const payload = {
          avatar_color: user.avatar_color,
          created_at: user.created_at,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          userId: user._id
        }; // Create JWT payload

        // Sign Token
        const token = jwt.sign(
          // When user log in, the backend creates a signed token and returns it in response
          payload,
          jwt_secret,
          { expiresIn: '24h' }
        )
        return res.status(200).json({
          message: 'Authorisation fait avec succes.',
          token
          
        });
      } 
      return res.status(401).json({
        password: 'Erreur mot de passe. Réessayez.'
      });
    });
  }).catch(err => {
          res.send('error: ' + err)
        })
});














// users.get('/All', (req, res) =>{
//   User.find({}, function(err,data){
//     if (err)
//       res.status(400).json({ error: 'No users' });
//     else
//       res.status(200).json(data);
// });
// });

// users.get('/userbyid', (req, res) =>{
//   User.findOne({_id: req.body.id}, function(err,data){
//     if (err)
//         res.send(err);
//             else
//                 res.json(data);
// });
// });




// users.get('/profile', (req, res) => {
  
//   var decoded = jwt.verify(req.headers['Authorization'], process.env.SECRET_KEY, (req, res) => {
//     User.findOne({
//     _id: decoded._id
//   })
//     .then(user => {
//       if (user) {
//         res.json(user)
//       } else {
//         res.send('User does not exist')
//       }
//     })
//     .catch(err => {
//       res.send('error: ' + err)
//     })
// })
//   })

  





module.exports = users