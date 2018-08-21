const { MessageEmbed } = require('discord.js'),
  db = require('quick.db')

exports.run = async (client, message, args) => {

 var langg = await client.tools.Lang(message.guild)    
 const lang = require(`../langs/${langg}.json`) 
 
 let setLang = args[0] 
 if(!setLang) {
 
   client.tools.getLang(message.channel, message.guild)
   
 } else {
   const ids = client.options.owner
  const perms = ids.includes(message.author.id) || message.member.hasPermission('ADMINISTRATOR') 
  
  if(!perms) return message.channel.send(lang.noP.ban);
   
 if (!['en', 'es'].includes(args[0])) return message.channel.send({
            embed: {
                title: "ERROR!",
                color: 0xE50000,
                description: lang.langR.langR2
            }
        })
  
  const setL = setLang
  client.tools.langU(message.channel, message.guild, setL)
 }
}
exports.config = {
  command: "setlang",
  aliases: ["setidioma", "lang"],
  category: "beta",
  description: " ",
  usage: " "
};