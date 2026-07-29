const users = require("../utils/userState");
const categoryKeyboard = require("../keyboards/category");
const languageKeyboard = require("../keyboards/language");
const getJoke = require("../services/jokeService");

const jokeExpiryTimers = new Map();

const messageKey = (ctx) => {
    const message = ctx.callbackQuery?.message;

    return message ? `${message.chat.id}:${message.message_id}` : null;
};

const clearJokeExpiry = (ctx) => {
    const key = messageKey(ctx);

    if (key && jokeExpiryTimers.has(key)) {
        clearTimeout(jokeExpiryTimers.get(key));
        jokeExpiryTimers.delete(key);
    }
};

const expireJokeAfterOneMinute = (ctx) => {
    const key = messageKey(ctx);
    const message = ctx.callbackQuery?.message;

    if (!key || !message) return;

    clearJokeExpiry(ctx);

    const timer = setTimeout(async () => {
        jokeExpiryTimers.delete(key);

        try {
            await ctx.telegram.deleteMessage(message.chat.id, message.message_id);
        } catch (error) {
            // The message may already have been deleted by the user or Telegram.
        }
    }, 60_000);

    jokeExpiryTimers.set(key, timer);
};

const jokeActionsKeyboard = (category) => ({
    reply_markup: {
        inline_keyboard: [
            [{ text: "\u{1F602} Another", callback_data: "cat_" + category }],
            [
                { text: "\u{1F4C2} Categories", callback_data: "show_categories" },
                { text: "\u{1F310} Select Language", callback_data: "change_lang" }
            ]
        ]
    }
});

module.exports = (bot) => {
    bot.action(/^lang_(.+)$/, async (ctx) => {
        clearJokeExpiry(ctx);
        await ctx.answerCbQuery();
        users[ctx.from.id] = { language: ctx.match[1] };

        await ctx.editMessageText(
            "Choose a joke category.",
            categoryKeyboard
        );
    });

    bot.action("change_lang", async (ctx) => {
        clearJokeExpiry(ctx);
        await ctx.answerCbQuery();
        await ctx.editMessageText("Select your language.", languageKeyboard);
    });

    bot.action(/^cat_(.+)$/, async (ctx) => {
        clearJokeExpiry(ctx);
        const category = ctx.match[1];
        const language = users[ctx.from.id]?.language || "English";

        await ctx.answerCbQuery("Generating...");

        const joke = await getJoke(language, category);
        await ctx.editMessageText(joke, jokeActionsKeyboard(category));
        expireJokeAfterOneMinute(ctx);
    });

    bot.action("show_categories", async (ctx) => {
        clearJokeExpiry(ctx);
        await ctx.answerCbQuery();
        await ctx.editMessageText("Choose a joke category.", categoryKeyboard);
    });
};
