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
    
    var certified = body.certifiedBot
    if(certified === false) certified = '<:Not:463805182648778783> No'
    if(certified === true) certified = '<:Certified:464296361899327498> Yes'
    
    let embed = new Discord.MessageEmbed()
   .setTitle('Vote System')
   .setDescription(`**Vote system Características**\n• El bot sera más conocido.\n• Para que el bot cresca Cuenta con ${client.guilds.size} guilds actuales\n• ¡Obtienes más características increíbles todos los días!`)
   .addField('Discord Bots List',  `Upvotes: ${emoji}${body.points}\nCertified Bot: ${certified}\nLinks: ${body.invite.length !== 0 ? `[\`Invite\`](${body.invite}) | ` : ""}${body.website.length !== 0 ? `[\`Website\`](${body.website}) | ` : "" }${body.support.length !== 0 ? `[\`Support Server\`](https://discord.gg/${body.support})` : ""}`)

   .setColor(0x36393e)
   .setThumbnail(client.user.avatarURL())
   message.channel.send({embed})
	})
}
exports.config = {
  command: "upvote",
  aliases: ['upvote', 'vote']
}
