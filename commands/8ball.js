const Discord = require('discord.js')

exports.run = async (bot, message, args) => {
  if(args[0] == "help"){
  const help = new Discord.MessageEmbed()
      .addField('Uso:', "Yu-8ball <Tu pregunta>")
      .setColor(0x36393e)
      .addField('Descripción', "El bot responde a tus preguntas<a:blobdisco:446141852639559697>")
      .addField('Ejemplos:', "Yu-8ball Ella me ama?\nYu-8ball Algun dia me amara?")
      message.channel.send(help);
      return;
    }
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
module.exports.config = {
 command: "8ball", 
 aliases: ['8ball', '8'] 
}