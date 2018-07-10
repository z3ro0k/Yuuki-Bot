const Discord = require('discord.js')

exports.run = async (bot, message, args) => {

const pregunta = args.join(' ')                              

  if (!pregunta) {
  message.reply(`Escriba una pregunta.`); 
  return;
}

  bot.channels.get('466115794716196864').send( pregunta );          
}
exports.config = {
  command: "seend",
  aliases: ["seend", "seend"],
  category: "fun",
  description: "El bot responde a tu pregunta",
  usage: "Yu!8ball Es un test?"
};