const express = require('express');
const { create, verify, resendCode } = require('../controllers/user');
const {
	userValidator,
	validate,
} = require('../middlewares/validator');

const router = express.Router();

router.post('/create', create);
router.post('/verify', verify);
router.post('/resend-code', resendCode);

module.exports = router;
