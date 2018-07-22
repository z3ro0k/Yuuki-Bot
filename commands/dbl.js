const snekfetch = require("snekfetch");
const Discord = require('discord.js') 
const apis = require('../data/apis.json')
const db = require('quick.db')
exports.run = async (bot ,message, args, func) => { 
  let bott = message.mentions.users.first() || bot.users.get(args[0]) 
  
 var langg
 const idioma = await db.fetch(`guildLang_${message.guild.id}`)
 if (idioma === null) langg = 'es'
 else langg = idioma       
  
 const lang = require(`../langs/${langg}.json`) 
 
  if (!args[0]) {
        bot.tools.embed(message.channel, lang.dbl.men);
        return;
    } else 
    if (bott == message.author) {
         bot.tools.embed(message.channel, lang.dbl.uB)
        return;
    } else
  if(!bott.bot) {
      bot.tools.embed(message.channel, '**<:Not:463200957396680714> No uuuu **')
        return;
  }
 
  var request = require("request");
            var options = {
                method: 'GET',
                url: `https://discordbots.org/api/bots/${bott.id}/`,
                json: true,
                headers: {
                    auth: `${apis.DBLAPI}`
                }
            };  
  request(options, function(error, response, body) {
try {
   var certified = body.certifiedBot
    if(certified === false) certified = '<:Not:463805182648778783> No'
    if(certified === true) certified = '<:Certified:464296361899327498> Yes'
  
    const embed = new Discord.MessageEmbed()
      .setColor(0x36393e)
      .setThumbnail(`https://cdn.discordapp.com/avatars/${body.clientid}/${body.avatar}.png`)
      .setTitle("Discord Bot List Information")
      .addField("ID", body.clientid, true)
      .addField("Username", body.username, true)
      .addField("Discriminator", body.discriminator, true)
      .addField("Short Description", body.shortdesc, true)
      .addField("Library", body.lib, true)
      .addField("Prefix", body.prefix, true)
      .addField("Upvotes", body.points, true)
      .addField("Server Count", body.server_count, true)
      .addField("Certified Bot", certified, true)
      .addField("Tags", body.tags.join(', '), true)
      .addField("Owner(s)", `<@${body.owners.join(">, <@")}>`, true)
      .addField("Links", `${body.invite.length !== 0 ? `[Invite](${body.invite}) | ` : ""}${body.website.length !== 0 ? `[Website](${body.website}) | ` : "" }${body.support.length !== 0 ? `[Support Server](https://discord.gg/${body.support})` : ""}`, true)
      .setTimestamp()
      message.channel.send({ embed });
  } catch(err) {
    message.channel.send(`El bot que has mencionado no se encuentra en la lista de discordbotlist. (o hubo un error interno! Oops!)`)
  }
  })
}
exports.config = {
    command: "dbl",
    aliases: ["dblinfo"],
    category: "util",
    description: "",
    usage: "Yu!dbl @Yuuki#3102 "
};