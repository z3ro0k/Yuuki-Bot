const Discord = require('discord.js')
const { oneLineTrim } = require('common-tags')
const columnify = require('columnify')
 
exports.run = async (bot, message, args) => {
 var guilds = bot.guilds
 
    var columnifyGuilds = []
   guilds.forEach(guild => {
      //var ownerInfo = guild.owner.user
      var members = oneLineTrim`
        ${guild.members.filter(member => member.user.bot === false).size} USR/
        ${guild.members.filter(member => member.user.bot === true).size} BOT/
        ${guild.members.size} TOT
      `
      columnifyGuilds.push({
        name: guild.name,
        id: guild.id,
        members: members
        //owner: ownerInfo.username
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