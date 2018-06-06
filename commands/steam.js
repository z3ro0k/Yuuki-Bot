
const { MessageEmbed } = require('discord.js');
const snekfetch = require('snekfetch');
const { stripIndents } = require('common-tags');

exports.run = async(bot, msg, args, func) => {
const game = args.join(' ')
		if (!game) {
    const embed = new MessageEmbed()
    .setColor(0x36393e)
    .setDescription(':x: **Introduce el nombre del pokemon para buscarlo**')
    msg.channel.send({embed})
      return;
    }
  try {
const search = await snekfetch
				.get('https://store.steampowered.com/api/storesearch')
				.query({
					cc: 'us',
					l: 'en',
					term: game
				});
			if (!search.body.items.length) return msg.channel.send('Could not find any results.');
			const { id, tiny_image } = search.body.items[0];
			const { body } = await snekfetch
				.get('https://store.steampowered.com/api/appdetails')
				.query({ appids: id });
			const { data } = body[id.toString()];
			const current = data.price_overview ? `$${data.price_overview.final / 100}` : 'Free';
			const original = data.price_overview ? `$${data.price_overview.initial / 100}` : 'Free';
			const price = current === original ? current : `~~${original}~~ ${current}`;
			const platforms = [];
			if (data.platforms) {
				if (data.platforms.windows) platforms.push('Windows');
				if (data.platforms.mac) platforms.push('Mac');
				if (data.platforms.linux) platforms.push('Linux');
			}
			const embed = new MessageEmbed()
				.setColor(0x101D2F)
				.setAuthor('Steam', 'https://i.imgur.com/xxr2UBZ.png', 'http://store.steampowered.com/')
				.setTitle(data.name)
				.setURL(`http://store.steampowered.com/app/${data.steam_appid}`)
				.setThumbnail(tiny_image)
				.addField('❯ Price', price, true)
				.addField('❯ Metascore', data.metacritic ? data.metacritic.score : '???', true)
				.addField('❯ Recommendations', data.recommendations ? data.recommendations.total : '???', true)
				.addField('❯ Platforms', platforms.join(', ') || 'None', true)
				.addField('❯ Release Date', data.release_date ? data.release_date.date : '???', true)
				.addField('❯ DLC Count', data.dlc ? data.dlc.length : 0, true)
				.addField('❯ Developers', data.developers.join(', ') || '???')
				.addField('❯ Publishers', data.publishers.join(', ') || '???');
			return msg.channel.send(embed);
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	};
exports.config = {
  command: "steam",
  aliases: ['steam','gamesteam']
}