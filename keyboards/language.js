const { Markup } = require("telegraf");

module.exports = Markup.inlineKeyboard([
  [
    Markup.button.callback("🇺🇸 English", "lang_English"),
    Markup.button.callback("🇮🇳 Hindi", "lang_Hindi"),
  ],
  [
    Markup.button.callback("🇮🇳 Marathi", "lang_Marathi"),
    Markup.button.callback("🇯🇵 Japanese", "lang_Japanese"),
  ],
  [
    Markup.button.callback("🇫🇷 French", "lang_French"),
    Markup.button.callback("🇩🇪 German", "lang_German"),
  ],
  [
    Markup.button.callback("🇪🇸 Spanish", "lang_Spanish"),
    Markup.button.callback("🇨🇳 Chinese", "lang_Chinese"),
  ],
]);
