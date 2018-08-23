const { MessageEmbed } = require('discord.js'),
  db = require('quick.db')

exports.run = async (client, message, args) => {
  var langg = await client.tools.Lang(message.guild)    
 const lang = require(`../langs/${langg}.json`) 
 
 let Prefix = args[0] 
 if(!Prefix) {
 
   client.tools.GetGuildPrefix(message.channel, message.guild)
   
 } else {

 const ids = client.options.owner
   const perms = ids.includes(message.author.id) || message.member.hasPermission('ADMINISTRATOR') 
  
  if(!perms) return message.channel.send(lang.noP.ban);
   
  const setP = Prefix
   client.tools.UpdateGuildPrefix(message.channel, message.guild, setP)
 }
}
exports.config = {
  command: "sprefix",
  aliases: ["setprefix", "prefix", "newprefix"],
  category: "beta",
  description: " ",
  usage: " "
};