const mongoose = require('mongoose');

const connectionString =
	'mongodb+srv://<username>:<password>@dbcluster.btm0kwl.mongodb.net/moviesreview?retryWrites=true&w=majority';

mongoose.connect(
	connectionString
		.replace('<username>', process.env.DB_USERNAME)
		.replace('<password>', process.env.DB_PASSWORD)
);
