const Discord = require("discord.js");
const moment = require('moment')
require('moment-duration-format')
const { escapeMarkdown } = require('discord.js');
const db = require('quick.db')

//let cooldown = new Set();

exports.run = async(bot, message, args) => {

  let guild = bot.guilds.get(args.join(' ')) || message.guild
  let sender = message.author

  let streaming = guild.members.filter(s => s.presence.activity !== null && s.presence.activity.type === 'STREAMING')

	//var guild = message.guild
    var ownerInfo = guild.owner.user

    // Security
   var verificationLevel = [
      '**None**',
      '**Low**',
      '**Medium**',
      '**(╯°□°）╯︵ ┻━┻**',
      '**┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻**'
    ]
    var explicitContentFilter = [
      '**Level 1**\n(Don\'t scan any messages)',
      '**Level 2**\n(Scan messages from members without a role)',
      '**Level 3**\n(Scan all messages.)'
    ]

    // Member Filter
    var userFilter = guild.members.filter(s => s.user.bot !== true)
    var botFilter = guild.members.filter(s => s.user.bot !== false)
    
    const server = {
      activity: guild.members.filter((member) => {
        if (member.lastMessage) {
          return member.lastMessage.createdTimestamp
        }
      }).array(),
      // # of users + bots that sent message since client turned on
      daily: guild.members.filter((member) => {
        // for every member check if they have a lastMessage
        if (member.lastMessage) {
          // if the time from NOW - time of last message is under 24 hours add it to array
          if (new Date() - member.lastMessage.createdTimestamp < 86400000) {
            return member.lastMessage.createdTimestamp
          }
        }
      }).array(),
      // # per week # of users + bots
      weekly: guild.members.filter((member) => {
        if (member.lastMessage) {
          if (new Date() - member.lastMessage.createdTimestamp < (86400000 * 7) && new Date() - member.lastMessage.createdTimestamp > 86400000) {
            return member.lastMessage.createdTimestamp
          }
        }
      }).array(),
      // # per montth of users + bots
      monthly: guild.members.filter((member) => {
        if (member.lastMessage) {
          if (new Date() - member.lastMessage.createdTimestamp < (86400000 * 30) && new Date() - member.lastMessage.createdTimestamp > (86400000 * 7)) {
            return member.lastMessage.createdTimestamp
          }
        }
      }).array(),
      online: guild.presences.array().length,
      channels: guild.channels.array().length,
      // # of text channels
      text: guild.channels.filter((channel) => {
        if (channel.type === 'text') {
          return channel
        }
      }).array().length,
      emojis: guild.emojis.array().length,
      // All emojis with their unicode like <>
      allEmojis: guild.emojis.filter((emoji) => {
        const id = `<:${emoji.identifier}>`
        return id
        // Remove all , in the array and just show all emojis
      }).array().toString().replace(/,/g, '')
    }
    
    // Region
    var guildRegion = await guild.fetchVoiceRegions().then(regions => {
      var name = JSON.stringify(regions.get(guild.region).name)
      return name.replace(/"/g, '')
    })

    // Roles
    var guildRoles
    if (guild.roles.size > 1) {
      guildRoles = `${guild._sortedRoles().array().slice(1).reverse().map(role => role)}`
    } else {
      guildRoles = 'N/A'
    }
   let emoji;
 if (ownerInfo.presence.status === "online") {
     emoji = "<a:Online:446119385480953866>"
 }
 if (ownerInfo.presence.status === "dnd") {
     emoji = "<a:Dnd:446126900788592670>"
 }
 if (ownerInfo.presence.status === "idle") {
     emoji = "<a:Idle:446126963585974283>"
 }
 if (ownerInfo.presence.status === "offline") {
     emoji = "<a:Offline:446126934355738627>"
 }
  const embed = new Discord.MessageEmbed()
  .setColor(message.author.displayHexColor)
  .setThumbnail(guild.iconURL() !== null ? guild.iconURL() : 'http://cdn.discordapp.com/embed/avatars/0.png')
  .setTitle(`${guild.name} - ${guildRegion}`)
  .setDescription(`**ID:** - ${guild.id}`)
  .addField('<:Owner:442443039915507743> Owner', `**Tag:** ${escapeMarkdown(ownerInfo.tag)}\n**ID:** ${ownerInfo.id}\n**Status:** ${ownerInfo.presence.status}`, true)
  .addField(`<:relog:447518519752523776> Created - (${moment(guild.createdAt).fromNow()})`, `**Date:** ${moment(guild.createdAt).format('L')}\n**Time:** ${moment(guild.createdAt).format('LTS')}`, true)
  .addField(`<:members:442439950747697164> Members - (${guild.members.size.toLocaleString()})`, `**Online:** ${guild.members.filter(s => s.user.presence.status === 'online').size.toLocaleString()} | **Offline:** ${guild.members.filter(s => s.user.presence.status === 'offline').size.toLocaleString()}\n**Idle:** ${guild.members.filter(s => s.user.presence.status === 'idle').size.toLocaleString()} | **DND:** ${guild.members.filter(s => s.user.presence.status === 'dnd').size.toLocaleString()}`, true)
  .addField(`<:Servers:442443125005352962> Users - (${userFilter.size.toLocaleString()})`, `**Online:** ${userFilter.filter(s => s.user.presence.status === 'online').size.toLocaleString()} | **Offline:** ${userFilter.filter(s => s.user.presence.status === 'offline').size.toLocaleString()}\n**Idle:** ${userFilter.filter(s => s.user.presence.status === 'idle').size.toLocaleString()} | **DND:** ${userFilter.filter(s => s.user.presence.status === 'dnd').size.toLocaleString()}`, true)
  .addField(`<:wEmoji:440388223017943042> Bots - (${botFilter.size.toLocaleString()})`, `**Online:** ${botFilter.filter(s => s.user.presence.status === 'online').size.toLocaleString()} | **Offline:** ${botFilter.filter(s => s.user.presence.status === 'offline').size.toLocaleString()}\n**Idle:** ${botFilter.filter(s => s.user.presence.status === 'idle').size.toLocaleString()} | **DND:** ${botFilter.filter(s => s.user.presence.status === 'dnd').size.toLocaleString()}`, true)
  .addField(`<:members:442439950747697164> Active Members: ${server.activity.length}`, `Daily: ${server.daily.length}\nWeekly: ${server.weekly.length}\nMonthly: ${server.monthly.length}`, true)
  .addField(`<:doc:448784570188562433> Channels - (${guild.channels.size.toLocaleString()})`,  `**Category:** ${guild.channels.filter(c => c.type === 'category').size.toLocaleString()}\n**Text:** ${guild.channels.filter(c => c.type === 'text').size.toLocaleString()}\n**Voice:** ${guild.channels.filter(c => c.type === 'voice').size.toLocaleString()}`, true)
  .addField('<:Astart:441067034554662932> AFK Channel', guild.afkChannelID !== null ? `**Name:** ${guild.afkChannel.name}\n**ID:** ${guild.afkChannel.id}\n**Timeout:** ${guild.afkTimeout} seconds` : 'N/A', true)
  .addField('<:Verific:446119366187024394> Verification Level', verificationLevel[guild.verificationLevel], true)
  .addField('<:cloud:447518353972658207> Explicit Content Filter', explicitContentFilter[guild.explicitContentFilter], true)
  .addField(`Emojis: ${server.emojis}`, `${server.allEmojis.length > 1024 ? "The emoji list is too long to list." : server.allEmojis}`, true)
  .addField(`🔖 Roles - (${guild.roles.size.toLocaleString()})`,  guildRoles, false)
    .setColor(0x36393e)
    return message.channel.send(embed);
}
module.exports.config = {
  command: "server",
  aliases: ['serverinfo', 'servidor']
}