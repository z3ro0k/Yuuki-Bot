const Discord = require('discord.js')
const snekfetch = require('snekfetch');
const { parseString } = require('xml2js');
const { promisify } = require('util');
const xml = promisify(parseString);
const { shorten, base64, cleanXML } = require('../utils/Util');
const { MAL_USERNAME, MAL_PASSWORD } = require('../data/apis.json')
exports.run = async (bot, msg, args) => {
 const query = args.join(' ')
if(!query) {
  msg.channel.send('<:uwu:440413296785489920> | Escribe el nombre del anime a buscar')
  return;
}
           try {
			const { raw } = await snekfetch
				.get('https://myanimelist.net/api/anime/search.xml')
				.query({ q: query })
				.set({ Authorization: `Basic ${base64(`${MAL_USERNAME}:${MAL_PASSWORD}`)}` });
			const body = await xml(raw.toString());
			const data = body.anime.entry[0];
			const embed = new Discord.MessageEmbed()
				.setColor(0x2D54A2)
				.setAuthor('My Anime List', 'https://i.imgur.com/5rivpMM.png', 'https://myanimelist.net/')
				.setURL(`https://myanimelist.net/anime/${data.id[0]}`)
				.setThumbnail(data.image[0])
				.setTitle(data.title[0])
				.setDescription(shorten(cleanXML(data.synopsis[0])))
				.addField('❯ Type', `${data.type[0]} - ${data.status[0]}`, true)
				.addField('❯ Episodes', data.episodes[0], true)
				.addField('❯ Start Date', data.start_date[0] !== '0000-00-00' ? data.start_date[0] : '???', true)
				.addField('❯ End Date', data.end_date[0] !== '0000-00-00' ? data.end_date[0] : '???', true);
			return msg.embed(embed);
		} catch (err) {
			if (err.message === 'Parse Error') return msg.say('Could not find any results.');
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}

}
module.exports.config = {
  command: "anime",
  aliases: ['m-anime', 'an']
}