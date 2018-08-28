const db = require('quick.db')
exports.run = async(bot, message, args, discord) => {
  
 var langg = await bot.tools.Lang(message.guild)   
 const lang = require(`../langs/${langg}.json`) 
 
 let prefix = await bot.tools.GuildPrefix(message.guild)
 
  if (!message.member.hasPermission(["BAN_MEMBERS"], false, true, true)) return message.channel.send(lang.noP.ban);
  
  let id = args.join(' ');
  if(!id) return message.channel.send(lang.unban.args)

  let member = bot.fetchUser(id)
  .then(user => {
    message.guild.unban(user.id)
    .then(() => {
      message.channel.send(lang.unban.unb.replace('{{user}}', user.username))
    }).catch(err => {
        message.channel.send(lang.unban.error.replace('{{user}}', user.username))
    })
  }).catch(() => message.channel.send(lang.unban.error2))
}
  

module.exports.config = {
  command: "unhackban",
  aliases: ['unhb', 'unh']
}