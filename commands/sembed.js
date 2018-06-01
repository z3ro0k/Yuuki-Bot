const Discord = require('discord.js')

exports.run = async (bot, message, args) => {
message.delete();
  if(args[0] == "help"){
    const help = new Discord.MessageEmbed()
      .addField('Uso:', "Yu-sembed <Tu texto>")
      .setColor(0x36393e)
      .addField('Descripción', "Convierte un mensaje a embed")
      .addField('Ejemplos:', "Yu-sembed Hola mundo\nYu-sembed Hello World")
      message.channel.send(help);
      return;
    }
  const argumentos = args.join(' ')
  if(!argumentos) {
    message.channel.send('Escribe algo para transformarlo en embed')
    return;
  }
var rpts = ["ff00ff", "00ffff", "8600b3", "754785", "e699ff", "ff3333", "006600", "8080ff","0000b3"];
 var color = rpts[Math.floor(Math.random() * rpts.length)]
 const embed = new Discord.MessageEmbed()
    .setDescription(`**${argumentos}**`)
    .setColor(color)
 message.channel.send({embed})
}
module.exports.config = {
  command: "sembed",
  aliases: ['sembed']
}