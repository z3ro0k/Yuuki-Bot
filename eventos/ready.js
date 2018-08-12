const Discord = require('discord.js')
const prefix = 'Yu!'
exports.run = async (client, guild, args) => {

	console.log('Bot launched...')
 //await  client.user.setActivity('Multilanguage Coming Soon :D', {type: 'WATCHING'});
 await client.user.setPresence({
				status: "dnd",
				activity: {
					name: "¿Necesita ayuda? Yu!help",
					type: 0
				}
			});
  
	function rotateGames() {
			let games = [`¿Necesita ayuda? Yu!help`,`with ${client.options.author}`,`en ${client.guilds.size} servers`, 'Multilanguage Coming Soon :D'];
    
			client.user.setPresence({
				status: "dnd",
				activity: {
					name: games[Math.floor(games.length * Math.random())],
					type: 0
				}
			});
  }
		setInterval(rotateGames, 100000)
	}