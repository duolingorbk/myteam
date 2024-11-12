const express = require('express');
const router = express.Router();

const { logoutFromAccount } = require('../../controller/signup_and_login_controllers/logout.js');

router.post('/logout', logoutFromAccount);


module.exports = router;