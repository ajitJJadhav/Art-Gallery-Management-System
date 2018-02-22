var mysql = require('mysql');


var initialize = () => {
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "arvind@1234",
  database: "MiniProject"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});

  return con;
};

var queryResult = (con,query) => {

con.connect(function(err) {
  if (err) throw err;
  con.query(query, function (err, result, fields) {
    if (err) throw err;
  });
});

  return result;
};

module.exports = {
  initialize
};
