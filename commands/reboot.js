const Discord = require('discord.js')
const fs = require('fs')
module.exports.run = async (bot, message, args, loadCmds) => {
  
const load = new Discord.RichEmbed()
.setThumbnail('https://media.discordapp.net/attachments/414868965479940096/446108369154211840/866945_game_512x512.png?width=65&height=65')
.setTitle('Bot Status <a:001:402577432940511234>')
.setDescription('All System Reload')
message.channel.send(load)//.then
loadCmds()

}
module.exports.config = {
  command: "reboot"
}