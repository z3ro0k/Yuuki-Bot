const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (bot, message, args) => {
var rpts = ["ff00ff", "00ffff", "8600b3", "754785", "e699ff", "ff3333", "006600", "8080ff"," 0000b3"];
 var color = rpts[Math.floor(Math.random() * rpts.length)]
 const embed = new Discord.MessageEmbed()
    .setAuthor('Invitacion de: ' + bot.user.username + '#' + bot.user.discriminator)
    .setThumbnail(bot.user.avatarURL())
    .setDescription('▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔')
    .setDescription(`<:Discord_invite:352338233889128448>[\`Server Soporte\`](https://discord.gg/abyRgJ8)\n<:enlaces:352376308346519552>[\`Invitacion del Bo\`t](https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot&permissions=2084043903)`)
    .setColor(color)
 message.channel.send({embed})  
}
exports.config = {
  command: "invite",
  aliases: ["invitebot"],
  category: "info",
  description: "Te manda la invitacion del bot",
  usage: "Yu!invite"
};