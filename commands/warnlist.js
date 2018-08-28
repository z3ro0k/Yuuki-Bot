const db = require('quick.db');
const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {

   var langg = await client.tools.Lang(message.guild)   
   const lang = require(`../langs/${langg}.json`) 
 
   let prefix = await client.tools.GuildPrefix(message.guild)
 
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(lang.warns.perms)

    let user = message.mentions.users.first()
    if (!user) return message.channel.send(lang.warns.user)

    const numberwarn = new db.table('WARNNUMBERs')
    numberwarn.fetch(`user_${user.id}_${message.guild.id}`).then(i => {

        if (i === null) return message.channel.send(lang.warns.nWarns)

        if (!args[1]) return message.channel.send(lang.warns.tWarns.replace('{{total}}', i))
      
    })



    const userwarns = new db.table('USERWARNINGs')
    //const num2 = await numberwarn.fetch(`user_${user.id}`)
    if (!args[1]) return;
    const warns = await userwarns.fetch(`warn_${user.id}_${args[1]}_${message.guild.id}`)

    const embed1 = new Discord.MessageEmbed()
        .setAuthor(lang.warns.field.replace('{{user}}', user.username))
        .setDescription(`Reason: **${warns}**`)
        .setColor(0x36393e)

    const embed2 = new Discord.MessageEmbed()
        .setAuthor(lang.warns.field.replace('{{user}}', user.username))
        .setDescription(lang.warns.reason.replace('{{warns}}', warns))
        .setColor(0x36393e)

    const embed3 = new Discord.MessageEmbed()
        .setAuthor(lang.warns.field.replace('{{user}}', user.username))
        .setDescription(lang.warns.reason.replace('{{warns}}', warns))
        .setColor(0x36393e)

    const embed4 = new Discord.MessageEmbed()
        .setAuthor(lang.warns.field.replace('{{user}}', user.username))
        .setDescription(lang.warns.reason.replace('{{warns}}', warns))
        .setColor(0x36393e)


    if (args[1] === '1') return message.channel.send(embed1)
    if (args[1] === '2') return message.channel.send(embed1)
    if (args[1] === '3') return message.channel.send(embed1)
    if (args[1] === '4') return message.channel.send(embed1)
    if (args[1] === '5') return message.channel.send(embed1)

    else {
        message.channel.send(embed4)
    }

}
exports.config = {
    command: "warns",
    aliases: ['wlist', 'warnsl'],
    category: "moderation"
}