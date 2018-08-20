const Discord = require('discord.js')
const { get } = require("snekfetch");

const { MessageAttachment } = require("discord.js");

exports.run = async (bot, msg, args ) => {
 const text = args.join(" ");
  
  var langg = await bot.tools.Lang(msg.guild)    
  const lang = require(`../langs/${langg}.json`) 
  
    if (!text) return msg.channel.send(lang.clyde.args);
    if (text.length > 60) return msg.channel.send(lang.clyde.args60)  
    const { body } = await get(`https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`);

    return msg.channel.send({
      embed: {
        "title": lang.clyde.NoLoad,
        "url": body.message,
        "color": 6192321,
        "image": {
          "url": body.message
        },
        "footer": {
          "icon_url": msg.author.displayAvatarURL({ format: "png", size: 32 }),
          "text": `${msg.author.tag} | Powered by NekoBot API`
        }
      }
    });
}
exports.config = {
  command: "clyde",
  aliases: [],
  category: "fun",
  description: "Have Clyde say something",
  usage: "Yu!mc cookie"
};