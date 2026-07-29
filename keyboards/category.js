const { Markup } = require("telegraf");

module.exports = Markup.inlineKeyboard([
    [
        Markup.button.callback("🎲 Random", "cat_random"),
        Markup.button.callback("👨 Dad", "cat_dad")
    ],
    [
        Markup.button.callback("💻 Coding", "cat_coding"),
        Markup.button.callback("🐶 Animal", "cat_animal")
    ],
    [
        Markup.button.callback("👶 Kids", "cat_kids"),
        Markup.button.callback("⚫ Dark", "cat_dark")
    ],
    [
        Markup.button.callback("🤣 Knock Knock", "cat_knock"),
        Markup.button.callback("⚡ One-Liner", "cat_one")
    ],
    [
        Markup.button.callback("🌐 Change Language", "change_lang")
    ]
]);