
const tools = require('../functions.js');
const db = require('quick.db')
exports.run = async (bot, message, args) => {
  var prefix = await bot.tools.GuildPrefix(message.guild) 
        message.delete();

         if (!args.join(' ')) { return tools.hook(message.channel,'Hook Usage', `${prefix}hook <title>, <message>, [HEXcolor], [avatarURL]\n\n**<> is required\n[] is optional**`,'FC8469','https://cdn4.iconfinder.com/data/icons/global-logistics-3/512/129-512.png') 
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