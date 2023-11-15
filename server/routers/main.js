const router = require("express").Router();
const Controller = require("../controllers/controller");
const authentication = require("../middleware/authentication");
const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot("6468894219:AAFh0OPLbPdYl25LwNRyZDMe7mqF_y5St4E", {
	polling: true,
});

router.post("/register", Controller.registerPage);
router.post("/login", Controller.loginPage);
router.post("/googleLogin", Controller.googleLogin);

bot.on("message", (msg) => {
	const chatId = msg.chat.id;
	const messageText = msg.text;

	if (messageText === "/start") bot.sendMessage(chatId, "WELCOME MY FRIEND!!");
});

router.use(authentication);

router.put("/update/:id", Controller.updateUser);
router.delete("/delete/:id", Controller.deleteUser);
router.get("/", Controller.showPost);

module.exports = router;
