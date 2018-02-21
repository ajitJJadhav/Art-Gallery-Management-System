const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const mysql = require('./database/mysql');
const routes = require('./routes/index');

var app = express();

mysql.initialize();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


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

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});



app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
