const db = require('quick.db')
const A = require('discord.js');
exports.run = (bot, message, args, tools, prefix) => {


    const emoji1 = '🇳'
    const emoji = '🇾'
    message.channel.send('Reacts **yes** to activate the mod-logs or reacts **no** to cancel').then(msg => {
        
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
                const emb = new A.MessageEmbed()
                    .setColor(0x36393e)
                    .setDescription('<:onn:442082974037573641>Mod-logs enable')
                    .setFooter('use ~setlogs #channel to set the channel')
                message.channel.send({
                    embed: emb
                })
              db.set(`welcomeSettings_${message.guild.id}`, '<:onn:442082974037573641>Mod-logs enable')
            })
            no.on('collect', r => {
              msg.delete()
                const emb = new A.MessageEmbed()
                     .setColor(0x36393e)
                    .setDescription('<:off:442082928323985408>Mod-logs disable')
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