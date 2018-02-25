
const express = require('express')
const router = express.Router()
const {queryResult} = require('../database/mysql')
const { check, validationResult } = require('express-validator/check')
const { matchedData } = require('express-validator/filter')
const mysql = require('../database/mysql');
const expect = require('expect')
const sql = require('mysql')

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

router.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

router.get('/artists', (req, res) => {
  res.render('artists', {
    pageTitle: 'View Artists',
    data: {},
    errors: {}
  });
});

router.post('/artists', [
  check('name')
  .trim(),
  check('artStyle')
  .trim()
], (req, res) => {
  const errors = validationResult(req)

  var data = matchedData(req)
  var query;
  console.log('Sanitized:', data)
//   if(data.name != '' && data.artStyle != ''){
// query = `select * from Artist where name = "${data.name}" and artStyle = "${data.artStyle}"`
//   }
//   else if( data.artStyle == '' && data.name != ''){
// query = `select * from Artist where name = "${data.name}"`
//   }
//   else if(data.artStyle != '' && data.name == ''){
// query = `select * from Artist where artStyle = "${data.artStyle}"`
//   }
//   else{
// query = `select * from Artist`
//   }
  if(data.name === '')
  {
    data.name = null;
  }
  if(data.artStyle === '')
  {
    data.artStyle = null;
  }

  query = sql.format("select * from Artist where (? is null or name = ?) and (? is null or artStyle = ?)",[data.name,data.name,data.artStyle,data.artStyle])
  if(isEmpty(errors.mapped()))
    {
      var callback = (result) =>
      {

        console.log(`returned : ${JSON.stringify(result,undefined,2)}`)
        // console.log(result == undefined)

        if (result == undefined)
        {
          console.log('Key constraints violated');
          res.redirect('/bad')
        }
        else {
          //res.redirect('/success');
          res.render('displayartist',{
            pageTitle: 'Display Artist Query Data',
            result: result,
            errors: errors.mapped()
          })
        }
      }
      var result = mysql.queryResult(query,callback)


    }

  else{
    res.render('artists', {
      pageTitle: 'View Artists',
      data: req.body,
      errors: errors.mapped()
    })

  }

})


router.get('/artworks', (req, res) => {
  res.render('artworks', {
    pageTitle: 'View Art-works',
    data: {},
    errors: {}
  });
});

router.post('/artworks', [
  check('name')
  .trim(),
  check('artistName')
  .trim(),
  check('artStyle')
  .trim()

], (req, res) => {
  const errors = validationResult(req)
  var data = matchedData(req)
  console.log('Sanitized:', data)
  if(data.name === '')
  {
    data.name = null;
  }
  if(data.artistName === '')
  {
    data.artistName = null;
  }
  if(data.artStyle === '')
  {
    data.artStyle = null;
  }
  var arr = [data.name,data.name,data.artStyle,data.artStyle,data.artistName,data.artistName];
  var query = sql.format("select title,artworkid,year,arttype,price,Artist.name as aname,Customer.name as owner from ArtWork,Artist,Customer where (? is null or title = ?) and (owner = Customer.custid) and (ArtWork.artistid = Artist.artistid) and (? is null or arttype = ?) and (? is null or ArtWork.artistid in (select Artist.artistid from Artist where name = ?))",arr)
  if(isEmpty(errors.mapped()))
    {
      var callback = (result) =>
      {

        console.log(`returned : ${JSON.stringify(result,undefined,2)}`)
        // console.log(result == undefined)

        if (result == undefined)
        {
          console.log('Key constraints violated');
          res.redirect('/bad')
        }
        else {
          // res.redirect('/success');
          res.render('displayartwork', {
            pageTitle:'Display Art Work Query Data',
            result: result,
            errors: errors.mapped()
          })
        }
      }
      var result = mysql.queryResult(query,callback)

    }

  else{
    res.render('artworks', {
      pageTitle: 'View Art Works',
      data: req.body,
      errors: errors.mapped()
    })

  }

})

router.get('/customers', (req, res) => {
  res.render('customers', {
    pageTitle: 'View customers',
    data: {},
    errors: {}
  });
});


