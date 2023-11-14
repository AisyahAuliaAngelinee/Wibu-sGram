const router = require("express").Router();
const Controller = require("../controllers/controller");
const authentication = require("../middleware/authentication");

router.post("/register", Controller.registerPage);
router.post("/login", Controller.loginPage);

router.use(authentication);

router.put("/update/:id", Controller.updateUser);
router.get("/", Controller.showPost);

module.exports = router;
