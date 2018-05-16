const Discord = require('discord.js')

exports.run = async (bot, message, args) => {
message.delete();
  if(args[0] == "help"){
    const help = new Discord.RichEmbed()
      .addField('Uso:', "Yu-sembed <Tu texto>")
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
 const embed = new Discord.RichEmbed()
    .setDescription(`**${argumentos}**`)
    .setColor(color)
 message.channel.send({embed})
}
module.exports.config = {
  command: "sembed"
}