const router = require("express").Router();
const Controller = require("../controllers/controller");
const authentication = require("../middleware/authentication");

// PUBLIC
router.get("/", Controller.waifuData);
router.get("/tag", Controller.waifuTag);
router.get("/arts", Controller.showArts);
router.post("/add-arts", Controller.addNewArts);
router.delete("/delete/:id", Controller.deleteArts);

// GOOGLE LOGIN
router.post("/googleLogin", Controller.googleLogin);

// NORMAL LOGIN
router.post("/register", Controller.register);
router.post("/login", Controller.login);

router.use(authentication);

router.put("/:id", Controller.userUpdate);
router.delete("/:id", Controller.deleteUser);

module.exports = router;
