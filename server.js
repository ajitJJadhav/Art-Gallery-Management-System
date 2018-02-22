const express = require('express');
const path = require('path')
const ejs = require('ejs');
const fs = require('fs');
const mysql = require('./database/mysql');
const routes = require('./routes/index');

const layout = require('express-layout')
const bodyParser = require('body-parser')
const validator = require('express-validator')

var app = express();

var con = mysql.initialize();
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const middlewares = [
  validator(),
  express.static(path.join(__dirname, 'public')),
  bodyParser.urlencoded()
]
app.use(middlewares)


app.use('/', routes);

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });


app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
