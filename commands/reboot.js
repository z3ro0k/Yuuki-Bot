const Discord = require('discord.js')
const fs = require('fs')
module.exports.run = async (bot, message, args, tools, loadCmds, eventsLoad) => {
  
const load = new Discord.MessageEmbed()
.setThumbnail('https://cdn.discordapp.com/emojis/434668375260659712.gif')
.setTitle('Bot Status')
.setDescription('<a:Online:446119385480953866> All System Reload <:Ainfo:441067085163134976>')
//.setDescription(' All System Reload <:Ainfo:441067085163134976>')
.addField('<:kEmoji:440388066197110785> Comandos Cargados', bot.commands.size + 11, true)
.addField('<:doc:448784570188562433> Eventos cargados', bot.events.size, true)
.setColor(0x36393e)
message.channel.send(load)//.then
loadCmds();
eventsLoad();

}
module.exports.config = {
  command: "reboot",
  aliases: ['reboot', 'recargar']
}