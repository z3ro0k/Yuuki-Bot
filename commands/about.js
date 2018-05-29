const moment = require("moment")
const momen = require('moment-duration-format');
const Discord = require('discord.js')

exports.run = async (bot, message, args) => {
  
if(args[0] == "help"){
  const help = new Discord.RichEmbed()
      .addField('Uso:', "Yu-about")
      .setColor(0x36393e)
      .addField('Descripción', "Te manda toda la informacion del bot")
      .addField('Ejemplos:', "Yu-about")
      message.channel.send(help);
      return;
    }
const actividad = moment.duration(bot.uptime).format(" D [dias], H [hrs], m [mins], s [secs]");
const cpu = process.cpuUsage().system / 1024 / 1024;    
    
const embed = new Discord.RichEmbed()
.setColor(0x66ff66)

.setAuthor(`Bot: ${bot.user.username} info`, bot.user.displayAvatarURL)
.addField(`<:Owner:442443039915507743> Owner`, '@ToXicGMDyt#7319', true)
.addField(`<:Version:442442898651217922> Version`, `2.6.0`, true)
.addField(`<:Libraries:442442996705918987> Libreria`, `Discord ${Discord.version} (Js)`, true)

.addField(`<:cloud:447518353972658207> Memoria`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
.addField("CPU Usage", `${Math.round(cpu * 100) / 100}%`, true)
.addField(`<:relog:447518519752523776>Uptime`, `${actividad}`, true)

.addField("<:wEmoji:440388223017943042> Commands", bot.commands.size, true)
.addField(`<:Servers:442443125005352962> Guilds`, `${bot.guilds.size.toLocaleString()}`, true)
.addField(`<:members:442439950747697164> Members`, `${bot.users.size.toLocaleString()}`, true)
.addField(`<:doc:448784570188562433>Channels`, `${bot.channels.size.toLocaleString()}`, true)

message.channel.send({embed});
}
module.exports.config = {
  command: "about"
}
