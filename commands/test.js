const { MessageEmbed } = require('discord.js'),
  db = require('quick.db'),
  ms = require('parse-ms');

exports.run = async (client, message, args, tools) => {
 var langg
 var lang = db.fetch(`guildLang_${message.guild.id}`)
 if (lang === null) langg = 'en'
  else lang = lang       
  
  const embed = new MessageEmbed()
   .setDescription(`mi lenguaje es: ${lang}` )
message.channel.send(embed)
}
exports.config = {
  command: "test",
  aliases: ["test", "test"],
  category: "beta",
  description: " ",
  usage: " "
};