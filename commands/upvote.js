const Discord = require('discord.js')
exports.run = async (client, message, args ) => {
  
	 let emoji = client.emojis.find(e => e.name === 'Upvote');
  
  
    let embed = new Discord.MessageEmbed()
   .setTitle('Vote System')
   .setDara que sirve', '• El bot sera más conocido.')
   .addField('• Para que el bot cresca', 'Cuenta con ' + client.guilds.size + ' guilds actuales')
   .addField(`${emoji}`, '• ¡Obtienes más características increíbles todos los días!')
   .addField('Discord BOts List', a)
   .addField('Upvote', '[`here`](https://discordbots.org/bot/365949788807757834) | [`WebSite`](https://yuukibot.github.io/) | [`GITHUB`](https://yuukibot.github.io/)')
   .setColor(0x36393e)
   .setThumbnail(client.user.avatarURL())
   message.channel.send({embed})
	}
exports.config = {
  command: "upvote",
  aliases: ['upvote', 'vote']
}
