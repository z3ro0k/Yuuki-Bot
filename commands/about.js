
const moment = require("moment")
const momen = require('moment-duration-format');
const Discord = require('discord.js')

exports.run = async (bot, message, args) => {

const actividad = moment.duration(bot.uptime).format(" D [dias], H [hrs], m [mins], s [secs]");
const cpu = process.cpuUsage().system / 1024 / 1024;    
    
const embed = new Discord.MessageEmbed()
.setColor(0x66ff66)

.setAuthor(`Información de ${bot.user.username} `, bot.user.displayAvatarURL)
.addField(`<:Owner:442443039915507743> Owner`, '@ToXicGMDyt#7319', true)
.addField(`<:Version:442442898651217922> Version`, `2.6.0`, true)
.addField(`<:Libraries:442442996705918987> Libreria`, `Discord ${Discord.version} (Js)`, true)

.addField(`<:cloud:447518353972658207> Memoria`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
.addField("<:CPU:462586915783180298> CPU Usage", `${Math.round(cpu * 100) / 100}%`, true)
.addField(`<:relog:447518519752523776> Tiempo de actividad`, `${actividad}`, true)
.addField("<:wEmoji:440388223017943042> Comandos ", bot.commands.size + 11, true)
.addField("<:doc:448784570188562433> Eventos", bot.events.size, true)
.addField(`<:Servers:442443125005352962> Guilds`, `${bot.guilds.size.toLocaleString()}`, true)
.addField(`<:members:442439950747697164> Members`, `${bot.users.size.toLocaleString()}`, true)
.addField(`<:doc:448784570188562433> Channels`, `${bot.channels.size.toLocaleString()}`, true)

message.channel.send({embed});
}
exports.config = {
  command: "about",
  aliases: ["about", "infobot"],
  category: "system",
  description: "Te muestra informacion del bot",
  usage: "Yu!about"
};