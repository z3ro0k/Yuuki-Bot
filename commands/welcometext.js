const db = require('quick.db')
const { MessageEmbed } = require('discord.js')
exports.run = async (bot, message, args) => {
  
   const perms = bot.options.owner.includes(message.author.id) || message.member.hasPermission('ADMINISTRATOR') 
   
  let prefix = await bot.tools.GuildPrefix(message.guild)
  
    if (!perms) return  bot.tools.embed(message.channel, '**This command requires the Administrator role**') 
    
  if (!args.join(" ") && args.join(" ").toUpperCase() !== 'NONE') { 
    
    const textjoin = await bot.tools.welcomeText(message.guild) 
    
      const embed = new MessageEmbed()
        .setTitle('El texto de bienvenida actual es el siguiente')
        .setDescription(textjoin)
        .addField('Ajustes',`{server:name} = ${message.guild.name}\n{server:membercount} = ${message.guild.members.size} members\n{user:mention} = ${message.member.user}\n{user:username} = ${message.member.user.username}\n{user:tag} = ${message.member.user.tag}`)
        .setFooter(`Para cambiar el texto usa ${prefix}welcometext <su mensaje>`) 
        .setThumbnail()
      message.channel.send({embed})
    return;
   }
    let newMessage;
    if (args.join(" ").toUpperCase() === 'NONE') newMessage = ''; 
    else newMessage = args.join(" ").trim(); 

    db.set(`joinMessage_${message.guild.id}`, newMessage).then(i => {
           
       const embed = new MessageEmbed()
        .setTitle('Texto de bienvenida actualizado con éxito a')
        .setDescription(i)
        //.addField('Ajustes',`{server:name} = ${message.guild.name}\n{server:membercount} = ${message.guild.members.size} members\n{user:mention} = ${message.member.user}\n{user:username} = ${message.member.user.username}\n{user:tag} = ${message.member.user.tag}`)
        .setThumbnail()
      message.channel.send({embed})
    })

}
exports.config = {
  command: "welcometext",
  aliases: ["wtext", "setwtext", "welcometextset"],
  category: "mod",
  description: " ",
  usage: " "
};
const Discord = require('discord.js');

exports.run = (client, message, args) => {
	client.mysql.query(`SELECT * FROM welcome WHERE gID = '${message.guild.id}'`, function(err, rows) {
		var state = false;
		if (rows && rows[0]) state = true;

		const embed = new Discord.RichEmbed()
		.setColor('#fffffe')
		.setTitle('Choose an action !')
		.setDescription(`[A] ${state ? "Disable" : "Enable"} welcome message\n${state ? "[B] Edit welcome message\n[C] Test welcome message" : ""}`);
		message.channel.send({ embed }).then(msg => {
			msg.react('🇦').then(em => {
				if (state) msg.react('🇧').then(em => {
					if (state) msg.react('🇨')
				})
			});
			const filter = (reaction, user) => (reaction.emoji.name === '🇦' || reaction.emoji.name === '🇧' || reaction.emoji.name === '🇨') && user.id === message.author.id
			const collector = msg.createReactionCollector(filter, { time: 15000 });
			collector.on('collect', r => {
				if (r.emoji.name === "🇦") {
					if (state) {
						// If welcome message is already enabled, disable it
						client.mysql.query(`DELETE FROM welcome WHERE gID = '${message.guild.id}'`);
					} else {
						// If welcome message isn't already enabled, enable it
						client.mysql.query(`INSERT INTO welcome SET ?`, {gID: message.guild.id, cID: message.channel.id, message: "<:welcome:408337102779056131> Welcome **{{user}}** in **{{servername}}** !"});
					}
					const embed = new Discord.RichEmbed()
						.setColor('#fffffe')
						.setTitle(`Welcome is now ${state ? 'disable' : 'enable'} in **#${message.channel.name}**`);

					message.channel.send({embed});
					msg.delete()
					collector.stop()
				} else if (r.emoji.name === "🇧") {
					const embed = new Discord.RichEmbed()
						.setColor('#fffffe')
						.setTitle('Edit welcome message')
						.addField('Old welcome message', rows[0].message)
						.addField('New welcome message', "Type the new message");

					message.channel.send({embed});
					const msg_filter = m => m.author.id === message.author.id && m.channel.id === message.channel.id
					const msg_collector = message.channel.createMessageCollector(msg_filter, { time: 120000 });
					msg_collector.on('collect', m => {
						msg.delete()
						const embed = new Discord.RichEmbed()
							.setColor('#fffffe')
							.setTitle(':white_check_mark: Message updated')
							.addField('New welcome message', m.content);

						message.channel.send({embed});
						client.mysql.query(`UPDATE welcome SET message = '${m.content}' WHERE gID = '${message.guild.id}'`)
						msg_collector.stop();
					});

					msg_collector.on('end', collected => {if (collected.size === 0) return message.channel.send(':x: Menu has closed due to inactivity.')});
					collector.stop()
				} else if (r.emoji.name === "🇨") {
					msg.delete()
					welcome = rows[0].message.split('{{user}}').join(`<@${message.author.id}>`).split('{{servername}}').join(`${message.guild.name}`);
					message.channel.send(welcome);
					collector.stop()
				}
			});

			collector.on('end', collected => {if (collected.size === 0) return message.channel.send(':x: Menu has closed due to inactivity.')});
		});
	});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 9,
	type: 2
};

exports.help = {
	name: `welcome`,
	description: `Add/Edit/Remove welcome message.`,
	usage: `${client.settings.prefix}welcome`
};