const Discord = require('discord.js')

exports.run = async (bot, message, args) => {

 let elementos = ["https://i.imgur.com/3Lh5MQP.gif", "https://i.imgur.com/txjumIV.gif", "https://i.imgur.com/PEiFw2T.gif", "https://i.imgur.com/Jtg6rAF.gif", "https://i.imgur.com/TRDLt7V.gif", "https://i.imgur.com/qIjyD4T.gif", "https://i.imgur.com/4VR2CwA.gif", "https://i.imgur.com/XTqQuAn.gif", "https://i.imgur.com/ba8feNb.gif", "https://i.imgur.com/4tiYais.gif", "https://i.imgur.com/OjovqKI.gif",
                                "https://i.imgur.com/qAKDnjN.gif", "https://i.imgur.com/wOUi8ob.gif", "https://i.imgur.com/CgB0ao7.gif", "https://i.imgur.com/FmZWyiO.gif", "https://i.imgur.com/nwdOOh3.gif", "https://media.giphy.com/media/AkKEOnHxc4IU0/giphy.gif", "https://media.giphy.com/media/8UHRbvmsFVyS2VXJKU/giphy.gif", "https://media.giphy.com/media/UYzNgRSTf9X1e/giphy.gif"]
                let user = message.mentions.users.first()
                
                if(message.content.includes(message.author.id)) return message.reply('¿te darás una bofetada a ti mismo? o.o')
                if (message.content.includes(bot.user.id)) return message.reply("¿d-de verdad quieres darme una bofetada? <:TostadaSad:437761630512742400>")
                
                if(!user) {
                  const embed = new Discord.MessageEmbed()
                  .setDescription(`**${bot.user.username}** le dio una bofetada a **${message.author.username}**`)
                  .setImage(`${elementos[Math.floor(elementos.length * Math.random())]}`)
                  .setColor(0xe95539)
                  message.channel.send({embed});
                }else {
                  const embed = new Discord.MessageEmbed()
                  .setDescription(`**${message.author.username}** le dio una bofetada a **${user.username}** D:`)
                  .setImage(`${elementos[Math.floor(elementos.length * Math.random())]}`)
                  .setColor(0xe95539)
                  message.channel.send({embed});
                }
}
module.exports.config = {
  command: "slap",
  aliases: ['slap']
}