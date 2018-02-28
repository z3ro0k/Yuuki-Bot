const Discord = require('discord.js');

exports.run = (bot, message, args, func) => {
let server = message.guild
let canal = message.mentions.channels.first()
if (!canal) {
  message.channel.send('**Please mention a Channel**\n *>channelinfo #channel')
  return; 
}

  const embed= new Discord.RichEmbed() 
    .addField('Channel Name', canal.name)
    .addField('Position', canal.position = canal.position + 1)
    .addField('Topic', canal.topic)
    .addField('Type', canal.type)
    .addField('Category', canal.parent)
    .addField('Channel ID', canal.id)
    .setColor(0xFFFFFF)
    .setThumbnail(server.iconURL)
    .setAuthor(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
  
  message.channel.send({ embed })
  
}
module.exports.config = {
  command: "cinfo"
}