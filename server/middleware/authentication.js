const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authenticaiton = async (req, res, next) => {
	try {
		// res.send(req.headers);
		const { authorization } = req.headers;

		if (!authorization) throw new Error("UNAUTHORIZED");

		const access_token = authorization.split(" ")[1];
		const verified = verifyToken(access_token);
		const findUser = await User.findByPk(verified.id);

		if (!findUser) throw new Error("USER NOT FOUND");

		req.loginInfo = {
			userId: verified.id,
			userName: verified.userName,
			email: verified.email,
		};

		next();
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: "USER NOT FOUND" });
	}
};

module.exports = authenticaiton;
