const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passwordResetSchema = mongoose.Schema({
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	token: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		expires: 3600,
		default: Date.now(),
	},
});

passwordResetSchema.pre('save', async function (next) {
	if (this.isModified('token')) {
		this.toke = bcrypt.hash(this.token, 10);
	}
	next();
});

passwordResetSchema.methods.compareToken = async (token) => {
	const result = bcrypt.compare(token, this.token);
	return result;
};

module.exports = mongoose.model('PasswordToken', passwordResetSchema);
