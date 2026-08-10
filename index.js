require("dotenv").config();

const { Telegraf } = require("telegraf");

const connectDatabase = require("./config/database");

const bot = new Telegraf(process.env.BOT_TOKEN);

require("./handlers/start")(bot);
require("./handlers/callback")(bot);

async function start() {
    await connectDatabase();

    bot.launch();

    console.log("Bot Started");
}

start();