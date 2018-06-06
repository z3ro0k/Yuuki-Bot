const Discord = require('discord.js')
const { oneLineTrim } = require('common-tags')
const columnify = require('columnify')
 
exports.run = async (bot, message, args) => {
 var guilds = bot.guilds.array()
    var columnifyGuilds = []
    guilds.forEach(guild => {
      var members = oneLineTrim`
        ${guild.members.filter(member => member.user.bot === false).size} USR/
        ${guild.members.filter(member => member.user.bot === true).size} BOT/
        ${guild.members.size} TOT
      `
      columnifyGuilds.push({
        name: guild.name,
        id: guild.id,
        members: members,
        owner: guild.owner.user.tag
      })
    })
    message.channel.send({
      content: columnify(columnifyGuilds, {
        columnSplitter: ' │ '
      }),
      split: true,
      code: 'css'
    })
  }
module.exports.config = {
  command: "guilds",
  aliases: ['guilds']
}