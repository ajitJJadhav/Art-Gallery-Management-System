
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
    pageTitle: 'View Artists'
  });
});

router.get('/artworks', (req, res) => {
  res.render('artworks', {
    pageTitle: 'View Art-works'
  });
});

router.get('/customers', (req, res) => {
  res.render('customers', {
    pageTitle: 'View customers'
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

router.post('/contact', [
  check('message')
    .isLength({ min: 1 })
    .withMessage('Message is required')
    .trim(),
  check('email')
    .isEmail()
    .withMessage('That email doesn‘t look right')
    .trim()
    .normalizeEmail()
], (req, res) => {
  const errors = validationResult(req)
  res.render('contact', {
    data: req.body,
    errors: errors.mapped()
  })

  const data = matchedData(req)
  console.log('Sanitized:', data)
})

router.get('/add-element/artist', (req, res) => {
  res.render('add-artist', {
    pageTitle: 'Add New Artist'
  });
});

router.get('/add-element/customer', (req, res) => {
  res.render('add-customer', {
    pageTitle: 'Add New Customer'
  });
});

// /bad - send back json with errorMessage
router.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

module.exports = router;
