const { Markup } = require("telegraf");

module.exports = Markup.inlineKeyboard([
  [
    Markup.button.callback("🇺🇸 English", "lang_English"),
    Markup.button.callback("🇮🇳 Hindi", "lang_Hindi"),
  ],
  [
    Markup.button.callback("🇮🇳 Marathi", "lang_Marathi"),
    Markup.button.callback("🇪🇸 Spanish", "lang_Spanish"),
  ],
]);
