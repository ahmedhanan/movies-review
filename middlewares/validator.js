const { check, validationResult } = require('express-validator');

const userValidator = [
	check('name', 'Name is required').trim().not().isEmpty(),
	check('email', 'Email is invalid').normalizeEmail().isEmail(),
	check('password')
		.isLength({ min: 8 })
		.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
		.withMessage(
			'Password must be at least 8 characters and contain at least one uppercase, at least one lower case, at least one special character.'
		),
];

const validate = (req, res, next) => {
	const errors = validationResult(req).array();
	const errMessages = [];
	if (errors) {
		errors.map((err) => errMessages.push(err.msg));
		res.json({ errMessages });
	}
	next();
};

module.exports = { userValidator, validate };
