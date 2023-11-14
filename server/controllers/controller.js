const { verifyPassword } = require("../helpers/bcrypt");
const { User } = require("../models");
const { signToken } = require("../helpers/jwt");

class Controller {
	static async registerPage(req, res, next) {
		try {
			// res.send(req.body);
			const createUser = {
				userName: req.body.userName,
				email: req.body.email,
				password: req.body.password,
			};
			// res.send(createUser);

			const newUser = await User.create(createUser);
			// res.send(newUser);

			if (!newUser) {
				throw new Error("INVALID CREATE USER");
			}

			res.status(201).json({
				message: "CREATE USER SUCCESSFUL",
			});
		} catch (error) {
			console.log(error);
			res.status(400).json({
				message: error,
			});
		}
	}

	static async loginPage(req, res, next) {
		try {
			// res.send(req.body);
			const { email, password } = req.body;
			const findUser = await User.findOne({
				where: {
					email,
				},
			});

			if (!findUser) throw new Error("INVALID EMAIL/PASSWORD");

			const isValid = verifyPassword(password, findUser.password);

			if (!isValid) throw new Error("INVALID EMAIL/PASSWORD");

			const payload = { id: findUser.id, email };
			const token = signToken(payload);

			res.status(200).json({ access_token: token });
		} catch (error) {
			console.log(error);
			res.status(400).json({ message: error });
		}
	}
}

module.exports = Controller;
