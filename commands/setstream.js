const Discord = require('discord.js')
const { IdOwner } = require('../botconfig.js')
exports.run = async (bot, message, args) => {

   if(message.author.id !== IdOwner) return;

      if(!args.join(' ')) return message.channel.send(`Escriba el estado.`);
    
    bot.user.user.setActivity({
          status: "dnd",
          activity: {
            name: args.join(' '),
            type: 0,
            url: "https://twitch.tv/ToXicGMDyt"
          }
        })
    const embed = new Discord.RichEmbed()
    
    .addField("Cambiando mi estado a ", "<a:Streaming:446126986482417676>Streaming")
    .addField('Con el jugando:', args.join(' '))
    .setTimestamp()
    .setColor(0x36393e)
    .setThumbnail('https://cdn.discordapp.com/emojis/446126986482417676.gif')
    .setFooter(`SetGame` , bot.user.avatarURL, true)
    message.channel.send({ embed });
   
}
exports.config = {
  command: "setstream"
}