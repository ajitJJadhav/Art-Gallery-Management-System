const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

router.get('/artists', (req, res) => {
  res.render('artists.hbs', {
    pageTitle: 'View Artists'
  });
});

router.get('/artworks', (req, res) => {
  res.render('artworks.hbs', {
    pageTitle: 'View Art-works'
  });
});

router.get('/customers', (req, res) => {
  res.render('customers.hbs', {
    pageTitle: 'View customers'
  });
});

router.get('/add-element', (req, res) => {
  res.render('add-element.hbs', {
    pageTitle: 'Adding elements Page'
  });
});

router.get('/add-element/artwork', (req, res) => {
  res.render('add-artwork.hbs', {
    pageTitle: 'Add New Artwork'
  });
});

router.get('/add-element/artist', (req, res) => {
  res.render('add-artist.hbs', {
    pageTitle: 'Add New Artist'
  });
});

router.get('/add-element/customer', (req, res) => {
  res.render('add-customer.hbs', {
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
