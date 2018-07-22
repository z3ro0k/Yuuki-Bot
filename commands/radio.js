const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (bot, message, args) => {
 let voiceChannel = message.member.voiceChannel;
      if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
      voiceChannel.join().then(conexion =>{
      conexion.playStream('http://stream.electroradio.fm:80/192k/;');
      message.channel.send('<:umEmoji:440388171587649536> ** | Radio electro activado.**')
            return;
          }).catch(console.error);
}
module.exports.config = {
  command: "radio",
  aliases: ['radio', 'radio-fm']
}