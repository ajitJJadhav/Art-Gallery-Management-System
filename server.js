const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const mysql = require('./database/mysql');
const routes = require('./routes/index');

var app = express();

var con = mysql.initialize();
app.set('view engine', 'ejs');


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

app.use(express.static(__dirname + '/public'));

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
