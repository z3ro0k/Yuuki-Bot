const Discord = require('discord.js')
const { get } = require("snekfetch");

const { MessageAttachment } = require("discord.js");

exports.run = async (bot, msg, args ) => {
 const text = args.join(" ");
    const { body } = await get(`https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`);

    return msg.channel.send({
      embed: {
        "title": "Click here if the image failed to load.",
        "url": body.message,
        "color": 6192321,
        "image": {
          "url": body.message
        },
        "footer": {
          "icon_url": msg.author.displayAvatarURL({ format: "png", size: 32 }),
          "text": `Requested by ${msg.author.tag} | Powered by NekoBot API`
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