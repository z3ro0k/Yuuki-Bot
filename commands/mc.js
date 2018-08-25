const Discord = require('discord.js')
const db = require('quick.db')
const { MessageAttachment } = require("discord.js");

exports.run = async (bot, msg, args ) => {
  
  var langg = await bot.tools.Lang(msg.guild)    
const lang = require(`../langs/${langg}.json`) 

 var text = args.join(" ");
    if (msg.mentions.users.size !== 0) text = text.replace(/<@!?\d+>/, "").replace(/\n/g, " ").trim();
    if (!text) return msg.channel.send(lang.mc.noArgs);
    if (text.length > 22) return msg.channel.send(lang.mc.args22);

    return msg.channel.send(new MessageAttachment(await bot.idiotAPI.achievement((msg.mentions.users.first() || msg.author).displayAvatarURL({ format:"png", size:32 }), text), "achievement.png"));

}
exports.config = {
  command: "mc",
  aliases: ['mcc', 'Achievement'],
  category: "fun",
  description: "creas un Achievement de maincraft",
  usage: "Yu!mc cookie"
};