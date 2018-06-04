const Discord = require('discord.js')
exports.run = async (client, message, args ) => {
  
	 let emoji = client.emojis.find(e => e.name === 'Upvote');
   let embed = new Discord.MessageEmbed()
   .setTitle('Veo que quieres votar por el Bot. Upvoting me permite:')
   .addField('Para que sirve', '• Para que el bot cresca y tenga mas usuarios')
   .addField('• El bot es más conocido', + client.guilds.size + ' Server actuales')
   .addField(`${emoji}`, '• ¡Obtienes más características increíbles todos los días!')
   .addField('Upvote', '[here](https://discordbots.org/bot/365949788807757834) | [WebSite](https://yuukibot.github.io/) 
   .setColor(0x36393e)
   .setThumbnail(client.user.avatarURL)
   message.channel.send({embed})
	}
exports.config = {
  command: "upvote",
  aliases: ['upvote', 'vote']
}
