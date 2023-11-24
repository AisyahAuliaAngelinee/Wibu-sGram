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
			email: "aisyahaulia@mail.com",
		};

		access_token = signToken(userLogin);

		// POST
		await sequelize.queryInterface.bulkInsert(
			"Posts",
			[
				{
					title: "Test Waifu",
					imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/43/Blue_Rock_Pigeon_%28Columba_livia%29_in_Kolkata_I_IMG_9762.jpg",
					description: "INI TEST",
				},
			],
			{ returning: true }
		);
	} catch (error) {
		console.log(error, "ERROR");
	}
});

// !USER TESTING
describe("POST /login", () => {
	describe("POST /login - success", () => {
		it("Should be return of array of object instance data user", async () => {
			const body = { email: "aisyahaulia@mail.com", password: "123456" };
			const response = await request(app).post("/login").send(body);

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("access_token", expect.any(String));

			console.log(response.body);
		});
	});
});

describe("POST /login", () => {
	describe("POST /login - error", () => {
		it("Should be return of array of object instance data user", async () => {
			const body = { email: "", password: "123456" };
			const response = await request(app).post("/login").send(body);

			expect(response.status).toBe(400);
			console.log(response.body);
		});

		it("Should be return of array of object instance data user", async () => {
			const body = { email: "aisyahaulia@mail.com", password: "" };
			const response = await request(app).post("/login").send(body);

			expect(response.status).toBe(400);
			console.log(response.body);
		});

		it("Should be return of array of object instance data user", async () => {
			const body = { email: "", password: "" };
			const response = await request(app).post("/login").send(body);

			expect(response.status).toBe(400);
			console.log(response.body);
		});

		it("Should be return of array of object instance data user", async () => {
			const body = { email: "aisyahaulia", password: "123456" };
			const response = await request(app).post("/login").send(body);

			expect(response.status).toBe(400);
			console.log(response.body);
		});

		it("Should be return of array of object instance data user", async () => {
			const body = { email: "aisyahaulia@mail.com", password: "123" };
			const response = await request(app).post("/login").send(body);

			expect(response.status).toBe(400);
			console.log(response.body);
		});
	});
});

describe("POST /register", () => {
	describe("POST /register - success", () => {
		it("Should be return an object with message", async () => {
			const body = { userName: "angelineeaisyah", email: "auliaaisyah@mail.com", password: "123456" };
			const response = await request(app).post("/register").send(body);

			expect(response.status).toBe(201);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
		});
	});

	describe("POST /register - error", () => {
		it("Should be return an object with message", async () => {
			const body = { userName: "", email: "auliaaisyah@mail.com", password: "123456" };
			const response = await request(app).post("/register").send(body);

			expect(response.status).toBe(400);
		});

		it("Should be return an object with message", async () => {
			const body = { userName: "angelineeaisyah", email: "", password: "123456" };
			const response = await request(app).post("/register").send(body);

			expect(response.status).toBe(400);
		});

		it("Should be return an object with message", async () => {
			const body = { userName: "angelineeaisyah", email: "auliaaisyah@mail.com", password: "" };
			const response = await request(app).post("/register").send(body);

			expect(response.status).toBe(400);
		});

		it("Should be return an object with message", async () => {
			const body = { userName: "", email: "", password: "" };
			const response = await request(app).post("/register").send(body);

			expect(response.status).toBe(400);
		});

		it("Should be return an object with message", async () => {
			const body = { userName: "angelineeaisyah", email: "auliaaisyah", password: "123456" };
			const response = await request(app).post("/register").send(body);

			expect(response.status).toBe(400);
		});
	});
});

describe("PUT /:id", () => {
	describe("PUT /:id - success", () => {
		it("Should be return an object with message", async () => {
			const body = { userName: "njelin", email: "njelin@mail.com" };
			const response = await request(app).put("/1").set("Authorization", `Bearer ${access_token}`).send(body);

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
		});
	});

	describe("PUT /:id - error", () => {
		it("Should be return an object with message", async () => {
			const body = { userName: "njelin", email: "" };
			const response = await request(app).put("/1").set("Authorization", `Bearer ${access_token}`).send(body);

			expect(response.status).toBe(500);
		});

		it("Should be return an object with message", async () => {
			const body = { userName: "njelin", email: null };
			const response = await request(app).put("/1").set("Authorization", `Bearer ${access_token}`).send(body);

			expect(response.status).toBe(500);
		});

		it("Should be return an object with message", async () => {
			const body = { userName: "", email: "njelin@mail.com" };
			const response = await request(app).put("/1").set("Authorization", `Bearer ${access_token}`).send(body);

			expect(response.status).toBe(500);
		});

		it("Should be return an object with message", async () => {
			const body = { userName: null, email: "njelin@mail.com" };
			const response = await request(app).put("/1").set("Authorization", `Bearer ${access_token}`).send(body);

			expect(response.status).toBe(500);
		});

		it("Should be return an object with message", async () => {
			const body = { userName: "njelin", email: "njelin@mail.com" };
			const response = await request(app).put("/1").send(body);

			expect(response.status).toBe(401);
		});

		it("Should be return an object with message", async () => {
			const body = { userName: "njelin", email: "njelin@mail.com" };
			const response = await request(app).put("/1").set("Authorization", `Bearer KWOAKWOKAOWKOAKWOKAWOKWOKWAOKAOWKWAO`).send(body);

			expect(response.status).toBe(500);
		});
	});
});

describe("DELETE /:id", () => {
	describe("DELETE /:id - success", () => {
		it("Should be return an object with message", async () => {
			const response = await request(app).delete("/1").set("Authorization", `Bearer ${access_token}`);
			expect(response.status).toBe(200);
		});
	});

	describe("DELETE /:id - error", () => {
		it("Should be return an object with message", async () => {
			const response = await request(app).delete("/33").set("Authorization", `Bearer ${access_token}`);
			expect(response.status).toBe(500);
		});

		it("Should be return an object with message", async () => {
			const response = await request(app).delete("/1");
			expect(response.status).toBe(401);
		});

		it("Should be return an object with message", async () => {
			const response = await request(app).delete("/1").set("Authorization", `Bearer WKWKWKWKKWKWKWKKWKWKKWKWK`);
			expect(response.status).toBe(500);
		});
	});
});

//? DELETE DATA
afterAll(async () => {
	await sequelize.queryInterface.bulkDelete("Users", null, { truncate: true, cascade: true, restartIdentity: true });
	await sequelize.queryInterface.bulkDelete("Posts", null, { truncate: true, cascade: true, restartIdentity: true });
});
