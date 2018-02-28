const Discord = require('discord.js')

exports.run = (bot, message, args, func) => {
  
  if (args.length < 1) {
       message.channel.send('Please, provide an emoji to expand it');
       return;
    }

    if (args[0].charCodeAt(0) >= 55296) {
        message.channel.send('You can not expand the built-in discord emoji.');
        return;
    }

    const match = args[0].match(/<:[a-zA-Z0-9_-]+:(\d{18})>/);

    if (!match || !match[1]) {
       message.channel.send('Provide a valid emoji.');
      return;
    }

    const emoji = bot.emojis.get(match[1]);

    if (!emoji) {
       message.channel.send('¡This emoji could not be identified!');
      return;
    }

   // message.delete();
  /*const embed = new Discord.MessageEmbed()
  .setImage(emoji.url)  
  .setColor('#ebab21')
  message.channel.send({ embed })*/
  message.channel.send({file: emoji.url})
  
} 
module.exports.config = {
  command: "jumbo"
}