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
					notEmpty: true,
					notNull: true,
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
					notNull: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
					notNull: true,
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
