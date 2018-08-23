const Discord = require('discord.js')
const apis = require('../data/apis.json')
const db = require('quick.db')

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
   var options2 = {
                method: 'GET',
                url: `https://discordbot.world/api/bot/${client.user.id}/info`,
                json: true,
                headers: {
                    auth: `b7a7c76009a2ee92c5335102c41daeb58566f5678ab744f52cd4be41390f3edbd3a903d92fb4b7f111925a4b9308f87e`
                }
            }; 
   var options3 = {
                method: 'GET',
                url: `https://bots.discord.pw/api/bots/${client.user.id}`,
                json: true,
                headers: {
                    Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIzMjIyMDM4NzkyMDg5MTA4NDkiLCJyYW5kIjo4NTksImlhdCI6MTUzNTAxMzExNH0.B9zQUS5ho7EfxK7EyOhal42fg0sStg1hi-kCV8ZG8o0`
                }
            }; 
  request(options, function(error, response, body) {
    request(options2, function(error, response, body2) {
      request(options3, function(error, response, body3) {
    
    var certified = body.certifiedBot
    if(certified === false) certified = '<:Not:463805182648778783> No'
    if(certified === true) certified = '<:Certified:464296361899327498> Yes'
    //console.log(body3)
    let embed = new Discord.MessageEmbed()
   .setTitle('Vote System')
   .setDescription(`**Vote system Características**\n• El bot sera más conocido.\n• Para que el bot cresca Cuenta con **${client.guilds.size}** guilds actuales\n• ¡Obtienes más características increíbles todos los días!`)
   .addField('DBL Information',  `Upvotes: ${emoji}${body.points}\nCertified Bot: ${certified}\nLinks: ${body.invite.length !== 0 ? `[\`Invite\`](${body.invite}) | ` : ""}${body.website.length !== 0 ? `[\`Website\`](${body.website}) | ` : "" }${body.support.length !== 0 ? `[\`Support Server\`](https://discord.gg/${body.support})` : ""} | [\`Vote\`](https://discordbots.org/bot/365949788807757834/vote)`)
   .addField('Discord Bot World Information',  `Upvotes: ${emoji}${body2.stats.likes}\nLinks: [\`Invite\`](${body2.invite}) | [\`Website\`](${body2.website}) |  [\`Support Server\`](${body2.discord}) | [\`Vote\`](https://discordbot.world/bot/365949788807757834)`)
   .setColor(0x36393e)
   .setThumbnail(client.user.avatarURL())
   message.channel.send({embed})
      })
    })
	})
}
exports.config = {
  command: "upvote",
  aliases: ['upvote', 'vote']
}
