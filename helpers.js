const nodemailer = require('nodemailer');
const EmailVerification = require('./models/emailVerification');

const getOTP = () => {
	let OTP = '';
	for (let i = 0; i < 5; i++) {
		const randomNumber = Math.round(Math.random() * 9);
		OTP += randomNumber;
	}
	return OTP;
};

const sendEmail = (sender, recipient, subject, message) => {
	const transport = nodemailer.createTransport({
		host: 'smtp.mailtrap.io',
		port: 2525,
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASSWORD,
		},
	});
	transport.sendMail({
		from: sender,
		to: recipient,
		subject: subject,
		html: message,
	});
};

const sendVerificationCode = async (userId, email) => {
	const existingToken = await EmailVerification.findOne({
		owner: userId,
	});
	if (existingToken) {
		await EmailVerification.findOneAndRemove({ owner: userId });
	}

	const OTP = getOTP();

	const verifyEmail = new EmailVerification({
		owner: userId,
		token: OTP,
	});

	await verifyEmail.save();

	sendEmail(
		'verify@hananahmed.com',
		email,
		'Your one time passcode',
		`<p>Your one time passcode is ${OTP}</p>`
	);
};

module.exports = { getOTP, sendEmail, sendVerificationCode };
