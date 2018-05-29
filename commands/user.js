const dateformat = require('dateformat');
const datediff = require('date-diff')
const { MessageEmbed,  escapeMarkdown } = require('discord.js');
const {  oneLineCommaListsAnd } = require('common-tags')



exports.run = async(bot, msg, args) => {
  if(args[0] == "help"){
    const help = new MessageEmbed()
      .addField('Uso:', "Yu-user ")
      .setColor(0x36393e)
      .addField('Descripción', "Muestra la información del usuario mencionado o usando la id del usuario")
      .addField('Ejemplos:', "Yu-user 322203879208910849\nYu-user 321438019653599233\nYu-user")
      msg.channel.send(help);
      return;
    }
    
let user = msg.mentions.users.first() || msg.guild.member(args.join(' ')) || msg.author
let member = msg.guild.member(user)
if (!member) member = msg.member;
    
     var userRoles
    if (member.roles.size > 1) {
      userRoles = oneLineCommaListsAnd`${member.roles.array().sort((a, b) => a.comparePositionTo(b)).slice(1).reverse().map(role => `**\`${role.name}\`**`)}`
    } else {
      userRoles = 'N/A'
    }
     var userStatus
    if (member.presence.activity !== null) {
      if (member.presence.activity.type === 'PLAYING') {
        userStatus = `Playing **${escapeMarkdown(member.presence.activity.name)}**`
      } else if (member.presence.activity.type === 'STREAMING') {
        userStatus = `Streaming **${escapeMarkdown(member.presence.activity.name)}**`
      } else if (member.presence.activity.type === 'LISTENING') {
        userStatus = `Listening to **${escapeMarkdown(member.presence.activity.name)}**`
      } else if (member.presence.activity.type === 'WATCHING') {
        userStatus = `Watching **${escapeMarkdown(member.presence.activity.name)}**`
      }
      if (member.presence.activity.url !== null) { userStatus = `[${userStatus}](${member.presence.activity.url})` }
    }
  const status = {
   online: 'Online', 
   idle: 'Idle',
   dnd: 'Do Not Disturb',
   offline: 'Offline/Invisible',
   streaming: 'Streaming' 
 };
 let emoji;
 if (member.presence.status === "online") {
     emoji = "<:online:409502042604961792>"
 }
 if (member.presence.status === "dnd") {
     emoji = "<:dnd:409502091510415362>"
 }
 if (member.presence.status === "idle") {
     emoji = "<:idle:409502137521799168>"
 }
 if (member.presence.status === "offline") {
     emoji = "<:invisible:409502255847309313>"
 }
  if (member.presence.activity.type === 'STREAMING') {
     emoji = "<:stream:409502167108419637>"
 }
if (!userStatus) {
     userStatus = "User is not playing a game"
 }
    
		const embed = new MessageEmbed()
			.setColor(member.displayHexColor)
			.setThumbnail(member.user.displayAvatarURL())
			.addField('❯ Name', member.user.tag, true)
			.addField('❯ ID', member.id, true)
			.addField('❯ Discord Join Date', member.user.createdAt.toDateString(), true)
			.addField('❯ Server Join Date', member.joinedAt.toDateString(), true)
			.addField('❯ Nickname', member.nickname || 'None', true)
      .addField(`❯ Status${emoji}`, status[member.presence.status], true)
      .addField('❯ Playing', userStatus, true)
			.addField('❯ Bot?', member.user.bot ? 'Yes' : 'No', true)
			.addField('❯ Highest Role',
				member.roles.highest.id !== msg.guild.defaultRole.id ? '<@&' + member.roles.highest.id + '>': 'None', true)
			.addField('❯ Hoist Role', member.roles.hoist ? '<@&' + member.roles.hoist.id + '>' : 'None', true)
    .addField(`🔖 Roles - (${member.roles.size > 0 ? member.roles.size.toLocaleString() - 1 : 0})`, userRoles);
		return msg.channel.send(embed);
	}

module.exports.config = {
  command: "user"
}
