const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (bot, message, args, func) => {
  
  var langg = await bot.tools.Lang(message.guild)    
  const lang = require(`../langs/${langg}.json`) 
  
  if (args.length < 1) {
       message.channel.send(lang.jumbo.Nemoji);
       return;
    }

    if (args[0].charCodeAt(0) >= 55296) {
        message.channel.send(lang.jumbo.Demoji);
        return;
    }

    const match = args[0].match(/<:[a-zA-Z0-9_-]+:(\d{18})>/);

    if (!match || !match[1]) {
       message.channel.send(lang.jumbo.Iemoji);
      return;
    }

    const emoji = bot.emojis.get(match[1]);

    if (!emoji) {
       message.channel.send(lang.jumbo.Ni);
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