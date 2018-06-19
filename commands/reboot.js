const Discord = require('discord.js')
const fs = require('fs')
module.exports.run = async (bot, message, args, tools, loadCmds, eventsLoad) => {
if(args[0].toLowerCase() === 'commanads')
  message.channel.send
const load = new Discord.MessageEmbed()
.setThumbnail('https://static1.squarespace.com/static/59eee47aa8b2b0c9f26337a7/t/59effa9051a584527a9a8096/1508899504685/Design+Icon+Ltd.+SIMPLE+PROCESS+Design+Hong+Kong')
.setTitle('Bot Status')
.setDescription('<a:Online:446119385480953866> All System Reload <:Ainfo:441067085163134976>')
.addField('<:kEmoji:440388066197110785> Comandos Cargados', bot.commands.size + 11, true)
.addField('<:doc:448784570188562433> Eventos cargados', bot.events.size, true)
.setColor(0x36393e)
message.channel.send(load)
loadCmds();
eventsLoad();

}
module.exports.config = {
  command: "reboot",
  aliases: ['reboot', 'recargar']
}