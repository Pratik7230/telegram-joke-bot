const languageKeyboard = require("../keyboards/language");

module.exports = (bot) => {
  bot.start((ctx) => {
    const userName = ctx.from.first_name ? ctx.from.first_name : "there";
    const welcomeMessage = `🎉 <b>Welcome to the Joke Bot, ${userName}!</b> 🎉\n\nI'm here to bring some laughter into your day. 😂\nGet ready for some hilarious jokes!\n\n👇 <b>Please select your preferred language below to get started:</b>`;
    
    ctx.reply(welcomeMessage, {
      parse_mode: "HTML",
      ...languageKeyboard,
    });
  });
};
