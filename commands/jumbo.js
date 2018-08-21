const Discord = require('discord.js')
const db = require('quick.db')

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

  const image = new Discord.MessageAttachment(`${emoji.url}`, "emoji.png");
message.channel.send(image)
  
} 
exports.config = {
  command: "jumbo",
  aliases: ['jumbo', 'j', 'e'],
  category: "fun",
  description: "El bot agranda el emoji proposionado",
  usage: "Yu!emoji :Doge:"
};