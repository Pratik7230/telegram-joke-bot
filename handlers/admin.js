const User = require("../models/User");
const { Markup } = require("telegraf");
const { isAdmin } = require("../config/admin");

module.exports = (bot) => {

    // /admin
    bot.command("admin", async (ctx) => {

        if (!isAdmin(ctx.from.id)) {
            return ctx.reply("❌ You are not authorized.");
        }

        try {
            const totalUsers = await User.countDocuments();

            const totalJokesResult = await User.aggregate([
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$jokeCount"
                        }
                    }
                }
            ]);

            const totalJokes =
                totalJokesResult[0]?.total || 0;

            await ctx.reply(
                `🔐 Admin Dashboard

👥 Total Users: ${totalUsers}
😂 Total Jokes: ${totalJokes}`,
                Markup.inlineKeyboard([
                    [
                        Markup.button.callback(
                            "👥 View Users",
                            "admin_users"
                        )
                    ],
                    [
                        Markup.button.callback(
                            "📊 Statistics",
                            "admin_stats"
                        )
                    ]
                ])
            );

        } catch (error) {
            console.error("Admin dashboard error:", error);

            await ctx.reply(
                "❌ Failed to load admin dashboard."
            );
        }
    });


    // 👥 VIEW USERS
    bot.action("admin_users", async (ctx) => {

        if (!isAdmin(ctx.from.id)) {
            return ctx.answerCbQuery(
                "❌ Unauthorized",
                { show_alert: true }
            );
        }

        await ctx.answerCbQuery();

        try {

            const users = await User
                .find()
                .sort({ createdAt: -1 })
                .limit(20)
                .lean();

            if (users.length === 0) {
                return ctx.reply("👥 No users found.");
            }

            let message = "👥 <b>Users</b>\n\n";

            users.forEach((user, index) => {

                const createdAt = formatDate(user.createdAt);
                const lastSeen = formatDate(user.lastSeen);
                const updatedAt = formatDate(user.updatedAt);

                message += `<b>${index + 1}. ${escapeHtml(user.firstName || "Unknown")}</b>\n`;

                // Username
                message += `👤 Username: ${user.username
                    ? "@" + escapeHtml(user.username)
                    : "Not available"
                    }\n`;

                // Telegram ID
                message += `🆔 Telegram ID: ${user.telegramId}\n`;

                // Language
                message += `🌐 Language: ${escapeHtml(user.language || "Unknown")}\n`;

                // Favorite category
                message += `⭐ Favorite Category: ${escapeHtml(user.favoriteCategory || "random")
                    }\n`;

                // Joke count
                message += `😂 Jokes: ${user.jokeCount || 0}\n`;

                // Created
                message += `📅 Created: ${createdAt}\n`;

                // Last seen
                message += `🕐 Last Seen: ${lastSeen}\n`;

                // Updated
                message += `🔄 Updated: ${updatedAt}\n`;

                // Phone number if available
                if (user.phoneNumber) {
                    message += `📱 Phone: ${escapeHtml(user.phoneNumber)}\n`;
                }

                message += `\n━━━━━━━━━━━━━━\n\n`;
            });

            await ctx.reply(message, {
                parse_mode: "HTML"
            });

        } catch (error) {

            console.error("Users error:", error);

            await ctx.reply(
                "❌ Failed to load users."
            );
        }
    });


    // 📊 STATISTICS
    bot.action("admin_stats", async (ctx) => {

        if (!isAdmin(ctx.from.id)) {
            return ctx.answerCbQuery(
                "❌ Unauthorized",
                { show_alert: true }
            );
        }

        await ctx.answerCbQuery();

        try {

            const totalUsers =
                await User.countDocuments();

            const jokes =
                await User.aggregate([
                    {
                        $group: {
                            _id: null,
                            total: {
                                $sum: "$jokeCount"
                            }
                        }
                    }
                ]);

            const totalJokes =
                jokes[0]?.total || 0;

            const languages =
                await User.aggregate([
                    {
                        $group: {
                            _id: "$language",
                            count: {
                                $sum: 1
                            }
                        }
                    },
                    {
                        $sort: {
                            count: -1
                        }
                    }
                ]);

            let languageText = "";

            languages.forEach((item) => {
                languageText +=
                    `• ${item._id || "Unknown"}: ${item.count}\n`;
            });

            await ctx.reply(
                `📊 <b>Bot Statistics</b>

👥 Total Users: ${totalUsers}

😂 Total Jokes: ${totalJokes}

🌐 <b>Languages</b>
${languageText}`,
                {
                    parse_mode: "HTML"
                }
            );

        } catch (error) {

            console.error("Stats error:", error);

            await ctx.reply(
                "❌ Failed to load statistics."
            );
        }
    });
};

function formatDate(date) {
    if (!date) {
        return "Not available";
    }

    return new Date(date).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
}

// Escape Telegram HTML
function escapeHtml(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}