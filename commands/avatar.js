const Discord = require('discord.js')

exports.run = (bot, message, args, func) => {
let user = message.mentions.users.first() || bot.users.get(args[0]) || message.author 

 if (!user.avatarURL) return message.channel.send( 'Ese usuario no tiene avatar.');
 
 
  const embed = new Discord.MessageEmbed()
  .setImage(user.displayAvatarURL({ size: 2048 }))
  .addField(`${user.username}'s Avatar`, '[Descargar](' + user.displayAvatarURL() + ')')
  .setThumbnail(user.displayAvatarURL({ size: 2048 }))
  .setFooter(`Avatar de ${user.tag}`, user.displayAvatarURL())
  .setColor(0x36393e)
 message.channel.send({embed})
  }
exports.config = {
  command: "avatar",
  aliases: ["avatar", "avat"],
  category: "info",
  description: "El bot manada el avatar del usuario mencioando",
  usage: "Yu!avatar @ToXicGMDyt#7319"
};