const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');


//Sign In
router.get('/', siteController.signIn);
router.post('/validate/signin', siteController.validateSignIn);

//Sign Up
router.get('/signup', siteController.signUp);
router.post('/signup/create', siteController.createSignUp);


//Forgot
router.get('/forgot', siteController.forgot);

//Update Profile First Time
router.get('/update/profile', siteController.updateProfile);
router.get('/update/profile/first', siteController.firstUpdateProfile);
router.post('/update/profile/first/stored', siteController.storeFirstUpdateProfile);

//Log Out
router.get('/destroy/session', siteController.destroySession);


module.exports = router;
