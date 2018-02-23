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

};

var queryResult = (query) => {

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "arvind@1234",
    database: "MiniProject"
  });

  con.connect(function(err) {
    if (err) throw err;
    con.query(query, function (err, result, fields) {
      if (err) throw err;
       console.log(result);
      return result;
    });
  });

}

module.exports = {
  initialize,
  queryResult
};
