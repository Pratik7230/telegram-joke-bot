require("dotenv").config();

const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

require("./handlers/start")(bot);
require("./handlers/callback")(bot);

bot.launch();

console.log("Bot Started");