const { MessageEmbed } = require('discord.js')
exports.run = (client, member) => {
  
   let channelID = client.provider.get(member.guild.id, 'logC')
   var sourceChannel = member.guild.channels.get(channelID)
  if(!sourceChannel) return;
 
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
 const textl = client.provider.get(member.guild.id, 'TextL')
    if(textl === undefined) text = `${member.user} (**${member.user.tag}**) has joined the server\nThere are now **${member.guild.members.size}** users within this server!`
    else text = textl.replace('{user:tag}', member.user.tag).replace('{server:membercount}', member.guild.memberCount).replace('{server:name}', member.guild.name).replace('{user:mention}', member.user).replace('{user:username}', member.user.username)

	var embed = new MessageEmbed()
	    .setAuthor("User Left")
	    .setColor(0x36393e)
	    .setTimestamp()
	    .setDescription(text)
      .setThumbnail(member.user.displayAvatarURL())
      .setFooter(member.guild.name, member.guild.iconURL())
	 return sourceChannel.send({ embed: embed })
  
}