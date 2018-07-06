const columnify = require('columnify')
const moment = require('moment')
require('moment-duration-format')
const Discord = require('discord.js')

exports.run = async (bot, message, args) => {

    // Check if bot is sharded or not.
    if (!bot.shard) {
      return message.reply('the bot is currently not sharded.')
    }
    // Get values from all shard.
    var shardInfo = await bot.shard.broadcastEval(`[
      this.shard.id,
      this.guilds.size,
      this.channels.size,
      this.users.size,
      (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
      this.uptime
    ]`)
    // Create array of information of each shard.
    var shardInfoArray = []
    shardInfo.forEach(i => {
      shardInfoArray.push({
        id: i[0],
        guilds: i[1],
        channels: i[2],
        users: i[3],
        mem: i[4],
        uptime: moment.duration(i[5]).format('y [yr,] M [mo,] w [wk,] d [day,] h [hr,] m [min,] s [sec, and] S [ms]')
      })
    })
    // Send message with shard information using columns.
    message.channel.send({
      content: columnify(shardInfoArray, {
        columnSplitter: ' │ '
      }),
      code: 'js'
    })
  }
module.exports.config = {
  command: "shardstats",
  aliases: ['shardstats']
}