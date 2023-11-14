const router = require("express").Router();
const Controller = require("../controllers/controller");

router.post("/register", Controller.registerPage);

module.exports = router;
