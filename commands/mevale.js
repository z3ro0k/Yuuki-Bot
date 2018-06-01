const Discord = require('discord.js')

exports.run =  (bot, message, args, userAFK) => {

  const image = new Discord.Attachment(`https://cdn.discordapp.com/attachments/336680413617455106/376134885695553556/gift.gif`, "me-vale.gif");
message.channel.send(image)

  }
exports.config = {
  command: "mevale",
  aliases: ['mevale']
}