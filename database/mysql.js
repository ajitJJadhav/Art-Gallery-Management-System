var mysql = require('mysql');
const express = require('express')

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

var queryResult = (query,callback) => {

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "arvind@1234",
    database: "MiniProject"
  });

  con.connect(function(err) {
    //if (err) return err;
    result = con.query(query, function (err, result, fields) {
      //if (err) return err;
      console.log(result)
      callback(result);
    });
  });

}

var queryResultMultiple = (query,callback) => {

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "arvind@1234",
    database: "MiniProject"
  });


  var resultList = [];
  console.log(query[0])
  con.connect(function(err) {
    //if (err) return err;
    con.query(query[0], function (err, result, fields) {
      //if (err) return err;
      resultList.push(result);
      con.query(query[1], function (err, result, fields) {
        //if (err) return err;
        resultList.push(result);

        con.query(query[2], function (err, result, fields) {
          //if (err) return err;
          resultList.push(result);
          con.query(query[3], function (err, result, fields) {
            //if (err) return err;
            resultList.push(result);
            con.query(query[4], function (err, result, fields) {
              //if (err) return err;
              resultList.push(result);
              con.query(query[5], function (err, result, fields) {
                //if (err) return err;
                resultList.push(result);
                con.query(query[6], function (err, result, fields) {
                  //if (err) return err;
                  resultList.push(result);
                  console.log(resultList)
                  callback(resultList)
                });
              });
            });
          });
        });
      });
    });
  });


}

module.exports = {
  initialize,
  queryResult,
  queryResultMultiple
};
