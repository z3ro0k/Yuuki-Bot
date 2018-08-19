const { MessageEmbed, MessageAttachment  } = require('discord.js')
exports.run = async (client, member) => {

  let channelID = await client.tools.getWelcomeChannel(member.guild)  
   var sourceChannel = member.guild.channels.get(channelID)
  if(!sourceChannel) return;
 /*
  if(member.user.bot) {
  var embed = new MessageEmbed()
	    .setAuthor("Bot Left")
	    .setColor(0x36393e)
	    .setTimestamp()
	    .setDescription(`The bot **${member.user.tag}** has left the server\nThere are now **${member.guild.members.size} users** within this server!`)
      .setThumbnail(member.user.displayAvatarURL())
      .setFooter(member.guild.name, member.guild.iconURL())
	 return sourceChannel.send({ embed: embed }) 
  } 
  
  let text
 const textjoin = await client.tools.leaveText(member.guild) 
  text = textjoin.replace('{user:tag}', member.user.tag).replace('{server:membercount}', member.guild.memberCount).replace('{server:name}', member.guild.name).replace('{user:mention}', member.user).replace('{user:username}', member.user.username)

	var embed = new MessageEmbed()
	    .setAuthor("User Left")
	    .setColor(0x36393e)
	    .setTimestamp()
	    .setDescription(text)
      .setThumbnail(member.user.displayAvatarURL())
      .setFooter(member.guild.name, member.guild.iconURL())
	 return sourceChannel.send({ embed: embed })
  */
  sourceChannel.send(new MessageAttachment(await client.idiotAPI.goodbye("anime", member.user.bot, member.user.displayAvatarURL({ format: "png", size: 128 }), encodeURIComponent(member.user.tag), null, null))).catch(console.error);
}