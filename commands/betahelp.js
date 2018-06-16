const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

exports.run = async (bot, msg, args) => {
  var command = bot.commands.get(args[0]) || bot.commands.get(bot.aliases.get(args[0]))
  
  if (!command) {
			const embed = new MessageEmbed()
				.setTitle('Command List')
				.setDescription(`Use Yu!bhelp ping to view detailed information about a command.`)
				.setColor(0x00AE86)
				.setFooter(`${bot.commands.size} Commands`);
			for (const group in bot.commands.config) {
				embed.addField(`❯ ${group.commands}`, group.commands.map(cmd => cmd.config.command).join(', ') || 'None');
			}
			try {
				//const msgs = [];
				msg.author.send({ embed });
				if (msg.channel.type !== 'dm') return await msg.reply('�� Sent you a DM with information.');
			} catch (err) {
				return msg.reply('Failed to send DM. You probably have DMs disabled.');
			}
		}
		return msg.channel.send(stripIndents`
			__Command **${command.command}**__${command.guildOnly ? ' (Usable only in servers)' : ''}
			${command.description}**Aliases**: ${command.aliases.join(', ') || 'None'}
			**Group**: ${command.category}\`)
		`);
	}

exports.config = {
  command: "betahelp",
  aliases: ["bhelp"],
  category: "info",
  description: "betahelp",
  usage: "betahelp"
};