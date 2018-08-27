const db = require('quick.db');
const Discord = require('discord.js');
const fs = require('fs');

exports.run = async (client, message, args) => {
  
 var langg = await client.tools.Lang(message.guild)    
 const lang = require(`../langs/${langg}.json`) 
 
 let prefix = await client.tools.GuildPrefix(message.guild)
 
  const embed = new Discord.MessageEmbed()
      .setColor(0x36393e)
      .setTitle('Starboard')
  

  if (args[0] && args[0].toLowerCase() === 'set') {
    if (!message.member.hasPermission('ADMINISTRATOR')) return embed.setFooter(lang.noP.kick), message.channel.send(embed);
    
    if (!message.mentions.channels.first()) return embed.setFooter(lang.starboard.setC.replace('{{prefiz}}', prefix)), message.channel.send(embed);
    db.set(`starboard_${message.guild.id}`, { enabled: true, channel: message.mentions.channels.first().id })
    db.set(`starboardChannel_${message.guild.id}`, message.mentions.channels.first().id)
    embed.setFooter(lang.starboard.cS)
    return message.channel.send(embed)
  }
  

  if (args[0] && args[0].toLowerCase() === 'role') {
    if (!message.member.hasPermission('ADMINISTRATOR')) return embed.setFooter(lang.noP.kick), message.channel.send(embed);
    if (!args[1]) return embed.setFooter(lang.starboard.setR.replace('{{prefix}}', prefix)), message.channel.send(embed);
    if (args[1].toLowerCase() === 'remove') {
      db.delete(`starStarter_${message.guild.id}`)
      embed.setFooter(lang.starboard.removeR)
      return message.channel.send(embed)
    } else {
      args = args.slice(1).join(' ')
      db.set(`starStarter_${message.guild.id}`, args)
      embed.setFooter(`${lang.starboard.roleN} "${args}".`)
      return message.channel.send(embed)
    }
  }
  
  let enabled = await db.fetch(`starboard_${message.guild.id}`, { target: '.enabled' })
  let requiredRole = await db.fetch(`starStarter_${message.guild.id}`)
  if (requiredRole === null) requiredRole = lang.starboard.rolNot
  if (enabled === null || !enabled) {
    embed.setFooter(lang.starboard.channelNot.replace('{{prefix}}', prefix))
    return message.channel.send(embed)
  }
  
  let starboard = await db.fetch(`starboard_${message.guild.id}`)
  embed.addField(lang.starboard.c, client.channels.get(starboard.channel), true)
  .addField(lang.starboard.ena, `${starboard.enabled}`, true)
  .addField(lang.starboard.rolR, requiredRole, true)
  .setFooter(lang.starboard.note.replace('{{prefix}}', prefix))
  
  message.channel.send(embed)
  
}
exports.config = {
  command: "starboard",
  aliases: ["starboard"]
}