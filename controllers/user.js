const { sendVerificationCode } = require('../helpers');
const EmailVerification = require('../models/emailVerification');
const User = require('../models/user');

const create = async (req, res) => {
	const { name, email, password } = req.body;
	const newUser = new User({ name, email, password });
	await newUser.save();

	await sendVerificationCode(newUser._id, email);

	res.status(201).send({
		message:
			'Please verify your email address. A one time passcode has been send to your email. It is only valid for 1 hour.',
	});
};

const verify = async (req, res) => {
	const { id, otp } = req.body;
	const user = await User.findById(id);
	if (!user) {
		res.status(404).json({ message: 'User not found!' });
	}
	if (user.isVerified) {
		res.status(200).json({ message: 'User already verified.' });
	}
	const otpUser = await EmailVerification.findOne({ owner: id });
	if (!otpUser) {
		res.status(404).json({ message: 'No OTP request found!' });
	}
	const compare = await otpUser.compareToken(otp);
	console.log('Comparing token', compare);
	if (compare === false) {
		return res.status(404).json({ message: 'Invalid code' });
	}
	user.isVerified = true;
	await user.save();
	res.json({ message: 'User verified' });
};

const resendCode = async (req, res) => {
	const { id } = req.body;
	const user = await User.findById(id);
	await sendVerificationCode(id, user.email);
	res.status(201).send({
		message:
			'Please verify your email address. A one time passcode has been send to your email. It is only valid for 1 hour.',
	});
};

module.exports = { create, verify, resendCode };
