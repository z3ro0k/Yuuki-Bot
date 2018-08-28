const db = require('quick.db')
const A = require('discord.js');

exports.run = async(bot, message, args) => {
  
   var langg = await bot.tools.Lang(message.guild)   
   const lang = require(`../langs/${langg}.json`) 
 
    let prefix = await bot.tools.GuildPrefix(message.guild)
   
    const emoji1 = '🇳'
    const emoji = '🇾'
    message.channel.send(lang.welcome.message).then(msg => {
        
      msg.react(emoji).then(r => {
            msg.react(emoji1)
            const yes = (reaction, user) => reaction.emoji.name === emoji && user.id === message.author.id;
            const nopleas = (reaction, user) => reaction.emoji.name === emoji1 && user.id === message.author.id;
            const sure = msg.createReactionCollector(yes, {
                time: 1000000
            });
            const no = msg.createReactionCollector(nopleas, {
                time: 1000000,
                usage: 1
            });
            sure.on('collect', r => {
                msg.delete();
              var subt = lang.welcome.subt
              var subt2 = lang.welcome.subt2
                const emb = new A.MessageEmbed()
                    .setColor(0x36393e)
                    .setDescription(`**${lang.welcome.title1}**\n${subt.replace('{{prefix}}', prefix)}\n${subt2.replace('{{prefix}}', prefix)}`)
                message.channel.send({
                    embed: emb
                })
              db.set(`welcomeSettings_${message.guild.id}`, '<:onn:442082974037573641>Mod-logs enable')
            })
            no.on('collect', r => {
              msg.delete()
                const emb = new A.MessageEmbed()
                     .setColor(0x36393e)
                    .setDescription(lang.welcome.title2)
                    //.setFooter('use ~setlogs #channel to set the channel')
                message.channel.send({
                    embed: emb
                }).then(() => {
                msg.delete(10000)
                })
              db.delete(`welcomeSettings_${message.guild.id}`)//, '<:off:442082928323985408>Mod-logs disable')
            })
        })
    })
}
module.exports.config = {
  command: "welcome", 
  usage: "<prefix>welcome",
  aliases: ['welcome', 'welcomeset', 'wset']
}