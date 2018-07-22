const Discord = require('discord.js')
exports.run = async (bot, message, prefix, func) => { 

 // await message.delete();

  let msg =  message.content.slice(prefix.length).trim().split("|");
  let razon = msg[0];
  let sug = msg[1];
  let link = msg[2]; 

  if (!razon) return message.channel.send('⚠ **Nombre del commando**, **Yu!sugerencia nombre del commando | razon de porque a agregar el comando **');
  if (!sug) return message.channel.send('⚠ **razon**, **Yu!sugerencia nombre del commando | razon de porque a agregar el comando **');
    
     const embed = new Discord.MessageEmbed()
    .setAuthor('Sugerencia enviada por: ' + message.author.username + '#' + message.author.discriminator)
    .setThumbnail(message.author.displayAvatarURL())
    .setDescription('▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔')
    .addField('ID:',message.author.id)
    .addField('reason:',razon)
    .addField('Por:',sug)
    .setTimestamp()
    .setColor(0x36393e)
     bot.channels.get('429467996944203778').send({embed});
    message.channel.send('**:white_check_mark: Su informe se envía correctamente, espere mientras el desarrollador responde**')
 } 
exports.config = {
  command: "sugerencia",
  aliases: ["sug", "suggestion"]
}