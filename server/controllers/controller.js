const { verifyPassword } = require("../helpers/bcrypt");
const { User } = require("../models");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");

class Controller {
	static async registerPage(req, res, next) {
		try {
			// console.log("MAsuk");
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
			// console.log(email, password);
			const findUser = await User.findOne({
				where: {
					email,
				},
			});
			console.log(findUser, "<<< find user");

			if (!findUser) throw new Error("INVALID EMAIL/PASSWORD");

			const isValid = verifyPassword(password, findUser.password);

			if (!isValid) throw new Error("INVALID EMAIL/PASSWORD");

			const payload = {
				id: findUser.id,
				email,
			};
			const token = signToken(payload);

			res.status(200).json({
				access_token: token,
				id: findUser.id,
				userName: findUser.userName,
				email: findUser.email,
			});
		} catch (error) {
			console.log(error);
			let code = 500;
			let message = "INTERNAL SERVER ERROR";

			if (error.message == "INVALID EMAIL/PASSWORD")
				res.status(400).json({ message: "INVALID EMAIL/PASSWORD" });

			res.status(code).json(message);
		}
	}

	static async populateUser(req, res, next) {
		try {
			// console.log("MASUK DULU");
			// console.log(req.params);

			const { id } = req.params;
			const userData = await User.findByPk(id, {
				attributes: { exclude: ["password", "createdAt", "updatedAt"] },
			});
			// console.log(userData, "user");

			res
				.status(200)
				.json({ userName: userData.userName, email: userData.email });
		} catch (error) {
			console.log(error);
			res.status(404).json({ message: "USER NOT FOUND" });
		}
	}

	static async updateUser(req, res, next) {
		try {
			// res.send("Masuk");
			// console.log(req.body);

			const { id } = req.params;
			const idUser = await User.findByPk(id);

			if (!idUser) throw new Error("ERROR NOT FOUND");

			const updateUser = await User.update(
				{
					userName: req.body.userName,
					email: req.body.email,
				},
				{
					where: {
						id,
					},
				}
			);

			if (!updateUser) throw new Error("INVALID UPDATE PROFILE");

			res.status(200).json({
				message: "PROFILE UPDATE SUCCESSFULL",
			});
		} catch (error) {
			console.log(error);
			res.status(400).json({ message: "INVALID UPDATE USER PROFILE" });
		}
	}

	static async deleteUser(req, res, next) {
		try {
			// res.send("Masuk");
			// console.log(req.params);

			const { id } = req.params;
			// console.log(id, "<<< ID DARI REQ PARAMSS");

			const findUser = await User.findByPk(id);

			if (!findUser) throw new Error("USER NOT FOUND");
			await User.destroy({ where: { id: findUser.id } });

			res.status(200).json({ message: "DELETE SUCCESSFULL" });
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "INTERNAL SERVER ERROR" });
		}
	}

	static async googleLogin(req, res, next) {
		try {
			// console.log(req.headers);
			// console.log("lllllll");
			const { token } = req.headers;
			const client = new OAuth2Client();

			const ticket = await client.verifyIdToken({
				idToken: token,
				audience: process.env.GOOGLE_CLIENT_ID,
			});
			// console.log(ticket, "<<< Login google");

			const payload = ticket.getPayload();
			// console.log(payload, "<<< ini payload");

			const [user, created] = await User.findOrCreate({
				where: {
					email: payload.email,
				},
				defaults: {
					userName: "angelinee",
					email: payload.email,
					password: "password_google",
				},
				hooks: false,
			});
			// console.log(user, "<<< ini user");

			const access_token = signToken({ id: user.id });
			// console.log(access_token, "<<<< Acces Token");

			res.status(200).json(access_token);
		} catch (error) {
			console.log(error);
		}
	}

	static async showPost(req, res, next) {
		try {
			const fetchData = await axios.get(`https://api.waifu.pics/type/category`);
			console.log(fetchData, "<< data");
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = Controller;
