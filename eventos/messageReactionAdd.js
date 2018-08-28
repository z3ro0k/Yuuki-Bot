const Discord = require('discord.js')
const db = require('quick.db')
const tools = require('../functions.js')

exports.run = async (bot, messageReaction, user) => {

 

  if (messageReaction.emoji.toString() !== '⭐') return; 
  
  var langg = await bot.tools.Lang(messageReaction.message.guild)   
  const lang = require(`../langs/${langg}.json`) 
 
  let prefix = await bot.tools.GuildPrefix(messageReaction.message.guild)
  
  let item = await db.fetch(`starItem_${messageReaction.message.id}`)
  let target = await db.fetch(`starboard_${messageReaction.message.guild.id}`)
  let requiredRole = await db.fetch(`starStarter_${messageReaction.message.guild.id}`)
  let channel = messageReaction.message.guild.channels.get(target.channel) || false;
  
 if (!target.enabled) return; 
 if (!channel === null) return;
  
  const embed = new Discord.MessageEmbed()
      .setColor(0x36393e)
      .setTitle(lang.messageReaction.title)
  
  if (messageReaction.message.author.id === user.id) {
    embed.setFooter(lang.messageReaction.author)
    return messageReaction.message.channel.send(embed).then(msg => {
      msg.delete({timeout: 10000})
    })
  }
  
  let hasRole;
  if (requiredRole === null) hasRole = true;
  else if (messageReaction.message.guild.members.get(user.id).roles.find(role => role.name === requiredRole)) hasRole = true;
  else hasRole = false;
  
  if (item === null && hasRole) { 
    db.set(`starItem_${messageReaction.message.id}`, { reactions: 1, reactants: [user.tag], message: { id: messageReaction.message.id, content: messageReaction.message.content }, author: { id: messageReaction.message.author.id, tag: messageReaction.message.author.tag } })
    
      embed.setDescription(messageReaction.message.content)
      .addField(lang.messageReaction.embed.field1, '`⭐1`', true)
      .setFooter(`${lang.messageReaction.embed.footer} ${user.tag}`)
      .addField(lang.messageReaction.embed.field2, messageReaction.message.guild.members.get(messageReaction.message.author.id), true)
    
    if (messageReaction.message.attachments.first()) {
      db.set(`starItem_${messageReaction.message.id}`, messageReaction.message.attachments.first().url, { target: '.attachment' })
      embed.setImage(messageReaction.message.attachments.first().url)
    }
    
    channel.send(embed).then(msg => {
      db.set(`starItem_${messageReaction.message.id}`, msg.id, { target: '.embedID' })
    })
  } else if (item !== null) {
    console.log(item)
    let msgID = messageReaction.message.id;
    

    await db.add(`starItem_${msgID}`, 1, { target: '.reactions' })
    let newItem = await db.fetch(`starItem_${msgID}`)
    newItem.reactants.push(user.tag)

      embed.setDescription(newItem.message.content)
      .addField(lang.messageReaction.embed.field1, `\`⭐${newItem.reactions}\``, true)
      .setFooter(`${lang.messageReaction.embed.footer} ${newItem.reactants.join(', ')}`)
      .addField(lang.messageReaction.embed.field2, messageReaction.message.guild.members.get(newItem.author.id), true)
      
      if (newItem.attachment) embed.setImage(newItem.attachment)
    
    bot.channels.get(target.channel).messages.get(newItem.embedID).edit(embed)
    
    db.set(`starItem_${msgID}`, newItem)
    
  } else if (!messageReaction.message.guild.members.get(user.id).roles.find(role => role.name === 'Moderators' || '+' || 'Mods')) {
    embed.setFooter(lang.messageReaction.noPerms.message.replace('{{Role}}', requiredRole))
    return messageReaction.message.channel.send(embed).then(msg => {
      msg.delete({timeout: 10000})
    })
  }
  

}