router.post('/customers', [
  check('name')
  .trim()
], (req, res) => {
  const errors = validationResult(req)
  var data = matchedData(req)
  var query;
  console.log('Sanitized:', data)
  // if(data.name != ''){
  //   query = `select * from Customer where name = "${data.name}"  `
  // }
  // else{
  //   query = `select * from Customer`
  // }
  if (data.name === '')
  {
    data.name = null;
  }
  query = sql.format("select * from Customer where name = ?",[data.name]);
  if(isEmpty(errors.mapped()))
    {
      var callback = (result) =>
      {

        console.log(`returned : ${JSON.stringify(result,undefined,2)}`)
        // console.log(result == undefined)

        if (result == undefined)
        {
          console.log('Key constraints violated');
          res.redirect('/bad')
        }
        else {
          // res.redirect('/success');
          res.render('displaycustomer',{
            pageTitle: 'View Customers',
            result: result,
            errors: errors.mapped()
          })
        }
      }
      var result = mysql.queryResult(query,callback)

    }

  else{

    res.render('customers', {
      pageTitle: 'View Customers',
      data: req.body,
      errors: errors.mapped()
    })
  }

})





router.get('/add-element', (req, res) => {
  res.render('add-element', {
    pageTitle: 'Adding elements Page'
  });
});

router.get('/add-element/artwork', (req, res) => {
  res.render('add-artwork', {
    pageTitle: 'Add New ArtWork',
    data: {},
    errors: {}
  });
});

router.post('/add-element/artwork', [
  check('id')
  .isDecimal({ min:1 })
  .withMessage('That ID doesn‘t look right')
  .trim(),
  check('year')
  .isDecimal()
  .withMessage('That Year doesn‘t look right')
  .trim(),
  check('name')
  .isLength({ min: 1 })
  .withMessage('Name is required')
  .trim(),
  check('price')
  .isDecimal({ min:1 })
  .withMessage('Price is required')
  .trim(),
  check('artistId')
  .isDecimal({ min:1 })
  .withMessage('ID is required')
  .trim(),
  check('custId')
  .trim(),
  check('artStyle')
  .isLength({ min: 1 })
  .withMessage('Artstyle is required')
  .trim()

], (req, res) => {
  const errors = validationResult(req)
  const data = matchedData(req)
  if (data.custId === '')
  {
    data.custId=0
  }
  console.log('Sanitized:', data)

  if(isEmpty(errors.mapped()))
    {
      var callback = (result) =>
      {

        console.log(`returned : ${JSON.stringify(result,undefined,2)}`)
        // console.log(result == undefined)

        if (result == undefined)
        {
          console.log('Key constraints violated');
          res.redirect('/bad')
        }
        else {
          res.redirect('/success');
        }
      }
      console.log(data.custId)
      var result = mysql.queryResult(`INSERT INTO ArtWork VALUES (${data.id},${data.year},"${data.name}","${data.artStyle}",${data.price},${data.artistId},${data.custId})`,callback)

    }

  else{

    res.render('add-artwork', {
      pageTitle: 'Add New ArtWork',
      data: req.body,
      errors: errors.mapped()
    })
  }

})


router.get('/add-element/artist', (req, res) => {
  res.render('add-artist', {
    pageTitle: 'Add New Artist',
    data: {},
    errors: {}
  });
});

router.post('/add-element/artist', [
  check('name')
  .isLength({ min: 1 })
  .withMessage('Name is required')
  .trim(),
  check('birthPlace')
  .isLength({ min: 1 })
  .withMessage('Birth Place is required')
  .trim(),
  check('age')
  .isDecimal({ min:1 })
  .withMessage('Age is required')
  .trim(),
  check('artStyle')
  .isLength({ min: 1 })
  .withMessage('Artstyle is required')
  .trim(),
  check('id')
  .isDecimal({ min:1 })
  .withMessage('That ID doesn‘t look right')
  .trim()
], (req, res) => {
  const errors = validationResult(req)
  const data = matchedData(req)
  console.log('Sanitized:', data)

  if(isEmpty(errors.mapped()))
    {
      var callback = (result) =>
      {

        console.log(`returned : ${JSON.stringify(result,undefined,2)}`)
        // console.log(result == undefined)

        if (result == undefined)
        {
          console.log('Key constraints violated');
          res.redirect('/bad')
        }
        else {
          res.redirect('/success');
        }
      }
      var result = mysql.queryResult(`INSERT INTO Artist VALUES ("${data.name}","${data.birthPlace}",${data.age},"${data.artStyle}",${data.id})`,callback)

    }

  else{

    res.render('add-artist', {
      pageTitle: 'Add New Artist',
      data: req.body,
      errors: errors.mapped()
    })
  }

})

