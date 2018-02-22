
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const { matchedData } = require('express-validator/filter')

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
  res.render('artists', {
    pageTitle: 'View Artists',
    data: req.body,
    errors: errors.mapped()
  })

  const data = matchedData(req)
  console.log('Sanitized:', data)
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
  check('custName')
  .trim(),
  check('artStyle')
  .trim()

], (req, res) => {
  const errors = validationResult(req)
  res.render('artworks', {
    pageTitle: 'View Art Works',
    data: req.body,
    errors: errors.mapped()
  })

  const data = matchedData(req)
  console.log('Sanitized:', data)
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
  res.render('customers', {
    pageTitle: 'View Customers',
    data: req.body,
    errors: errors.mapped()
  })

  const data = matchedData(req)
  console.log('Sanitized:', data)
})


// /bad - send back json with errorMessage
router.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});


router.get('/add-element', (req, res) => {
  res.render('add-element', {
    pageTitle: 'Adding elements Page'
  });
});

router.get('/add-element/artwork', (req, res) => {
  res.render('add-artwork', {
    pageTitle: 'Add New Artwork',
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
  .withMessage('Age is required')
  .trim(),
  check('artistId')
  .isDecimal({ min:1 })
  .withMessage('Age is required')
  .trim(),
  check('custId')
  .isDecimal({ min:1 })
  .withMessage('Age is required')
  .trim(),
  check('artStyle')
  .isLength({ min: 1 })
  .withMessage('Artstyle is required')
  .trim()

], (req, res) => {
  const errors = validationResult(req)
  res.render('add-artwork', {
    pageTitle: 'Add New Artwork',
    data: req.body,
    errors: errors.mapped()
  })

  const data = matchedData(req)
  console.log('Sanitized:', data)
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
  res.render('add-artist', {
    pageTitle: 'Add New Artist',
    data: req.body,
    errors: errors.mapped()
  })

  const data = matchedData(req)
  console.log('Sanitized:', data)
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
  res.render('add-customer', {
    pageTitle: 'Add New Artist',
    data: req.body,
    errors: errors.mapped()
  })

  const data = matchedData(req)
  console.log('Sanitized:', data)
})


// /bad - send back json with errorMessage
router.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

module.exports = router;
