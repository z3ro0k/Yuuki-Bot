const Discord = require('discord.js'),
      tools = require('../functions.js')

exports.run = async (bot, message, args ) => {
message.channel.send(tools.calcUptime())

}
exports.config = {
  command: "uptime",
  aliases: ['uptime', 'calcU']
}