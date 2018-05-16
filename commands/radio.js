const Discord = require('discord.js')

exports.run = async (bot, message, args) => {
 let voiceChannel = message.member.voiceChannel;
      if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
      voiceChannel.join().then(conexion =>{
      conexion.playStream('http://stream.electroradio.fm:80/192k/;');
      message.channel.send('<:musicNep:372597872849584148> ** | Radio electro activado.**')
            return;
          }).catch(console.error);
}
module.exports.config = {
  command:
}