const moment = require('moment');
const { MessageEmbed,  escapeMarkdown } = require('discord.js');
const { fromNow } =  require('../utils/utils.js');
const perms = require('../utils/json/permissions.json');

exports.run = async(bot, msg, args) => {
let member = {};
	if(msg.mentions.users.first()) member = msg.mentions.users.first()
	else if(args.join(' ') && bot.tools.getUser(msg, args.join(' '))) member = bot.tools.getUser(msg, args.join(' '))
	else member = msg.member
    
    var userStatus
    if (member.presence.activity !== null) {
      if (member.presence.activity.type === 'PLAYING') {
        userStatus = `Playing **${(member.presence.activity.name)}**`
      } else if (member.presence.activity.type === 'STREAMING') {
        userStatus = `Streaming **${(member.presence.activity.name)}**`
      } else if (member.presence.activity.type === 'LISTENING') {
        userStatus = `Listening to **${(member.presence.activity.name)}**`
      } else if (member.presence.activity.type === 'WATCHING') {
        userStatus = `Watching **${(member.presence.activity.name)}**`
      }
      if (member.presence.activity.url !== null) { userStatus = `[${userStatus}](${member.presence.activity.url})` }
    }
      if (!userStatus) {
     userStatus = "User is not playing a game"
   }
        /*if (member.bot === true) {
            var author = member.user.tag + ' [BOT]'
        } else {*//*
            
        }*/
        var author = member.user.tag
        if (!member.nickname) {
            var nickname = '`N/A`'
        } else {
            var nickname = member.nickname
        }

        const allowed = Object.entries(member.permissions.serialize()).filter(([perm, allowed]) => allowed).map(([perm]) => "`" + perms[perm]+ "`").join(',   ');

             var userRoles
        if (member.roles.size > 1) {
            userRoles = `${member.roles.array().sort((a, b) => a.comparePositionTo(b)).slice(1).reverse().map(role => `**\`${role.name}\`**`)}`
          } else {
            userRoles = 'N/A'
              }

        const embed = new MessageEmbed()
            .setAuthor(author, member.user.displayAvatarURL({ format: 'png' }))
            .setDescription(userStatus)
            .setColor(member.displayHexColor)
            .setThumbnail(member.user.displayAvatarURL())
            .setFooter(`Requested by ${msg.author.tag}`, msg.author.displayAvatarURL())
            .addField('<:members:442439950747697164>\u2000\Information', `•\u2000\**ID:** ${member.user.id}\n\•\u2000\**Status:** ${member.user.presence.status ? member.user.presence.status : '`N/A`'}\n\•\u2000\**Created:** ${moment(member.user.createdAt).format('MMMM Do YYYY')} \`(${fromNow(member.user.createdAt)})\``)
            .addField('<:AShield:441067013532549120>\u2000\Server Membership', `•\u2000\**Nickname:** ${nickname}\n\•\u2000\**Joined:** ${moment(member.joinedAt).format('MMMM Do YYYY')} \`(${fromNow(member.joinedAt)})\``, true)
            .addField('<:AShield:441067013532549120>\u2000\**Role Infomation**', `•\u2000\**Highest Role:** ${member.roles.highest.id !== msg.guild.defaultRole.id ? '<@&' + member.roles.highest.id + '>': 'None'}\n\•\u2000\**Hoist Role:** ${member.roles.hoist ? '<@&' + member.roles.hoist.id + '>' : 'None'}`)
            .addField(`<:Ainfo:441067085163134976>\u2000\**Roles** [${member.roles.size > 0 ? member.roles.size.toLocaleString() - 1 : 0}]`, '•\u2000' + userRoles, true)
            .addField(`<:Libraries:442442996705918987>\u2000\**Permissions**`, allowed ? `•\u2000${allowed}` : '•\u2000\None')
        return msg.channel.send(`User information for **${member.user.username}**#${member.user.discriminator}`, { embed: embed });
    }
module.exports.config = {
  command: "user",
  aliases: ['userinfo', 'usuario']
}
