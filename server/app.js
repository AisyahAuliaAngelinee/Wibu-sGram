if (process.env.NODE_ENV !== "production") require("dotenv").config();
const port = process.env.PORT || 3000;
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routers/main");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.listen(port, () => {
	console.log(`Mendengarkan Aplikasi pada Port ${port}`);
});

module.exports = app;
