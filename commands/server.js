const Discord = require("discord.js");
const dateFormat = require('dateformat');
const { escapeMarkdown } = require('discord.js');

//let cooldown = new Set();

exports.run = async(bot, message, args) => {
  if(args[0] == "help"){
    const help = new Discord.MessageEmbed()
      .addField('Uso:', "Yu-server")
      .setColor(0x36393e)
      .addField('Descripción', "Muestra la información del server")
      .addField('Ejemplos:', "Yu-server 322209371704786945\nYu-server 312846399731662850\nYu-server")
      message.channel.send(help);
      return;
    }
  let server = bot.guilds.get(args.join(' ')) || message.guild
  let sender = message.author
  let online = server.members.filter(m => m.presence.status == 'online')
  let offline = server.members.filter(m => m.presence.status == 'offline')
  let dnd = server.members.filter(m => m.presence.status == 'dnd')
  let idle = server.members.filter(m => m.presence.status == 'idle')
  let streaming = server.members.filter(s => s.presence.activity !== null && s.presence.activity.type === 'STREAMING')

    const now = new Date();
				 dateFormat(now, '***On dddd, mmmm dS, yyyy, h:MM:ss TT***');

	var guild = message.guild
    var ownerInfo = guild.owner.user

    // Security
    var verificationLevel = [
      '**None**\n(Unrestricted)',
      '**Low**\n(Must have verified email on account)',
      '**Medium**\n(Must be registered on Discord for longer than 5 minutes)',
      '**High**\n(Must be a member of the server for longer than 10 minutes)',
      '**Very High**\n(Must have a verified phone number)'
    ]
    var explicitContentFilter = [
      '**Level 1**\n(Don\'t scan any messages)',
      '**Level 2**\n(Scan messages from members without a role)',
      '**Level 3**\n(Scan all messages.)'
    ]

    // Member Filter
    var userFilter = guild.members.filter(s => s.user.bot !== true)
    var botFilter = guild.members.filter(s => s.user.bot !== false)

    // Region
    var guildRegion = await guild.fetchVoiceRegions().then(regions => {
      var name = JSON.stringify(regions.get(guild.region).name)
      return name.replace(/"/g, '')
    })

    // Features
    var features = []
    if (guild.features.indexOf('INVITE_SPASH')) { features.push('Invite Spash') }
    if (guild.features.indexOf('MORE_EMOJI')) { features.push('More Emojis') }
    if (guild.features.indexOf('VERIFIED')) { features.push('Verified') }
    if (guild.features.indexOf('VIP_REGIONS')) { features.push('VIP Regions') }
    if (guild.features.indexOf('VANITY_URL')) { features.push('Vanity URL') }
    for (var i = 0; i < features.length; i++) { features[i] = `• ${features[i]}` }

    // Roles
    var guildRoles
    if (guild.roles.size > 1) {
      guildRoles = `${guild._sortedRoles().array().slice(1).reverse().map(role => `**\`${role.name}\`**`)}`
    } else {
      guildRoles = 'N/A'
    }
  const embed = new Discord.MessageEmbed()
  .setColor(message.author.displayHexColor)
	.setThumbnail(guild.iconURL() !== null ? guild.iconURL() : 'http://cdn.discordapp.com/embed/avatars/0.png')
  .setTitle(`${guild.name} - ${guildRegion}`)
  .setDescription(`**ID:** - ${guild.id}`)
  .setColor(0x36393e)
  .addField('🔧 Owner', `**Tag:** ${escapeMarkdown(ownerInfo.tag)}\n**ID:** ${ownerInfo.id}\n**Status:** ${ownerInfo.presence.status}`, true)
  //.addField(`🕐 Created - (${moment(guild.createdAt).fromNow()})`, `**Date:** ${moment(guild.createdAt).format('L')}\n**Time:** ${moment(guild.createdAt).format('LTS')} ${moment.tz(moment.tz.guess()).format('z')}`, true)
  .addField(`📋 Members - (${guild.members.size.toLocaleString()})`, `**<a:Online:446119385480953866>** ${guild.members.filter(s => s.user.presence.status === 'online').size.toLocaleString()} | **<a:Offline:446126934355738627>** ${guild.members.filter(s => s.user.presence.status === 'offline').size.toLocaleString()}\n**<a:Idle:446126963585974283>** ${guild.members.filter(s => s.user.presence.status === 'idle').size.toLocaleString()} | **<a:Dnd:446126900788592670>** ${guild.members.filter(s => s.user.presence.status === 'dnd').size.toLocaleString()}`, true)
  .addField(`🕵 Users - (${userFilter.size.toLocaleString()})`, `**<a:Online:446119385480953866>** ${userFilter.filter(s => s.user.presence.status === 'online').size.toLocaleString()} | **<a:Offline:446126934355738627>** ${userFilter.filter(s => s.user.presence.status === 'offline').size.toLocaleString()}\n**<a:Idle:446126963585974283>** ${userFilter.filter(s => s.user.presence.status === 'idle').size.toLocaleString()} | **<a:Dnd:446126900788592670>** ${userFilter.filter(s => s.user.presence.status === 'dnd').size.toLocaleString()}`, true)
  .addField(`🤖 Bots - (${botFilter.size.toLocaleString()})`, `**<a:Online:446119385480953866>** ${botFilter.filter(s => s.user.presence.status === 'online').size.toLocaleString()} | **<a:Offline:446126934355738627>** ${botFilter.filter(s => s.user.presence.status === 'offline').size.toLocaleString()}\n**<a:Idle:446126963585974283>** ${botFilter.filter(s => s.user.presence.status === 'idle').size.toLocaleString()} | **<a:Dnd:446126900788592670>** ${botFilter.filter(s => s.user.presence.status === 'dnd').size.toLocaleString()}`, true)
  .addField( `⌨ Channels - (${guild.channels.size.toLocaleString()})`,  `**Category:** ${guild.channels.filter(c => c.type === 'category').size.toLocaleString()}\n**Text:** ${guild.channels.filter(c => c.type === 'text').size.toLocaleString()}\n**Voice:** ${guild.channels.filter(c => c.type === 'voice').size.toLocaleString()}`, true)
  .addField('💤 AFK Channel', guild.afkChannelID !== null ? `**Name:** ${guild.afkChannel.name}\n**ID:** ${guild.afkChannel.id}\n**Timeout:** ${guild.afkTimeout} seconds` : 'N/A', true)
  .addField('⚙ Features', features.size > 0 ? features.join('\n') : 'N/A', true)
  .addField('⚖ Verification Level', verificationLevel[guild.verificationLevel], true)
  .addField('📰 Explicit Content Filter', explicitContentFilter[guild.explicitContentFilter], true)
  .addField(`🔖 Roles - (${guild.roles.size.toLocaleString()})`,  guildRoles, false)
    return message.channel.send(embed);
}
module.exports.config = {
  command: "server",
  aliases: ['serverinfo', 'servidor']
}