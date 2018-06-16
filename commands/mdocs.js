const Discord = require('discord.js')
const snekfetch = require('snekfetch');
const { shorten, base64 } = require('../utils/Util');
const { GITHUB_USERNAME, GITHUB_PASSWORD } = require('../data/apis.json')

exports.run = async (bot, msg, args) => {
    const artc = args.join(' ')
    const astc2 = artc => artc.replace(/#/g, '.prototype.')
    if(!artc) {
    msg.channel.send('¿Qué artículo te gustaría buscar?')
      return;
    }
    
  try {
			const { body } = await snekfetch
				.get('https://developer.mozilla.org/en-US/search.json')
				.query({
					q: artc,
					locale: 'es-ES',
					highlight: false
				});
			if (!body.documents.length) return msg.channel.send('Could not find any results.');
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
module.exports.config = {
  command: "mdocs",
  aliases: ['mozillad', 'docsm']
}
exports.config = {
  command: "mdocs",
  aliases: ['mozillad', 'docsm'],
  category: "info",
  description: "Busca informacion de alguna funcion en la documentacion de Mozilla",
  usage: "Yu!mdocs Array()"
};