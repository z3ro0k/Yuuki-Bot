const Discord = require('discord.js')

exports.run = async (bot, message, args) => {
  let id = message.guild.id;
    let vchannels = message.guild.channels.filter(m => m.type === 'voice').map(vc => '🔊 ' + vc.name).slice(1).join("\n")
    if (!vchannels) vchannels = "Ninguno";
    let tchannels = message.guild.channels.filter(m => m.type === 'text').map(tx => '#' + tx.name).slice(1).join("\n")
    let categorias = message.guild.channels.filter(c => c.type === 'category').map(tx => '#' + tx.name).slice(1).join("\n")
   // let categorias = message.guild.CategoryChannel.filter(c => c.type === 'parent').map(ct => '#' + ct.name).slice(1).join("\n")
    const embed = new Discord.MessageEmbed()
        .setTitle('Lista de canales de: '+message.guild.name)
        .addField('Canales de texto', '```' +tchannels + '```')
        .addField('Canales de voz', '```' + vchannels + '```')
        .addField('Categorias', '```' + categorias + '```')
        .setColor(0x36393e)
        .setThumbnail(message.guild.iconURl)
        message.channel.send({embed});
}
exports.config = {
  command: "channels"
}