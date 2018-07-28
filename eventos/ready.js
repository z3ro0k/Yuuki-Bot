const Discord = require('discord.js')
const prefix = 'Yu!'
exports.run = (bot, guild, args) => {

console.log('Bot launched...')
 
bot.user.setPresence({
          status: "dnd",
          activity: {
            name: prefix + `help | ${bot.guilds.size} guilds 📝 | ${Math.round(bot.users.size / 1000)}K usuarios 👤 | Yu!invite`,
            type: 2
          }
        }) 
  
}