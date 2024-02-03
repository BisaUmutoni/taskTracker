const User = require('../../database/model/user.model');
const jwt = require('jsonwebtoken'); //auth and info exchange, validation as well
const validator = require('email-validator');

const LOGIN = async (req, res) => {
	let { email, password } = req.body;
	try {
		let user = await user.findOne({ email });
		console.log(user, req.body);
		if (!user) {
			return res.status(400).send('email does not exist');
		}

		user.comparePassword(password, (err, match) => {
			if (!match || err) return res.status(400).send('Password does not match');
			let token = jwt.sign({ _id: user._id }, 'kljclsadflkdsjfklsdjfklsdjf', {
				expiresIn: '24h',
			});

			res.status(200).send({
				token,
				username: user.username,
				email: user.email,
				id: user._id,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			});
		});
	} catch (error) {
		return res.status(400).send('Login failed');
	}
};

const register = async (req, res) => {
	console.log(req.body, 'req');
	const { username, password, email } = req.body;
	try {
		if (!username) return res.status(400).send('username is required');

		if (!email) return res.status(400).send('email is required');

		if (!validator.validate(email)) {
			return res.status(400).send('enter valid email id');
		}
		if (!password || password.length < 6) {
			return res.status(400).send('enter valid password');
		}

		const userExist = await User.findOne({ email });

		if (userExist) {
			return res.status(400).send('email is taken');
		}

		const user = await new User({
			email,
			username,
			password,
		});

		await user.save();
		console.log("verify email")
		return res.status(200).send(user);

	} catch (error) {
		return res.status(400).send('Error creating user');
	}
};

module.exports = {
	LOGIN,
	register,
};