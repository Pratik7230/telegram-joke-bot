const languageKeyboard = require("../keyboards/language");

module.exports = (bot) => {
  bot.start((ctx) => {
    ctx.reply("😂 Welcome!\n\nSelect your language.", languageKeyboard);
  });
};
