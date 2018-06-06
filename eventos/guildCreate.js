const Discord = require('discord.js')

exports.run = (bot, message, args, tools) => {

var canal = bot.channels.get('429467913531949056'); 
let user = message.guild.members.size;
let bots = message.guild.members.filter(m => m.user.bot).size;
let discriminar = user - bots;
const embed = new Discord.RichEmbed() 
.setTitle("👥『New Guild』")
.addField(`New Guild:`,`${message.guild.name}`, true)
.addField(`Total Members:`, `${message.guild.memberCount}`, true)
.addField(`Guild ID:`,`${message.guild.id}`, true)
.addField(`<:GearRy:393126289214537738>Bots:`, bots, true)
.addField(`Members`, discriminar, true)
.addField(`Owner:`, `${message.guild.members.get(message.guild.ownerID).user.username}#${message.guild.members.get(message.guild.ownerID).user.discriminator}`, true)
.addField(`Total servers`,`${bot.guilds.size}`,true)
.addField(`Total users`,`${bot.users.size}`,true)
.setThumbnail(`${message.guild.iconURL()}`)
.setColor(9823579)
canal.send({embed})

}