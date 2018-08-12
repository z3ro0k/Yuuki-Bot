const db = require('quick.db')
const { MessageEmbed } = require('discord.js')
exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) return  bot.tools.embed(message.channel, '**This command requires the Administrator role**') 
    
  if (!args.join(" ") && args.join(" ").toUpperCase() !== 'NONE') { 
    
    const textjoin = await bot.tools.welcomeText(message.guild) 
    
      const embed = new MessageEmbed()
        .setTitle('El texto de bienvenida actual es el siguiente')
        .setDescription(textjoin)
        .addField('Ajustes',`{server:name} = ${message.guild.name}\n{server:membercount} = ${message.guild.members.size} members\n{user:mention} = ${message.member.user}\n{user:username} = ${message.member.user.username}\n{user:tag} = ${message.member.user.tag}`)
        .setThumbnail()
      message.channel.send({embed})
    return;
   }
    let newMessage;
    if (args.join(" ").toUpperCase() === 'NONE') newMessage = ''; 
    else newMessage = args.join(" ").trim(); 

    db.set(`joinMessage_${message.guild.id}`, newMessage).then(i => {
           
       const embed = new MessageEmbed()
        .setTitle('Texto de bienvenida actualizado con éxito a')
        .setDescription(i)
        //.addField('Ajustes',`{server:name} = ${message.guild.name}\n{server:membercount} = ${message.guild.members.size} members\n{user:mention} = ${message.member.user}\n{user:username} = ${message.member.user.username}\n{user:tag} = ${message.member.user.tag}`)
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