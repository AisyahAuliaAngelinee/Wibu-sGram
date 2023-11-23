const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authenticaiton = async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		if (!authorization) {
			throw new Error("unauthorized");
		}

		const access_token = authorization.split(" ")[1];
		const verified = verifyToken(access_token);

		const findUser = await User.findByPk(verified.id);
		if (!findUser) {
			throw new Error("USER NOT FOUND");
		}

		req.loginInfo = {
			AuthorId: verified.id,
			userName: verified.userName,
			email: verified.email,
		};

		next();
	} catch (error) {
		console.log(error.message);
		let status = 500;
		let message = "INTERNAL SERVER ERROR";

		// ?ERRORHANDLING
		if (error.message === "unauthorized") {
			status = 401;
			message = "USER UNAUTHORIZED";
		}

		res.status(status).json(message);

	}
};

module.exports = authenticaiton;
