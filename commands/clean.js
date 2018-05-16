const Discord = require('discord.js')

exports.run = async (bot, message, args) => {
let messageCount = parseInt(args.join(' '));

var perms = message.member.hasPermission("MANAGE_MESSAGES");
if(!perms) return message.channel.send(":x: |  No tienes permisos suficientes para ejecutar este comando.");

if(!messageCount)  {
  message.channel.send('Escribe la cantidad de mensajes que quieras eliminar (el limite es de 100 mensajes).');
  return;
}
  messageCount = (args)[0];
      
if(messageCount >= 2 && messageCount <= 100){
    message.channel.fetchMessages({limit: messageCount})
    .then(messages => message.channel.bulkDelete(messages));
    message.channel.send('Los mensajes han sido eliminados correctamente.');

} else{
    message.channel.send('El limite de eliminación de mensajes es de 100 mensajes.');

} 
}
exports.config = {
  command: "clean"
}