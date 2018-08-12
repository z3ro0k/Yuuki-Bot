const Discord = require('discord.js')
const db = require('quick.db')

const ImageRegex = /(?:([^:/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*\.(?:png|jpe?g|gifv?|webp|bmp|tiff|jfif))(?:\?([^#]*))?(?:#(.*))?/gi;
const LinkRegex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

exports.run = async (bot, message, args) => {
    //var prefix =  await bot.tools.GuildPrefix(message.guild) 
    


var perms = message.member.hasPermission("MANAGE_MESSAGES");
if(!perms) return message.channel.send(":x: |  No tienes permisos suficientes para ejecutar este comando.");

  try {
    
    let messageCount = args.join(' ')
  if(!messageCount) {
    message.channel.send(`Please provide me a set number of messages to prune!`)
    return; 
  }
  if(isNaN(messageCount)) {
     message.channel.send(`Please provide me a set number of messages to prune!`)
     return;
  }
  if (messageCount < 100 && messageCount > 0) return true;
      return message.channel.send('I can\'t delete more than 99 messages at once!');
  
    
    const messages = await message.channel.messages.fetch({ limit: messageCount });
                await message.channel.bulkDelete(messages.size, true);
    return message.channel.send(`🍇 | **${message.author.username}**, successfully pruned ${messageCount} ${messageCount == 1 ? 'message!' : 'messages!'}`)
    
     } catch (err) {
        console.log(err)
      return message.channel.send('❎ | These messages are too old to be deleted! I can only delete messages within two weeks!');

     }
   
}

exports.config = {
  command: "clean",
  aliases: ["limpiar", "purgar"],
  category: "mod",
  description: "Limpia una cantidad de mensajes",
  usage: "Yu!clean"
};