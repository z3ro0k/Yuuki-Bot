const Discord = require('discord.js')
 const embed = new Discord.MessageEmbed()
 
exports.run = async (bot, msg, args) => {
 const suffix = args.join(' ')
  if (!msg.member.voiceChannel) return msg.channel.send('<:tick:445752370324832256> You are not on a voice channel.');
			if (!msg.member.voiceChannel.joinable) return msg.channel.send("<:tick:445752370324832256> I\'m unable to play music in this channel.");
			if (!suffix) {
       
				embed.setDescription("• Insert a correct radio to play.\n\n`[-]` **Available radios:** `Rap, jazz & dubstep`");
				embed.setColor("#b92727");
				return msg.channel.send({ embed });
			}
			let radio; // Empty Variable
			if (suffix.toLowerCase() == "rap") {
				radio = "A-RAP-FM-WEB";
			} else if (suffix.toLowerCase() == "jazz") {
				radio = "WineFarmAndTouristradio";
			} else if (suffix.toLowerCase() == "dubstep") {
				radio = "ELECTROPOP-MUSIC";
			} else {
				embed.setDescription("• Insert a correct radio to play.\n\n`[-]` **Available radios:** `Rap, jazz & dubstep`");
				embed.setColor("#b92727");
				return msg.channel.send({ embed });
			}
			msg.member.voiceChannel.join().then(conexion =>{
				require('http').get("http://streaming.radionomy.com/" + radio, (res) => {
					 conexion.playStream(res);
					embed.setColor("#b92727");
					embed.setDescription("<:tick2:445752599631888384> Playing correctly!");
					msg.channel.send({ embed });
				});
			}).catch(err => "<:tick:445752370324832256> **Error:** ```\n" + err + "```");
			}
module.exports.config = {
  command: "radiotest",
  aliases: ['radiotest']
}