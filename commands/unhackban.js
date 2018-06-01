exports.run = (bot, message, args, discord) => {
  let id = args.join(' ');
  if (!message.member.hasPermission(["BAN_MEMBERS"], false, true, true)) return message.channel.send(`You don't have permission to use this command.`);
  let member = bot.fetchUser(id)
  .then(user => {
    message.guild.unban(user.id)
    .then(() => {
      message.channel.send(`Alright, I unbanned ${user}.`)
    }).catch(err => {
        message.channel.send(`Failed to unban ${user}`)
    })
  }).catch(() => message.channel.send("Sorry, I can't find a user with that ID..."))
}
  

module.exports.config = {
  command: "unhackban",
  aliases: ['unhb', 'unh']
}