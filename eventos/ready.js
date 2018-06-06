const Discord = require('discord.js')
const prefix = 'Yu!'
exports.run = (bot, guild, args, tools) => {

console.log('Bot launched...')
 
bot.user.setPresence({
          status: "dnd",
          activity: {
            name: prefix + `help | ${bot.guilds.size} guilds 📝 | ${bot.users.size} usuarios 👤 | Yu!invite`,
            type: 2
          }
        }) 
}