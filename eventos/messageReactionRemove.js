const Discord = require('discord.js')
const db = require('quick.db')
const tools = require('../functions.js')

exports.run = async (bot, messageReaction, user) => {
if (messageReaction.emoji.toString() !== '⭐') return; // Incorrect Emoji

  var langg = await bot.tools.Lang(messageReaction.message.guild)   
  const lang = require(`../langs/${langg}.json`) 
 
  let prefix = await bot.tools.GuildPrefix(messageReaction.message.guild)
  
  let item = await db.fetch(`starItem_${messageReaction.message.id}`)
  let target = await db.fetch(`starboard_${messageReaction.message.guild.id}`)
  let channel = messageReaction.message.guild.channels.get(target.channel) || false;
  
  // Return Statements
  if (!target.enabled) return; // Not Enabled
  if (!channel) return; // No Channel
  
    let msgID = messageReaction.message.id;
    
    
    await db.subtract(`starItem_${msgID}`, 1, { target: '.reactions' })
    let newItem = await db.fetch(`starItem_${msgID}`)
    if (newItem.reactants instanceof Array) newItem.reactants.splice(newItem.reactants.indexOf(user.tag), 1)

    const embed = new Discord.MessageEmbed()
      .setColor(0x36393e)
      .setTitle(lang.messageReactionR.title)
      .setDescription(newItem.message.content)
      .addField(lang.messageReactionR.embed.field1, `\`⭐${newItem.reactions}\``, true)
      .addField(lang.messageReactionR.embed.field2, messageReaction.message.guild.members.get(newItem.author.id), true)
    
    if (newItem.reactants instanceof Array) embed.setFooter(`${lang.messageReactionR.embed.footer} ${newItem.reactants.join(', ')}`)
    if (newItem.attachment) embed.setImage(newItem.attachment)
    bot.channels.get(target.channel).messages.get(newItem.embedID).edit(embed)
    
    db.set(`starItem_${msgID}`, newItem)

}