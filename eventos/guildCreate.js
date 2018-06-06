const Discord = require('discord.js')

exports.run = (bot, guild, args, tools) => {

var canal = bot.channels.get('429467913531949056'); 
let user = guild.members.size;
let bots = guild.members.filter(m => m.user.bot).size;
let discriminar = user - bots;
const embed = new Discord.MessageEmbed() 
.setTitle("👥『New Guild』")
.addField(`New Guild:`,`${guild.name}`, true)
.addField(`Total Members:`, `${guild.memberCount}`, true)
.addField(`Guild ID:`,`${guild.id}`, true)
.addField(`<:GearRy:393126289214537738>Bots:`, bots, true)
.addField(`Members`, discriminar, true)
.addField(`Owner:`, `${guild.members.get(guild.ownerID).user.username}#${guild.members.get(guild.ownerID).user.discriminator}`, true)
.addField(`Total servers`,`${bot.guilds.size}`,true)
.addField(`Total users`,`${bot.users.size}`,true)
.setThumbnail(`${guild.iconURL()}`)
.setColor(9823579)
canal.send({embed})

}