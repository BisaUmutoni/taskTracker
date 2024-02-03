const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/TaskTrackerDB';
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

mongoose
	.connect(mongoURI, options)
	.then(() => {
		console.log('Connected to MongoDB');
		
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error);
	});