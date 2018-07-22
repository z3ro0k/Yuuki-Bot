const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
exports.run = async (bot, message, args) => {

const pregunta = args.join(' ')                              
var rpts = ["Sí", "No", "¿Por qué?", "Por favor", "Tal vez", "No sé", "Definitivamente?", " ¡Claro! "," Sí "," No "," Por supuesto! "," Por supuesto que no "];
var langg
 const idioma = await db.fetch(`guildLang_${message.guild.id}`)
 if (idioma === null) langg = 'es'
  else langg = idioma       
 const lang = require(`../langs/${langg}.json`) 
 
  if (!pregunta) {
  const embed = new MessageEmbed()
   .setDescription(`${lang.BALL.usage[0]} **${message.author.username}** ${lang.BALL.usage[1]}`)
   .setColor(0x36393e)
  message.channel.send( embed ); 
  return;
}
  const BallEmbed = new MessageEmbed()
    .setColor(0x36393e)
    .setThumbnail('https://cdn.discordapp.com/emojis/396446449832951809.gif')
    .setAuthor('8ball', 'https://findicons.com/files/icons/1700/2d/512/8_ball.png')
    .addField('Pregunta:', pregunta)
    .addField('Respuesta:', rpts[Math.floor(Math.random() * rpts.length)])
  message.channel.send( BallEmbed );          
}
exports.config = {
  command: "8ball",
  aliases: ["8ball", "8"],
  category: "fun",
  description: "El bot responde a tu pregunta",
  usage: "Yu!8ball Es un test?"
};