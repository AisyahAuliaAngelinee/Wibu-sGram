const { User } = require("../models");

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
				throw new Error("INVALID EMAIL/PASSWORD");
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
			res.send(req.body);
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = Controller;
