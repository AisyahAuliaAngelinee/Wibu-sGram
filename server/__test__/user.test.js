const request = require("supertest");
const app = require("../app");
const fs = require("fs").promises;
const { sequelize } = require("../models");
const { signToken } = require("../helpers/jwt");
const { hashPassword } = require("../helpers/bcrypt");

let access_token;
beforeAll(async () => {
	try {
		const testingUser = JSON.parse(await fs.readFile("./users.json", "utf-8")).map((el) => {
			el.createdAt = el.updatedAt = new Date();
			el.password = hashPassword(el.password);
			return el;
		});

		await sequelize.queryInterface.bulkInsert("Users", testingUser, { returning: true });

		const userLogin = {
			id: 1,
			userName: "aisyahangelinee",
		};

		access_token = signToken(userLogin);
	} catch (error) {
		console.log(error);
	}
});

// !USER TESTING
DESCRIBE("POST /login", () => {
	DESCRIBE("POST /login - success", () => {
		it.only("Should be return of array of object instance data user", async () => {
			const body = { username: "aisyahangelinee", password: "123456" };
			const response = await request(app).post("/login").send(body);

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("access_token", expect.any(String));

			console.log(response.body);
		});
	});
});
