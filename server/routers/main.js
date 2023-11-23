const router = require("express").Router();
const Controller = require("../controllers/controller");
const authentication = require("../middleware/authentication");

router.get("/", Controller.waifuData);
router.get("/tag", Controller.waifuTag);
router.get("/arts", Controller.showArts);

router.post("/register", Controller.registerPage);
router.post("/login", Controller.loginPage);
router.post("/googleLogin", Controller.googleLogin);

router.use(authentication);

router.post("/add-arts", Controller.addNewArts);
router.delete("/delete/:id", Controller.deleteArts);
router.get("/update/:id", Controller.populateUser);
router.put("/update/:id", Controller.updateUser);
router.delete("/delete/:id", Controller.deleteUser);

module.exports = router;
