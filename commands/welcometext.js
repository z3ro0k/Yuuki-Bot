const db = require('quick.db')
const { MessageEmbed } = require('discord.js')
exports.run = (bot, message, args) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) return  bot.tools.embed(message.channel, '**This command requires the Administrator role**') // This returns if it CANT find the owner role on them. It then uses the function to send to message.channel, and deletes the message after 120000 milliseconds (2minutes)
    if (!args.join(" ") && args.join(" ").toUpperCase() !== 'NONE') return  bot.tools.embed(message.channel, '**Please mention a channel**\n > *~setwelcome message*') // This returns if they don't message a channel, but we also want it to continue running if they want to disable the log

    let newMessage;
    if (args.join(" ").toUpperCase() === 'NONE') newMessage = ''; 
    else newMessage = args.join(" ").trim(); 

    db.set(`joinMessage_${message.guild.id}`, newMessage).then(i => {
       // bot.tools.embed(message.channel, `**Successfully updated welcome text to:**\n > *${args.join(" ").trim()}*`)
      
       const embed = new MessageEmbed()
        .setTitle('Texto de bienvenida actualizado con éxito a')
        .setDescription(i)
        .addField('Ajustes',`{server:name} = ${message.guild.name}\n{server:membercount} = ${message.guild.members.size} members\n{user:mention} = ${message.member.user}\n{user:username} = ${message.member.user.username}\n{user:tag} = ${message.member.user.tag}`)
        .setThumbnail()
      message.channel.send({embed})
    })

}
exports.config = {
  command: "welcometext",
  aliases: ["wtext", "setwtext", "welcometextset"],
  category: "mod",
  description: " ",
  usage: " "
};