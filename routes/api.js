const express = require('express');
const router = express.Router();
const pageControllers = require('../controllers/pageControllers');

router.get('/', pageControllers.homePage);
// router.get('/about', pageControllers.aboutPage);
// router.get('/contact', pageControllers.contactPage);
// router.get('/gallery', pageControllers.galleryPage);

module.exports = router;