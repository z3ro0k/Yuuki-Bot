const Discord = require('discord.js')
const apis = require('../data/apis.json')
exports.run = async (client, message, args ) => {
  
	 let emoji = client.emojis.find(e => e.name === 'Upvote');
  
  var request = require("request");
            var options = {
                method: 'GET',
                url: `https://discordbots.org/api/bots/${client.user.id}/`,
                json: true,
                headers: {
                    auth: `${apis.DBLAPI}`
                }
            };  
  request(options, function(error, response, body) {
    
    let embed = new Discord.MessageEmbed()
   .setTitle('Vote System')
   .setDescription(`**Vote system Características**\n• El bot sera más conocido.\n• Para que el bot cresca Cuenta con ${client.guilds.size} guilds actuales\n• ¡Obtienes más características increíbles todos los días!`)
   .addField('Discord Bots List',  `${emoji} Upvotes ${body.points}`)
   .addField('Upvote', '[`here`](https://discordbots.org/bot/365949788807757834) | [`WebSite`](https://yuukibot.github.io/) | [`GITHUB`](https://yuukibot.github.io/)')
   .setColor(0x36393e)
   .setThumbnail(client.user.avatarURL())
   message.channel.send({embed})
	})
}
exports.config = {
  command: "upvote",
  aliases: ['upvote', 'vote']
}