router.get('/add-element/customer', (req, res) => {
  res.render('add-customer', {
    pageTitle: 'Add New Customer',
    data: {},
    errors: {}
  });
});

router.post('/add-element/customer', [
  check('name')
  .isLength({ min: 1 })
  .withMessage('Name is required')
  .trim(),
  check('id')
  .isDecimal({ min:1 })
  .withMessage('That ID doesn‘t look right')
  .trim()
], (req, res) => {
  const errors = validationResult(req)

  const data = matchedData(req)
  console.log('Sanitized:', data)

  if(isEmpty(errors.mapped()))
    {
      var callback = (result) =>
      {

        console.log(`returned : ${JSON.stringify(result,undefined,2)}`)
        // console.log(result == undefined)

        if (result == undefined)
        {
          console.log('Key constraints violated');
          res.redirect('/bad')
        }
        else {
          res.redirect('/success');
        }
      }
      var result = mysql.queryResult(`INSERT INTO Customer VALUES (${data.id},"${data.name}",0)`,callback)

    }

  else {

    res.render('add-customer', {
      pageTitle: 'Add New Artist',
      data: req.body,
      errors: errors.mapped()
    })
  }
})

router.get('/transaction', (req, res) => {
  res.render('transaction', {
    pageTitle: 'Add New transaction',
    data: {},
    errors: {}
  });
});

router.post('/transaction', [
  check('custId')
  .isDecimal({ min:1 })
  .withMessage('That ID doesn‘t look right')
  .trim(),
  check('artistId')
  .isDecimal({ min:1 })
  .withMessage('That ID doesn‘t look right')
  .trim()
], (req, res) => {
  const errors = validationResult(req)

  const data = matchedData(req)
  console.log('Sanitized:', data)

    if(isEmpty(errors.mapped()))
      {
        var callback = (result) =>
        {

          console.log(`returned : ${JSON.stringify(result,undefined,2)}`)
          // console.log(result == undefined)

          if (result == undefined)
          {
            console.log('Key constraints violated');
            res.redirect('/bad')
          }
          else {
            res.redirect('/success');
          }
        }
        var result = mysql.queryResult(`update ArtWork set owner=${data.custId} where artworkid=${data.artistId}`,callback)

      }

  else {

    res.render('transaction', {
      pageTitle: 'Add New Transaction',
      data: req.body,
      errors: errors.mapped()
    })
  }
})

router.get('/info', (req,res) => {


  var callback = (result) =>
  {

    console.log(`returned : ${JSON.stringify(result,undefined,2)}`)
    // console.log(result == undefined)

    if (result == undefined)
    {
      console.log('Key constraints violated');
      res.redirect('/bad')
    }
    else {
      // res.redirect('/success');
       res.render('info',{
         pageTitle: 'General Information',
         result: result
       })
      //res.json(result)
    }
  }

  var result = []
  var highestSpendingCustomer = `select * from ArtWork where owner in (select custid from Customer where moneyspent = (select max(moneyspent) from Customer))`
  var noPaintingCustomers = `select name from Customer where custid not in (select distinct owner from ArtWork)`
  var customersWithAllStyles = `select name from Customer where custid in (select owner from ArtWork group by owner having count(distinct arttype) = (select count(distinct arttype) from ArtWork))`
  var customerWithThreePaintingsAbovePrice = ` select name from Customer where custid in (select owner from ArtWork where price > 350 group by owner having count(*) >= 3);`
  var artworksInCategoryWithHighestCount = `select * from ArtWork where ArtWork.arttype = (select ArtWork.arttype from ArtWork group by ArtWork.arttype order by count(*) desc limit 1)`
  var artworkOfArtStyleWithHighestAvgPrice = `select * from ArtWork where ArtWork.arttype = (select ArtWork.arttype from ArtWork group by ArtWork.arttype order by avg(ArtWork.price) desc limit 1)`


  result.push(highestSpendingCustomer);
  result.push(noPaintingCustomers);
  result.push(customersWithAllStyles);
  result.push(customerWithThreePaintingsAbovePrice);
  result.push(artworksInCategoryWithHighestCount);
  result.push(artworkOfArtStyleWithHighestAvgPrice);

  mysql.queryResultMultiple(result,callback)
})


// /bad - send back json with errorMessage
router.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Key constraints violated.Unable to handle request'
  });
});

router.get('/success', (req, res) => {
  res.send({
    Success: 'Data inserted successfully!!'
  });
});

module.exports = router;
