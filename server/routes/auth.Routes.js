const express = require('express');
const router = express.Router();

const authController = require('../controllers/authControllers');

router.post('/LOGIN', authController.LOGIN);
router.post('/register', authController.register);



module.exports = router;