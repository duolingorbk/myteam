const express = require('express');
const router = express.Router();

const { loginToAccount } = require('../../controller/signup_and_login_controllers/login.js');

router.post('/login', loginToAccount);


module.exports = router;