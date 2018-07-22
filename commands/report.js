const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (bot, message, prefix, func) => { 
await message.delete();
  
  let msg =  message.content.slice(prefix.length).trim().split("|");
  let razon = msg[0];
  let sug = msg[1];
  let link = msg[2]; 

  if (!razon) return message.channel.send('⚠ **command**, `Yu!report comando | razon | pruebas, si no cuentas con evidencias pon nn`');
  if (!sug) return message.channel.send('⚠ **razon**, `Yu!report comando | razon | pruebas, si no cuentas con evidencias pon nn`');
  if (!link) return message.channel.send('⚠ **Link**, `Yu!report comando | razon | pruebas, si no cuentas con evidencias pon nn`'); 
    
     const embed = new Discord.MessageEmbed()
    .setAuthor('Bug enviado por: ' + message.author.username + '#' + message.author.discriminator)
    .setThumbnail(message.author.displayAvatarURL())
    .setDescription('▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔')
    .addField('ID:',message.author.id)
    .addField('Razon:',razon)
    .addField('Por:',sug)
    .addField('Pruebas','[Imagen]('+ link + ')')
    .setTimestamp()
    .setColor(0x36393e)
    bot.channels.get('429467996944203778').send({embed});
    message.channel.send('**:white_check_mark: Su informe se envía correctamente, espere mientras el desarrollador responde**')
 } 
exports.config = {
  command: "report",
  aliases: ["report", "bug", "bugreport", "reportbug"]
}