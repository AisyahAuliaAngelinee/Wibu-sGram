if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 3000;

const router = require("./routers/main");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.use(cors);

app.listen(port, () => {
	console.log(`Mendengarkan Aplikasi pada Port ${port}`);
});

module.exports = app;
