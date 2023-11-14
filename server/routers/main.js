const router = require("express").Router();
const Controller = require("../controllers/controller");

router.post("/register", Controller.registerPage);
router.post("/login", Controller.loginPage);

module.exports = router;
