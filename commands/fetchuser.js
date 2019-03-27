const Discord = require('discord.js')
const { MessageEmbed,  escapeMarkdown } = require('discord.js');
exports.run = async(bot, message, args, level) => {
  try {
  bot.users.fetch(args[0]).then(user => {
    var userStatus
        if (user.presence.activity !== null) {
      if (user.presence.activity.type === 'PLAYING') {
        userStatus = `Playing **${escapeMarkdown(user.presence.activity.name)}**`
      } else if (user.presence.activity.type === 'STREAMING') {
        userStatus = `Streaming ${(user.presence.activity.name)}`
      } else if (user.presence.activity.type === 'LISTENING') {
        userStatus = `Listening to **${escapeMarkdown(user.presence.activity.name)}**`
      } else if (user.presence.activity.type === 'WATCHING') {
        userStatus = `Watching **${escapeMarkdown(user.presence.activity.name)}**`
      }
      if (user.presence.activity.url !== null) { userStatus = `[\`${userStatus}\`](${user.presence.activity.url})` }
    }
    if (!userStatus) {
     userStatus = "User is not playing a game"
 }
const embed = new Discord.MessageEmbed()
.addField('❯ User name', user.tag, true)
.addField('❯ User ID', user.id, true)
.addField('❯ Discord Join Date', user.createdAt.toDateString(), true)
.addField('❯ User status', user.presence.status, true)
.addField('❯ User game', userStatus, true)
.setThumbnail(user.displayAvatarURL())
message.channel.send(embed)
  });
  } catch(e) {
   message.channel.send('User not found') 
  }
}
exports.config = {
  command: "fetchuser",
  aliases: ["fuser", "userfetch"],
  category: "mod",
  description: "Busca a un usuario que no este en el servidor debe proposionar su id",
  usage: "Yu!fetchuser 322203879208910849"
};