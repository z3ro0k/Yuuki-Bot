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
.addField(`<:OwnerBot:372601959758430209>Owner`, '<@' + owner + '>', true)
.addField(`<:GearRy:393126289214537738>Version`, `2.6.0`, true)
.addField(`:books:Libreria`, `Discord ${Discord.version} (Js)`, true)

.addField(`<:plex:410957444441964545>Memoria`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
.addField("CPU Usage", `${Math.round(cpu * 100) / 100}%`, true)
.addField(`<:uptime:413201335597662210>Uptime`, `${actividad}`, true)

.addField("<:commands:414861205073690624>Commands", bot.commands.size, true)
.addField(`<:Box:413213626753744907>Guilds`, `${bot.guilds.size.toLocaleString()}`, true)
.addField(`<:members:413201029488967682>Members`, `${bot.users.size.toLocaleString()}`, true)
.addField(`<:channels:413213800700051457>Channels`, `${bot.channels.size.toLocaleString()}`, true)

message.channel.send({embed});
}
module.exports.config = {
  command: "about"
}
