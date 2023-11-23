"use strict";
const { hashPassword } = require("../helpers/bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			userName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "Please enter your username" },
					notEmpty: { msg: "Username cannot be empty" },
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: { msg: "Invalid email format" },
					notNull: { msg: "Please enter your email" },
					notEmpty: { msg: "Email cannot be empty" },
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "Please enter your password" },
					notEmpty: { msg: "Password cannot be empty" },
				},
			},
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	User.beforeCreate((data) => {
		data.password = hashPassword(data.password);
	});
	return User;
};
