const Discord = require('discord.js')

exports.run = async(bot, message, args, level) => {
  
  bot.users.fetch(args[0]).then(user => {
    
const embed = new Discord.MessageEmbed()
.addField('❯ User name', user.tag, true)
.addField('❯ User ID', user.id, true)
//.addField('❯ Discord Join Date', user.user.createdAt.toDateString(), true)
.addField('❯ User status', user.presence.status, true)
.setThumbnail(user.displayAvatarURL())
message.channel.send(embed)
  });
}
exports.config = {
  command: "fetchuser",
  aliases: ["fuser", "userfetch"],
  category: "mod",
  description: "Busca a un usuario que no este en el servidor debe proposionar su id",
  usage: "Yu!fetchuser 322203879208910849"
};