const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        telegramId: {
            type: Number,
            required: true,
            unique: true
        },

        username: {
            type: String,
            default: null
        },

        firstName: {
            type: String,
            default: null
        },

        lastName: {
            type: String,
            default: null
        },

        language: {
            type: String,
            default: "English"
        },

        favoriteCategory: {
            type: String,
            default: "random"
        },

        jokeCount: {
            type: Number,
            default: 0
        },

        lastSeen: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);