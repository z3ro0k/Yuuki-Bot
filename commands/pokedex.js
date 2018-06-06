
const { MessageEmbed } = require('discord.js');
const snekfetch = require('snekfetch');
const { stripIndents } = require('common-tags');

exports.run = async(bot, msg, args, func) => {
const pokemon = args.join(' ')
		if (!pokemon) {
    const embed = new MessageEmbed()
    .setColor(0x36393e)
    .setDescription(':x: **Introduce el nombre del pokemon para buscarlo**')
    msg.channel.send({embed})
      return;
    }
try {
		const { body } = await snekfetch.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`);
			const id = body.id.toString().padStart(3, '0');
			const embed = new MessageEmbed()
				.setColor(0xED1C24)
				.setAuthor(
					`#${id} - ${filterPokemonData(body.names, false).name}`,
					`https://www.serebii.net/pokedex-sm/icon/${id}.png`,
					`https://www.serebii.net/pokedex-sm/${id}.shtml`
				)
				.setDescription(stripIndents`
					**The ${filterPokemonData(body.genera, false).genus}**
					${filterPokemonData(body.flavor_text_entries).flavor_text.replace(/\n|\f|\r/g, ' ')}
				`)
				.setThumbnail(`https://www.serebii.net/sunmoon/pokemon/${id}.png`);
			return msg.embed(embed);
		} catch (err) {
			if (err.statusCode === 404) return msg.say('Could not find any results.');
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	

	function filterPokemonData(arr, random = true) {
		const filtered = arr.filter(entry => entry.language.name === 'spanish');
		return filtered[random ? Math.floor(Math.random() * filtered.length) : 0];
	}
};
  
exports.config = {
  command: "pokedex",
  aliases: ['pokedex', 'pokemon-info']
}