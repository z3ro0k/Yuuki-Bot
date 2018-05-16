const Discord = require('discord.js')

exports.run = async (bot, message, args) => {
let user = message.mentions.users.first()
                    let gifs = ["https://i.imgur.com/nhZMW6Z.gif", "https://i.imgur.com/K7yOOE4.gif", "https://i.imgur.com/WNKI1G6.gif", "https://i.imgur.com/J460DGf.gif", "https://i.imgur.com/FIxpnOa.gif", "https://i.imgur.com/hWPmBni.gif", "https://i.imgur.com/ltUG4mf.gif", "https://i.imgur.com/z0JV78i.gif", "https://i.imgur.com/KCUoch6.gif"]
                    
                    if(message.content.includes(message.author.id)) return message.reply('¿te quieres golpear a ti mismo? o.O')
                    if(message.content.includes(bot.user.id)) return message.reply("n-no me golpees... por favor <:TostadaSad:437761630512742400>")
                    
                    if(!user) return message.reply('lo siento... pero yo no soy violenta... Así que debes mencionar a alguien.')
                      const embed = new Discord.RichEmbed()
                      .setDescription(`**${message.author.username}** le dio un golpe a **${user.username}** D':`)
                      .setImage(gifs[Math.floor(gifs.length * Math.random())])
                      .setColor(0xc72422)
                      message.channel.send({embed});
}
module.exports.config = {
  command: "punch"
}