const moment = require("moment")
const momen = require('moment-duration-format');
let owner = '322203879208910849';
const Discord = require('discord.js')
exports.run = async (bot, message, func, stats) => {

const actividad = moment.duration(bot.uptime).format(" D [dias], H [hrs], m [mins], s [secs]");
const cpu = process.cpuUsage().system / 1024 / 1024;    
    
const embed = new Discord.RichEmbed()
.setColor(0x66ff66)

.setAuthor(`Bot: ${bot.user.username} info`, bot.user.displayAvatarURL)
.addField(`<:Owner:442443039915507743> Owner`, '<@' + owner + '>', true)
.addField(`<:Version:442442898651217922> Version`, `2.6.0`, true)
.addField(`:<:Libraries:442442996705918987> Libreria`, `Discord ${Discord.version} (Js)`, true)

.addField(`<:plex:410957444441964545>Memoria`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
.addField("CPU Usage", `${Math.round(cpu * 100) / 100}%`, true)
.addField(`<:uptime:413201335597662210>Uptime`, `${actividad}`, true)

.addField("<:wEmoji:440388223017943042> Commands", bot.commands.size, true)
.addField(`<:Servers:442443125005352962> Guilds`, `${bot.guilds.size.toLocaleString()}`, true)
.addField(`<:members:442439950747697164> Members`, `${bot.users.size.toLocaleString()}`, true)
.addField(`<:channels:413213800700051457>Channels`, `${bot.channels.size.toLocaleString()}`, true)

message.channel.send({embed});
}
module.exports.config = {
  command: "about"
}
