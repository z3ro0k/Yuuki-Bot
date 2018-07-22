const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (bot, message, args) => {

 let elementos = ["https://i.imgur.com/46IktC9.gif", "https://i.imgur.com/uM9l0Pz.gif", "https://i.imgur.com/iwcnjTx.gif", "https://i.imgur.com/YUMsjkP.gif", "https://i.imgur.com/u4bmrR9.gif", "https://i.imgur.com/pwGgX3m.gif", "https://i.imgur.com/hjo5d2Y.gif", "https://i.imgur.com/rFOWI9x.gif", "https://i.imgur.com/SAey4dh.gif", "https://i.imgur.com/sMf4aqi.gif", "https://i.imgur.com/fHHY3Ms.gif",
                          "https://i.imgur.com/tawCu5c.gif", "https://i.imgur.com/0OD2fpR.gif", "https://i.imgur.com/MC4UXpw.gif", "https://i.imgur.com/9SOOVs2.gif", "https://i.imgur.com/kqXdG5c.gif", "https://i.imgur.com/ToKtTL9.gif", "https://i.imgur.com/4rJGRye.gif", "https://i.imgur.com/SYy0Se1.gif", "https://i.imgur.com/386t7LG.gif", "https://i.imgur.com/5sI3xZ1.gif", "https://i.imgur.com/j0fcpGG.gif"]
          let user = message.mentions.users.first()
          
          if(message.content.includes(message.author.id)) return message.reply('no puedes acariciarte a ti mismo. Aunque si quieres que yo te acaricie, utiliza `ch!pat` uwu.')
          if(message.content.includes(bot.user.id)) {
            const embed = new Discord.MessageEmbed()
            .setDescription(`uwu -corresponde las caricias de **${message.author.username}**-`)
            .setImage(`${elementos[Math.floor(elementos.length * Math.random())]}`)
            .setColor(0x3ac0b8)
            message.channel.send({embed});
            return;
          }
          
          if (!user) {
            const embed = new Discord.MessageEmbed()
            .setDescription(`Déjame acariciarte un poco, **${message.author.username}** uwu`)
            .setImage(`${elementos[Math.floor(elementos.length * Math.random())]}`)
            .setColor(0x3ac0b8)
            message.channel.send({embed});
          
          }else {
          
          const embed = new Discord.MessageEmbed()
          .setDescription(`**${message.author.username}** acarició a **${user.username}** uwu`)
          .setImage(`${elementos[Math.floor(elementos.length * Math.random())]}`)
          .setColor(0x3ac0b8)
          message.channel.send({embed});
            }
}
module.exports.config = {
  command: "pat",
  aliases: ['pat']
}