const db = require('quick.db');
const Discord = require('discord.js')
const send = require('discord.js')
module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("KICK_MEMBERS")) return send(message.channel, "Sorry, but you do not have valid permissions! If you believe this is an error, contact an owner.")

    let user = message.mentions.users.first()
    if (!user) return message.channel.send('**Please mention a user!**')

    const numberwarn = new db.table('WARNNUMBERs')
    numberwarn.fetch(`user_${user.id}_${message.guild.id}`).then(i => {

        if (i === null) return message.channel.send(`**This user don't have any warnings**`)

        if (!args[1]) return message.channel.send(`**Please specify which warning do you want to see! This user have ${i} warnings!**`)
      
        if (i === 5) return message.channel.send(`**Please specify which warning do you want to see! This user have ${i} warnings!**`)
    })



    const userwarns = new db.table('USERWARNINGs')
    //const num2 = await numberwarn.fetch(`user_${user.id}`)
    if (!args[1]) return;
    const warns = await userwarns.fetch(`warn_${user.id}_${args[1]}_${message.guild.id}`)

    const embed1 = new Discord.MessageEmbed()
        .setAuthor(`${user.username}'s ${args[1]}st warning`)
        .setDescription(`Reason: **${warns}**`)
        .setColor(0x36393e)

    const embed2 = new Discord.MessageEmbed()
        .setAuthor(`${user.username}'s ${args[1]}nd warning`)
        .setDescription(`Reason: **${warns}**`)
        .setColor(0x36393e)

    const embed3 = new Discord.MessageEmbed()
        .setAuthor(`${user.username}'s ${args[1]}rd warning`)
        .setDescription(`Reason: **${warns}**`)
        .setColor(0x36393e)

    const embed4 = new Discord.MessageEmbed()
        .setAuthor(`${user.username}'s ${args[1]}th warning`)
        .setDescription(`Reason: **${warns}**`)
        .setColor(0x36393e)


    if (args[1] === '1') return message.channel.send(embed1)
    if (args[1] === '2') return message.channel.send(embed1)
    if (args[1] === '3') return message.channel.send(embed1)

    else {
        message.channel.send(embed4)
    }

}
exports.config = {
    command: "warns",
    aliases: ['wlist', 'warnsl'],
    category: "moderation"
}