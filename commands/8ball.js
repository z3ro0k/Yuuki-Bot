const Discord = require('discord.js')

exports.run = async (bot, message, args) => {

const pregunta = args.join(' ')                              
var rpts = ["Sí", "No", "¿Por qué?", "Por favor", "Tal vez", "No sé", "Definitivamente?", " ¡Claro! "," Sí "," No "," Por supuesto! "," Por supuesto que no "];

  if (!pregunta) {
  message.reply(`Escriba una pregunta.`); 
  return;
}
  const BallEmbed = new Discord.MessageEmbed()
    .setColor(0x00FFFF)
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