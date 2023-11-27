const express = require('express');
const router = express.Router();
const pageControllers = require('../controllers/pageControllers');

router.get('/', pageControllers.homePage);
router.post('/contact', pageControllers.contactPage);
// router.get('/about', pageControllers.aboutPage);
// router.post('/contact', pageControllers.contactPage);
// router.get('/gallery', pageControllers.galleryPage);

module.exports = router;