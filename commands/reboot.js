const Discord = require('discord.js')
const fs = require('fs')
module.exports.run = async (bot, message, args, loadCmds) => {
  
const load = new Discord.MessageEmbed()
.setThumbnail('https://cdn.discordapp.com/emojis/434668375260659712.gif')
.setTitle('Bot Status')
.setDescription('<a:Online:446119385480953866> All System Reload <:Ainfo:441067085163134976>')
.addField('<:kEmoji:440388066197110785> loaded commands', bot.commands.size)
.setColor(0x36393e)
message.channel.send(load)//.then
loadCmds()

}
module.exports.config = {
  command: "reboot",
  aliases: ['reboot', 'recargar']
}