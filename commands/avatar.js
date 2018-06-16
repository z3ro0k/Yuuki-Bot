const Discord = require('discord.js')

exports.run = (bot, message, args, func) => {
let user = message.mentions.users.first() || bot.users.get(args[0]) || message.author 
if(args[0] == "help"){
  const help = new Discord.RichEmbed()
      .addField('Uso:', "Yu-avatar <user> o <ID> ")
      .setColor(0x36393e)
      .addField('Descripción', "El bot manada el avatar del usuario mencioando ")
      .addField('Ejemplos:', "Yu-avatar @ToXicGMDyt#7319\nYu-avatar 322203879208910849")
      message.channel.send(help);
      return;
    }
 if (!user.avatarURL) return message.channel.send( 'Ese usuario no tiene avatar.');
 
 
  const embed = new Discord.MessageEmbed()
  .setImage(user.displayAvatarURL({ size: 2048 }))
  .addField(`${user.username}'s Avatar`, '[Descargar](' + user.displayAvatarURL() + ')')
  .setThumbnail(user.displayAvatarURL({ size: 2048 }))
  .setFooter(`Avatar de ${user.tag}`, user.displayAvatarURL())
  .setColor(0x36393e)
 message.channel.send({embed})
  }
module.exports.config = {
  command: "avatar",
   aliases: ["ava"]
}
exports.config = {
  command: "ascii",
  aliases: ["ascii", "ascii-text"],
  category: "fun",
  description: "convierte un tus argumentos a ascii",
  usage: "Yu!ascii Hello  world"
};