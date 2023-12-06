const express = require('express');
const router = express.Router();
const pageControllers = require('../controllers/pageControllers');

// Define your routes here
router.post('/login', pageControllers.login);
router.get('/login', pageControllers.loginGet);
router.post('/contact', pageControllers.contactPage);
router.get('/', pageControllers.homePage);
router.get('/logout', pageControllers.logout);
router.get('/check-session', pageControllers.checkSession);
router.get('/admin-dashboard', pageControllers.adminDashboard);

module.exports = router;