const Discord = require('discord.js');

exports.run = (bot, message, args, func) => {
let server = message.guild 
let rolee = message.mentions.roles.first() || message.guild.roles.find('name', args[0])
if (!rolee) {
  message.channel.send('**Please mention a Role**\n *>roleinfo @role*')
  return;
}
  const embed= new Discord.RichEmbed() 
    .addField('Role Name', rolee.name)
    .addField('Position', rolee.position = rolee.position + 1)
    .addField('HexColor', rolee.hexColor)
    .addField('Mentionable	', rolee.mentionable)
    .addField('Hoist', rolee.hoist)
    .setColor(rolee.color)
    .setThumbnail(server.iconURL)
    .setAuthor(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
  message.channel.send({ embed })
  
}
module.exports.config = {
  command: "rinfo"
}