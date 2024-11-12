const express = require('express');
const router = express.Router();

const { makeAccount , getUser,deleteUser} = require('../../controller/signup_and_login_controllers/signup.js');

router.post('/signup', makeAccount);
router.get("/signup",getUser)
router.delete("/signup",deleteUser)



module.exports = router;