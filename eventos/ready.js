const Discord = require('discord.js')
const prefix = '.'
exports.run = (bot, guild, args, tools) => {

console.log('Bot launched...')
bot.user.setAvatar('https://static.zerochan.net/Konno.Yuuki.full.2167963.png')  
bot.user.setPresence({
          status: "dnd",
          activity: {
            name: prefix + `help | ${bot.guilds.size} guilds 📝 | ${bot.users.size} usuarios 👤 | Yu!invite`,
            type: 2
          }
        }) 
}