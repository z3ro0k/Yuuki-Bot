const ascii = require('figlet');
const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args, tools) => {
  
 var langg
 const idioma = await db.fetch(`guildLang_${message.guild.id}`)
 if (idioma === null) langg = 'es'
  else langg = idioma       
 const lang = require(`../langs/${langg}.json`) 
  
  if (!args.join(' ')) return message.channel.send(lang.ASCII.args)
  if(message.content.split(' ').slice(1).join(' ').length > 14) {
  message.channel.send(lang.ASCII.c14)
    return;
  }
   ascii(args.join(' '), {
        horizontalLayout: 'fitted',
        verticalLayout: 'fitted'
      },
      function(err, data) {
        if (err) {
          console.error(err)
        }
        message.delete(1)
        message.channel.send(data, {
          code: 'text'
        })
      })
}
exports.config = {
  command: "ascii",
  aliases: ["ascii", "ascii-text"],
  category: "fun",
  description: "convierte un tus argumentos a ascii",
  usage: "Yu!ascii Hello  world"
};