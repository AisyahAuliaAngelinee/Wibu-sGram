"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.User, { foreignKey: "AuthorId" });
		}
	}
	Post.init(
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "Please enter post title" },
					notEmpty: { msg: "Title cannot be empty" },
				},
			},
			imgUrl: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "Please enter image URL" },
					notEmpty: { msg: "ImageURL cannot be empty" },
				},
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "Description cannot be null" },
					notEmpty: false,
				},
			},
		},
		{
			sequelize,
			modelName: "Post",
		}
	);
	return Post;
};
