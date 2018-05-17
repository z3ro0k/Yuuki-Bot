    module.exports.config = {
        command: "help"
    }

const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
    try {
        await message.author.send(`Commands: \n\n${bot.commands.map(cmd => `\`${cmd.config.command}\``).join(", ")}`);
        message.channel.send("Help sent.");
    } catch (e) {
        throw e;
    }
}