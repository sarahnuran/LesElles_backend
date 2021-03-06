var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
const mongoose = require('mongoose')
var port = process.env.PORT || 4000
require('dotenv').config();


app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

const mongoURI = 'mongodb+srv://LesElles:simplon@leselles-vvfzx.mongodb.net/test?retryWrites=true&w=majority'

mongoose
  .connect(
    mongoURI,
    { useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

var Users = require('./routes/Users')

app.use('/users', Users)

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})