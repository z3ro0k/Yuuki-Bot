const { MessageEmbed } = require('discord.js'),
  db = require('quick.db'),
  ms = require('parse-ms');

exports.run = async (client, message, args, tools) => {

 var langg
 const idioma = await db.fetch(`guildLang_${message.guild.id}`)
 if (idioma === null) langg = 'es'
  else langg = idioma       
 const lang = require(`../../Lang/${langg}.json`)
 
 let setLang = args[0] 
 if (!['en', 'es'].includes(args[0])) return message.channel.send({
            embed: {
                title: "ERROR!",
                color: 0xE50000,
                description: lang.langR.langR1
            }
        })
  
  const embed = new MessageEmbed()
   .setDescription(`mi lenguaje en este servidor es: **${langg}**` )
message.channel.send(embed)
}
exports.config = {
  command: "setlang",
  aliases: ["setidioma", "setlang"],
  category: "beta",
  description: " ",
  usage: " "
};