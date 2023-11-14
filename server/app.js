const express = require("express");
const app = express();

const port = 3000;

const router = require("./routers/main");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.listen(port, () => {
	console.log(`Mendengarkan Aplikasi pada Port ${port}`);
});

module.exports = app;
