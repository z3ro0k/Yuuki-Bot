const Discord = require('discord.js')
const db = require('quick.db')
exports.run = async (bot, message, args) => {
   var langg
 const idioma = await db.fetch(`guildLang_${message.guild.id}`)
 if (idioma === null) langg = 'es'
  else langg = idioma       
 const lang = require(`../langs/${langg}.json`)
 
//let user = message.mentions.users.first() || bot.users.get(args[0]) || message.author 
let user = {};
	if(message.mentions.users.first()) user = message.mentions.users.first();
	else if(args.join(' ') && bot.tools.getUser(message, args.join(' '))) user = bot.tools.getUser(message, args.join(' ')).user;
	else user = message.author;
 if (!user.avatarURL) return message.channel.send(`${lang.noA[0]}**${user.tag}**${lang.noA[1]}`);
 
 
  const embed = new Discord.MessageEmbed()
  .setImage(user.displayAvatarURL({ size: 2048 }))
  .addField(`${user.username}'s Avatar`, `[${lang.Dow}](${user.displayAvatarURL()})`)
  .setThumbnail(user.displayAvatarURL({ size: 2048 }))
  .setColor(0x36393e)
 message.channel.send({embed})
  
  }

exports.config = {
  command: "avatar",
  aliases: ["avatar", "avat"],
  category: "info",
  description: "El bot manada el avatar del usuario mencioando",
  usage: "Yu!avatar @ToXicGMDyt#7319"
};