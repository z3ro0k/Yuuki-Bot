const snekfetch = require('snekfetch')

const ownerID = '322203879208910849'

const Discord = require('discord.js')

exports.run = (client, message, args, tools) => {
  
  
  if (!args.join(' ')) return message.channel.send('Escribe algo para transformarlo en texto ascii')
  if(message.content.split(' ').slice(1).join(' ').length > 14) {
  message.channel.send('pasaste los 14 caracteres permitidos ...')
    return;
  }
  snekfetch.get(`http://artii.herokuapp.com/make?text=${args.join(' ')}`).then(ascii => {
    
const embed = new Discord.MessageEmbed()
.addField('Text', args.join(' '))
.addField('Ascii Form', `\`\`\`${ascii.text}\`\`\``)
.setColor(0x36393e)  
  return message.channel.send({ embed: embed });

  }).catch(err => {
    var server = message.guild;
      client.users.get(ownerID).send(`Se encontro un error con el comando **ascii**, comando usado en** ${server.name} ** por el usuario **${message.author.username}** checa la consola`);
    //tools.embed(message.channel, '**:white_check_mark:Se le envio un reporte a mi desarollador**')
      console.log(err)
  });
}
module.exports.config = {
  command: "ascii",
   aliases: ["ascii", "ascii-text"]
}