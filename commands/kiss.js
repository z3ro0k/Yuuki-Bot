const Discord = require('discord.js')

exports.run = async (bot, message, args) => {
  
let elementos = ["https://i.imgur.com/F9zFLqf.gif", "https://i.imgur.com/F1LbtMM.gif", "https://i.imgur.com/dv9ES8R.gif", "https://i.imgur.com/T1jLvp9.gif", "https://i.imgur.com/a362Hxp.gif", "https://i.imgur.com/yYqKdR7.gif", "https://i.imgur.com/Js5YNQT.gif", "https://i.imgur.com/RWY3btA.gif", "https://i.imgur.com/dkdkWTF.gif", "https://i.imgur.com/xsmS0ER.gif", "https://i.imgur.com/kbzxaTj.gif", "https://i.imgur.com/ykOevpe.gif", "https://i.imgur.com/8IOxgsr.gif",
                          "https://i.imgur.com/WIgZ3w3.gif", "https://i.imgur.com/PIImjpB.gif", "https://i.imgur.com/xAv1U7Y.gif", "https://i.imgur.com/jdbGHHt.gif", "https://i.imgur.com/2fcpVaP.gif", "https://i.imgur.com/d1xAcYy.gif", "https://i.imgur.com/2Qwdb8g.gif", "https://i.imgur.com/EcTg0i1.gif", "https://i.imgur.com/5xQ4cAh.gif", "https://i.imgur.com/mVULw8C.gif", "https://i.imgur.com/OdnNCK4.gif", "https://i.imgur.com/l7DjlGg.gif"]
          let user = message.mentions.users.first()
          
          if(message.content.includes(message.author.id)) return message.reply('¿te besarás a ti mismo? o.O')
          if(message.content.includes(bot.user.id)) return message.reply('N-no puedo hacerlo >u<')
          
          if (!user) return message.reply("L-lo siento >u<, pero debes mencionar a alguien.");
            
          const embed = new Discord.RichEmbed()
          .setDescription(`**${message.author.username}** le dio un beso a **${user.username}** o////o`)
          .setImage(`${elementos[Math.floor(elementos.length * Math.random())]}`)
          .setColor(0xCA3163)
          message.channel.send({embed});
}
module.exports.config = {
  command: "kiss"
}