const Discord = require('discord.js')

exports.run = async (bot, message, args) => {

const image = new Discord.MessageAttachment(`https://cdn.discordapp.com/attachments/275688259068100608/374048558745387008/ahaa-1.gif`, "aplauso.gif");
message.channel.send(image)

}
exports.config = {
  command: "aplauso",
  aliases: ["aplauso", "aplaudir"],
  category: "imagen",
  description: "Que hara",
  usage: "Yu!aplauso"
};