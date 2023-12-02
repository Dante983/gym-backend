const express = require('express');
const router = express.Router();
const pageControllers = require('../controllers/pageControllers');

// Define your routes here
router.post('/login', pageControllers.login);
router.get('/login', pageControllers.loginGet);
router.post('/contact', pageControllers.contactPage);
router.get('/', pageControllers.homePage);

module.exports = router;