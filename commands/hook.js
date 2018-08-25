
const tools = require('../functions.js');
const db = require('quick.db')
exports.run = async (bot, message, args) => {
  var prefix = await bot.tools.GuildPrefix(message.guild) 
  
   var langg = await bot.tools.Lang(message.guild)    
  const lang = require(`../langs/${langg}.json`) 
  
  var message = lang.hook.messageD
        message.delete();

         if (!args.join(' ')) { return tools.hook(message.channel,'Hook Usage', `${message.replace('{{prefix}}', prefix)}`,'FC8469','https://cdn4.iconfinder.com/data/icons/global-logistics-3/512/129-512.png') 
        } 
        let hookArgs = message.content.slice(prefix.length + 4).split(","); 

        tools.hook(message.channel, hookArgs[0], hookArgs[1], hookArgs[2], hookArgs[3]); 
}

exports.config = {
  command: "hook",
  aliases: ["hook", "h"],
  category: "mod",
  description: "El bot crea un WebHook",
  usage: "Yu!hook"
};