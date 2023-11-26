const express = require('express');
const router = express.Router();
const db = require('../server/database');

const homePage = (req, res) => {
    const q = "SELECT * FROM users"
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json({data})
    }
  });
};

router.get('/about', (req, res) => {
    res.send('About Page');
});

router.get('/contact', (req, res) => {
    res.send('Contact Page');
});

router.get('/gallery', (req, res) => {
    res.send('Gallery Page');
});

module.exports = {
    homePage
    // aboutPage,
    // contactPage,
    // galleryPage
};