const env = require('dotenv');
env.config({ path: './config.env' });
require('./db');

const userRouter = require('./routes/user');

const express = require('express');

const app = express();

app.use(express.json());

app.use('/api/v1/users', userRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(`App is running on ${PORT}`);
});
