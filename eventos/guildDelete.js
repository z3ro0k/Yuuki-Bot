const Discord = require('discord.js')

exports.run = (bot, guild, args, tools) => {

var canal = bot.channels.get('429467913531949056'); 
let user = guild.members.size;
let bots = guild.members.filter(m => m.user.bot).size;
let discriminar = user - bots;
const embed = new Discord.MessageEmbed() 
.setTitle("👥『-Guild』")
.addField(`Guild Name:`,`${guild.name}`, true)
.addField(`Guild ID`, guild.id, true)
.addField(`Total servers`,`${bot.guilds.size}`,true)
.addField(`Total users`,`${bot.users.size}`,true)
.setThumbnail(`${guild.iconURL()}`)
.setColor("#ff0000")
canal.send({ embed: embed})

}