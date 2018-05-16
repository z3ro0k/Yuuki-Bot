const Discord = require('discord.js')
const fs = require('fs')
module.exports.run = async (bot, message, args, loadCmds) => {
  
const load = new Discord.RichEmbed()
.setThumbnail('')
.setTitle('Bot Status')
loadCmds()

}
module.exports.config = {
  command: "reboot"
}