const Discord = require('discord.js')
const { get } = require("snekfetch");

const { MessageAttachment } = require("discord.js");

exports.run = async (bot, msg, args ) => {
 const text = args.join(" ");
    const { body } = await get(`https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`);

    return loadingMessage.edit({
      embed: {
        "title": "Click here if the image failed to load.",
        "url": body.message,
        "color": 6192321,
        "image": {
          "url": body.message
        },
        "footer": {
          "icon_url": message.author.displayAvatarURL({ format: "png", size: 32 }),
          "text": `Requested by ${message.author.tag} | Powered by NekoBot API`
        }
      }
    });
}
exports.config = {
  command: "mc",
  aliases: ['mcc', 'Achievement'],
  category: "fun",
  description: "creas un Achievement de maincraft",
  usage: "Yu!mc cookie"
};