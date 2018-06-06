const Discord = require('discord.js')

exports.run = (bot, message, args, func) => {

    if(message.author.id !== '322203879208910849') return;
                                
   let link = (message.attachments.first().url).then(link => {
   bot.user.setAvatar(link);
   const embed = new Discord.MessageEmbed()
   .setTitle("『Set Avatar』")
   .setColor(0x36393e)
   .setTimestamp()
   .setImage(link)
   .setFooter('New avatar set')
   message.channel.send({embed})
   message.delete();
  })
}
exports.config = {
  command: "setavatar",
  aliases: ["savatar"]
}