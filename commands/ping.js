const Discord = require('discord.js')
exports.run = (bot, message, args, func) => {
if(args[0] == "help"){
    const help = new Discord.MessageEmbed()
      .addField('Uso:', "Yu-ping ")
      .setColor(0x36393e)
      .addField('Descripción', "Muestra el ping del **Bot** y el ping de la api de **Discord**")
      .addField('Ejemplos:', "Yu-ping")
      message.channel.send(help);
      return;
    }
    let ping = Math.floor(message.client.ping);

message.channel.send(":ping_pong: Pong!")
.then(m => {

     const embed = new Discord.MessageEmbed()
     .addField(`<:ping:440371045237784576> Ping Message: `, `${m.createdTimestamp - message.createdTimestamp} ms`, true)
     .addField(`<:api:440371014443073536> DiscordAPI:` , `${ping} ms`, true)
     .setThumbnail('https://media.giphy.com/media/3oz8xL64yRHAHIIXDy/giphy.gif')
     .setColor(0x36393e)
                
    m.edit({embed}); 
})
}  
module.exports.config = {
  command: "ping",
  aliases: ['ping', 'pong']
}