const { MessageEmbed } = require('discord.js'),
  db = require('quick.db'),
  ms = require('parse-ms');

exports.run = async (client, message, args, tools) => {

 var langg
 const idioma = await db.fetch(`guildLang_${message.guild.id}`)
 if (idioma === null) langg = 'es'
  else langg = idioma       
 const lang = require(`../langs/${langg}.json`) 
 
 let setLang = args[0] 
 if(!setLang) {
 return message.channel.send({
            embed: {
                title: "ERROR!",
                color: 0xE50000,
                description: lang.langR.langR1
            }
        })
 }
  
 if (!['en', 'es'].includes(args[0])) return message.channel.send({
            embed: {
                title: "ERROR!",
                color: 0xE50000,
                description: lang.langR.langR2
            }
        })
  
  const setL = setLang
   db.set(`guildLang_${message.guild.id}`, setL)
 var langg
 const idioma2 = await db.fetch(`guildLang_${message.guild.id}`)
 if (idioma2 === null) langg = 'es'
else langg = idioma2
  
 const newLang = require(`../langs/${langg}.json`)   
 
  const embed = new MessageEmbed()
    .setTitle(newLang.titleComp + '\n'+ newLang.lang.langUpdate)
   .setDescription(newLang.lang.translate)
message.channel.send(embed)
}
exports.config = {
  command: "setlang",
  aliases: ["setidioma", "setlang"],
  category: "beta",
  description: " ",
  usage: " "
};