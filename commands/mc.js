const Discord = require('discord.js')
const db = require('quick.db')
const { MessageAttachment } = require("discord.js");

exports.run = async (bot, msg, args ) => {
  
 var text = args.join(" ");
    if (msg.mentions.users.size !== 0) text = text.replace(/<@!?\d+>/, "").replace(/\n/g, " ").trim();
    if (!text) return msg.channel.send("You must give an achievement description.");
    if (text.length > 22) return msg.channel.send("I can only handle a maximum of 22 characters");

    return msg.channel.send(new MessageAttachment(await bot.idiotAPI.achievement((msg.mentions.users.first() || msg.author).displayAvatarURL({ format:"png", size:32 }), text), "achievement.png"));

}
exports.config = {
  command: "mc",
  aliases: ['mcc', 'Achievement'],
  category: "fun",
  description: "creas un Achievement de maincraft",
  usage: "Yu!mc cookie"
};