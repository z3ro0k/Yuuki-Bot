const Discord = require('discord.js')
const { IdOwner } = require('../botconfig.js')
const db = require('quick.db')

exports.run = async (bot, message, args) => {
   if(message.author.id !== IdOwner) return;

    
      if(!args.join(' ')) return message.channel.send(`Escriba el estado.`);
    bot.user.setPresence( {
    game: {
    name: args.join(' '),
    type: 3
    }
    });
}
exports.config = {
  command: "setgame",
  aliases: ['setgame']
}