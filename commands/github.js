var req = require("request")
const Discord = require('discord.js');
const moment = require('moment');

exports.run = async (bot, message, args) => {
  
  var langg = await bot.tools.Lang(message.guild)    
  const lang = require(`../langs/${langg}.json`) 
  
let name = args[0]
	req('https://api.github.com/users/' + name, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:54.0) Gecko/20100101 Firefox/54.0' }}, (e, r, b)=> {
		let contenu = JSON.parse(b)
		if(contenu.message === "Not Found") {
			message.channel.send(lang.Github.nE)
		} if (!name) {
			message.channel.send(lang.Github.args)
		} else {
      console.log(contenu)
	const embed = new Discord.MessageEmbed()
		embed.setAuthor(bot.user.username, bot.user.avatarURL())
		embed.setColor(0x00AE86)
		embed.setFooter(bot.user.username, bot.user.avatarURL);
		embed.addField(contenu.login + " (" + contenu.type + ")", contenu.bio)     
		embed.addField(lang.Github.infoEmbed.f, contenu.followers, true)
		embed.addField(lang.Github.infoEmbed.F, contenu.following, true)
    embed.addField(lang.Github.infoEmbed.C , moment(contenu.created_at).format("D MMMM Y"), true)
    embed.addField(lang.Github.infoEmbed.L , contenu.location || 'Not Set', true)
    embed.addField(lang.Github.infoEmbed.Com , contenu.company || 'Nothing', true)  
    embed.addField(contenu.public_repos + lang.Github.infoEmbed.rP , "[Check them](https://github.com/" + name + "?tab=repositories)", true)	
		embed.addField("Links", `${contenu.blog === null ?lang.Github.infoEmbed.WebN : '[Website](' + contenu.blog  + ')'} | [Github](https://github.com/${contenu.login}') `)	
		embed.setThumbnail(contenu.avatar_url)
		embed.setTimestamp()
		message.channel.send({embed});
		}
	})
}
exports.config = {
  command: "github",
  aliases: ["github", "github"],
  category: "info",
  description: "Te manda la lista de servidores donde esta Yuuki",
  usage: "Yu!guilds"
};
