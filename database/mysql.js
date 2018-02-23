var mysql = require('mysql');


var initialize = () => {
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "smi-3-902",
  database: "dbms_mini1"
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
    password: "smi-3-902",
    database: "dbms_mini1"
  });

  con.connect(function(err) {
    if (err) throw err;
    con.query(query, function (err, result, fields) {
      if (err) return err;
      
      return result;
    });
  });

}

module.exports = {
  initialize,
  queryResult
};
