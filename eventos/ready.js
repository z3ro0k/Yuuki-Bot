const Discord = require('discord.js')
const prefix = 'Yu!'
exports.run = (client, guild, args) => {

	console.log('Bot launched...')

	setInterval(() => {
		client.tools.post_dbl(client)
		console.log("Stats send to bots list", "debug")
    }, 1800000);

	function rotateGames(i) {
			let games = [
				` ¿Necesita ayuda? Yu!help`,
				` with ${client.options.author}`,
				` en ${client.guilds.size} servers`
			];

			if(i >= games.length) i = 0;
			client.user.setPresence({
				status: "dnd",
				game: {
					name: games[i],
					type: "PLAYING"
				}
			});
	

		setInterval(()  => {
			rotateGames(++i);
		}, 4000);
	}
	rotateGames(0);
};