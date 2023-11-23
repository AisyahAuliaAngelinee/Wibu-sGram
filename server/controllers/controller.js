const { verifyPassword } = require("../helpers/bcrypt");
const { User, Post } = require("../models");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");

class Controller {
	static async register(req, res) {
		try {
			const newUser = {
				userName: req.body.userName,
				email: req.body.email,
				password: req.body.password,
			};

			const createUser = await User.create(newUser);

			res.status(201).json({ message: "CREATE USER SUCCESSFUL", createUser });
		} catch (error) {
			console.log(error.errors[0].message);
			let status = 500;
			let message = "INTERNAL SERVER ERROR";

			// ?ERRORHANDLING PASSWORD
			if (error.errors[0].message === "Please enter your password") {
				status = 400;
				message = "PLEASE ENTER YOUR PASSWORD";
			} else if (error.errors[0].message === "Password cannot be empty") {
				status = 400;
				message = "PASSWORD CANNOT BE EMPTY";
			}

			// ?ERRORHANDLING EMAIL
			if (error.errors[0].message === "Please enter your email") {
				status = 400;
				message = "PLEASE ENTER YOUR EMAIL";
			} else if (error.errors[0].message === "Invalid email format") {
				status = 400;
				message = "INVALID EMAIL FORMAT";
			} else if (error.errors[0].message === "Email cannot be empty") {
				status = 400;
				message = "EMAIL CANNOT BE EMPTY";
			} else if (error.errors[0].message === "email must be unique") {
				status = 400;
				message = "EMAIL MUST BE UNIQUE";
			}

			// ?ERRORHANDLING USERNAME
			if (error.errors[0].message === "Please enter your username") {
				status = 400;
				message = "PLEASE ENTER YOUR USERNAME";
			} else if (error.errors[0].message === "Username cannot be empty") {
				status = 400;
				message = "USERNAME CANNOT BE EMPTY";
			}

			res.status(status).json(message);
		}
	}

	static async login(req, res) {
		try {
			const { email, password } = req.body;
			const findUser = await User.findOne({
				where: {
					email,
				},
			});
			if (!findUser) {
				throw new Error("INVALID EMAIL/PASSWORD");
			}

			const verifiedPassword = verifyPassword(password, findUser.password);
			if (!verifiedPassword) {
				throw new Error("INVALID EMAIL/PASSWORD");
			}

			const payload = {
				id: findUser.id,
				userName: findUser.userName,
				email,
			};
			const token = signToken(payload);

			res.status(200).json({ message: "WE FOUND YOUR USER", access_token: token });
		} catch (error) {
			console.log(error.message);
			let status = 500;
			let message = "INTERNAL SERVER ERROR";

			// ?ERRORHANDLING
			if (error.message === "INVALID EMAIL/PASSWORD") {
				status = 400;
				message = "INVALID EMAIL/PASSWORD";
			}

			res.status(status).json(message);
		}
	}

	static async userUpdate(req, res) {
		try {
			const { id } = req.params;
			const findUserById = await User.findByPk(id);
			if (!findUserById) throw new Error("ERROR USER NOT FOUND");

			const { userName, email } = req.body;
			await User.update(
				{
					userName,
					email,
				},
				{ where: { id } }
			);

			res.status(200).json({ message: "SUCCESS UPDATE USER" });
		} catch (error) {
			console.log(error);
			let status = 500;
			let message = "INTERNAL SERVER ERROR";

			// ?ERRORHANDLING
			if (error.message === "ERROR USER NOT FOUND") {
				status = 400;
				message = "USER NOT FOUND";
			}

			res.status(status).json(message);
		}
	}

	static async deleteUser(req, res, next) {
		try {
			// res.send("Masuk Controller");
			// console.log(req.params);

			const { id } = req.params;
			const findUserById = await User.findByPk(id);
			if (!findUserById) throw new Error("ERROR USER NOT FOUND");

			await User.destroy({ where: { id } });
			res.status(200).json({ message: "SUCCESS DELETED USER" });
		} catch (error) {
			console.log(error);
			let status = 500;
			let message = "INTERNAL SERVER ERROR";

			// ?ERRORHANDLING
			if (error.message === "ERROR USER NOT FOUND") {
				status = 400;
				message = "ERROR USER NOT FOUND";
			}

			res.status(status).json(message);
		}
	}

	static async googleLogin(req, res, next) {
		try {
			console.log(req.headers);
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

	static async waifuTag(req, res, next) {
		try {
			// console.log("masuk");
			const fetchWaifuByTag = await axios.get("https://api.waifu.im/tags");
			// console.log(fetchWaifu);
			res.status(200).json(fetchWaifuByTag.data);
		} catch (error) {
			console.log(error);
		}
	}

	static async waifuData(req, res, next) {
		try {
			const fetchWaifu = await axios.get("https://api.waifu.im/search?is_nsfw=false&many=true");
			// console.log(fetchWaifu);
			res.status(200).json(fetchWaifu.data);
		} catch (error) {
			console.log(error);
		}
	}

	static async addNewArts(req, res, next) {
		try {
			const newArt = await Post.create({
				title: req.body.title,
				imgUrl: req.body.imgUrl,
			});
			// console.log(newArt);

			res.status(201).json({
				message: "NEW ARTS HAS BEEN ADDED",
				newArt,
			});
		} catch (error) {
			console.log(error);
		}
	}

	static async showArts(req, res, next) {
		try {
			const dataArts = await Post.findAll();
			// console.log(dataArts, "<<<<<");
			res.status(200).json(dataArts);
		} catch (error) {
			console.log(error);
		}
	}

	static async deleteArts(req, res, next) {
		try {
			await Post.destroy({
				where: {
					id: req.params.id,
				},
			});

			res.status(200).json({ message: "ART DELETED" });
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = Controller;
