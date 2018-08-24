const Discord = require('discord.js')
const db = require('quick.db')
const tools = require('../functions.js')

exports.run = async (bot, messageReaction, user) => {


  if (messageReaction.emoji.toString() !== '⭐') return; 
  

  let item = await db.fetch(`starItem_${messageReaction.message.id}`)
  let target = await db.fetch(`starboard_${messageReaction.message.guild.id}`)
  let requiredRole = await db.fetch(`starStarter_${messageReaction.message.guild.id}`)
  let channel = messageReaction.message.guild.channels.get(target.channel) || false;
  
 if (!target.enabled) return; 
 if (!channel === null) return;
  
  const embed = new Discord.MessageEmbed()
      .setColor(0x36393e)
      .setTitle('Starboard')
  
  if (messageReaction.message.author.id === user.id) {
    embed.setFooter('¡No puedes reacionar a tu propio mensaje!')
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
      .addField('Estrellas', '`⭐1`', true)
      .setFooter(`Reactivos: ${user.tag}`)
      .addField('Autor', messageReaction.message.guild.members.get(messageReaction.message.author.id), true)
    
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
      .addField('Estrellas', `\`⭐${newItem.reactions}\``, true)
      .setFooter(`Reactivos: ${newItem.reactants.join(', ')}`)
      .addField('Autor', messageReaction.message.guild.members.get(newItem.author.id), true)
      
      if (newItem.attachment) embed.setImage(newItem.attachment)
    
    bot.channels.get(target.channel).messages.get(newItem.embedID).edit(embed)
    
    db.set(`starItem_${msgID}`, newItem)
    
  } else if (!messageReaction.message.guild.members.get(user.id).roles.find(role => role.name === 'Moderators' || '+' || 'Mods')) {
    embed.setFooter(`Lo sentimos, solo las personas con el rol ${requiredRole} pueden ser los primeros en destacar el mensaje.`)
    return messageReaction.message.channel.send(embed).then(msg => {
      msg.delete({timeout: 10000})
    })
  }
  

}