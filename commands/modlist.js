const { MessageEmbed } = require('discord.js')
const isStaff = (msg) => {
	let permissions = msg.permissions.serialize();
	return permissions.KICK_MEMBERS ||
		permissions.BAN_MEMBERS ||
		permissions.ADMINISTRATOR ||
		permissions.MANAGE_CHANNELS ||
		permissions.MANAGE_GUILD ||
		permissions.MANAGE_MESSAGES;
};

const statusMap = {
	online: "<:online:313956277808005120>",
	streaming: "<:straming:313956277132853248>",
	idle: "<:away:313956277220802560>",
	dnd: "<:dnd:313956276893646850>",
	offline: "<:offline:313956277237710868>"
};

const sortMap = { online: 1, idle: 2, streaming: 3, dnd: 4, offline: 5 };

const getStatus = (msg, map = true) => {
	let status = msg.guild.presences.get(msg.user.id) ? msg.guild.presences.get(msg.user.id).status : "offline";
	return map ? statusMap[status] : status;
};

exports.run = async (client, message) => {
  var langg = await client.tools.Lang(message.guild)    
    const lang = require(`../langs/${langg}.json`) 
    
    var message = lang.modslist.title
    
	let mods = message.guild.members.array().filter(msg => isStaff(msg) && !msg.user.bot).sort((a, b) => sortMap[getStatus(a, false)] > sortMap[getStatus(b, false)]);
	mods = mods.map(msg => `${getStatus(msg)} **${msg.user.username}#${msg.user.discriminator}**`);
  
  const embed = new MessageEmbed()
    .setDescription([`weones`].concat(mods))
	message.channel.send(embed);
};

exports.config = {
	enabled: true,
	guildOnly: false,
	aliases: [],
  command: `modlist`,
	description: `List all servers moderators and their status.`,
	usage: `Yu!modlist`
};

exports.help = {
	
};