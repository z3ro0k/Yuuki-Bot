const Discord = require('discord.js')
const fs = require('fs')
module.exports.run = async (bot, message, args, loadCmds) => {
  
const load = new Discord.RichEmbed()
.setThumbnail('https://cdn.discordapp.com/emojis/434668375260659712.gif')
.setTitle('Bot Status')
.setDescription('All System Reload <a:001:402577432940511234>')
.addField('<:kEmoji:440388066197110785> loaded commands', bot.commands.size)
.setColor(0x36393e)
message.channel.send(load)//.then
loadCmds()

}
module.exports.config = {
  command: "reboot"
}