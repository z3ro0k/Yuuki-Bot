const ascii = require('figlet');

const ownerID = '322203879208910849'

const Discord = require('discord.js')


exports.run = (client, message, args, tools) => {
  
  
  if (!args.join(' ')) return message.channel.send('Escribe algo para transformarlo en texto ascii')
  if(message.content.split(' ').slice(1).join(' ').length > 14) {
  message.channel.send('pasaste los 14 caracteres permitidos ...')
    return;
  }
   ascii(args.join(' '), {
        horizontalLayout: 'fitted',
        verticalLayout: 'fitted'
      },
      function(err, data) {
        if (err) {
          message.reply('Something went wrong! Contact a developer. `https://discord.gg/RwmuHu6`')
          console.error(err)
        }
        message.delete(1)
        message.channel.send(data, {
          code: 'text'
        })
      })
}
module.exports.config = {
  command: "ascii",
   aliases: ["ascii", "ascii-text"]
}