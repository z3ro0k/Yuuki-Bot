const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("../data/warnings.json", "utf8"));

exports.run = (bot, message, args, func) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You can't do that.");
  let wUser =message.mentions.users.first() || bot.users.get(args[0])
  if(!wUser) return message.reply("Couldn't find them yo");
  let warnlevel = warns[wUser.id].warns;
     
  const embed = new Discord.MessageEmbed()
  .setTitle('Warns List')
  .addField('Name', wUser.username)
  .addField('Warnigs', warnlevel)
  .setThumbnail(wUser.displayAvatarURL())
  .setColor(0x36393e)
  message.channel.send({ embed })

}