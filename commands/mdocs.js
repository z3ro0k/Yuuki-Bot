const Discord = require('discord.js')
const snekfetch = require('snekfetch');
const { shorten, base64 } = require('../utils/Util');
const { GITHUB_USERNAME, GITHUB_PASSWORD } = require('../data/apis.json')
const db = require('quick.db')

exports.run = async (bot, msg, args) => {
  
    var langg = await bot.tools.Lang(msg.guild)    
    const lang = require(`../langs/${langg}.json`) 

    const artc = args.join(' ')
    const astc2 = artc => artc.replace(/#/g, '.prototype.')
    var url
    if(langg === 'en') url = 'https://developer.mozilla.org/en-US/search.json'
    if(langg === 'es') url = 'https://developer.mozilla.org/es-ES/search.json'
    if(langg === 'pt') url = 'https://developer.mozilla.org/pt-PT/search.json'
    if(!artc) {
    msg.channel.send(lang.mdocs.args)
      return;
    }
    
  try {
			const { body } = await snekfetch
				.get(url)
				.query({
					q: artc,
					locale: 'es-ES',
					highlight: false
				});
			if (!body.documents.length) return msg.channel.send(lang.mdocs.noFound);
			const data = body.documents[0];
			const embed = new Discord.MessageEmbed()
				.setColor(0x066FAD)
				.setAuthor('MDN', 'https://i.imgur.com/DFGXabG.png', 'https://developer.mozilla.org/')
				.setURL(data.url)
				.setTitle(data.title)
				.setDescription(data.excerpt);
			return msg.channel.send(embed);
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
exports.config = {
  command: "mdocs",
  aliases: ['mozillad', 'docsm'],
  category: "info",
  description: "Busca informacion de alguna funcion en la documentacion de Mozilla",
  usage: "Yu!mdocs Array()"
};