const router = require("express").Router();
const Controller = require("../controllers/controller");
// const authenticaiton = require("../middleware/authentication");

router.post("/register", Controller.registerPage);
router.post("/login", Controller.loginPage);

// router.use(authenticaiton);

router.get("/");

module.exports = router;
