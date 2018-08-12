var req = require("request")
const Discord = require('discord.js');
const moment = require('moment');

exports.run = async (bot, message, args) => {
  
let name = args[0]
	req('https://api.github.com/users/' + name, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:54.0) Gecko/20100101 Firefox/54.0' }}, (e, r, b)=> {
		let contenu = JSON.parse(b)
		if(contenu.message === "Not Found") {
			message.channel.send("This user doesn´t exist")
		} if (!name) {
			message.channel.send("Please provide a user/org name")
		} else {
	const embed = new Discord.MessageEmbed()
		embed.setTitle("Github API")
		embed.setAuthor(bot.user.username, bot.user.avatarURL)
		embed.setColor(0x00AE86)
		embed.setFooter(bot.user.username, bot.user.avatarURL);
		embed.addField(contenu.login + " (" + contenu.type + ")", contenu.bio)
		embed.addField(contenu.public_repos + " public repos", "[Check them](https://github.com/" + name + "?tab=repositories)")
		embed.addField("Followers", contenu.followers)
		embed.addField("Following", contenu.following)
		embed.addField("Created on", moment(contenu.created_at).format("D MMMM Y"))
		embed.addField("Links", "[Website](" + contenu.blog + ")\n[Github](https://github.com/" + name + ")")	
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
