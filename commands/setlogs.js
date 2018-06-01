const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const tools = require('../functions.js');
const { IdOwner } = require('../botconfig.js');

exports.run = async (bot, message, args) => {
  const perms = message.member.hasPermission('ADMINISTRATOR') 
 let off = await db.fetch(`welcomeSettings_${message.guild.id}`);
    if (off !== '<:onn:442082974037573641>Mod-logs enable' ) {
        
        const embed = new MessageEmbed()
        .setTitle('<:off:442082928323985408>Mod-logs desactivados')
        .setColor(0x36393e)
        .setThumbnail('https://cdn.discordapp.com/emojis/442082928323985408.png')
        .setDescription('Por favor activa los mod-logs antes de usar este comando, usa: `Yu!welcome`')
        message.channel.send({ embed: embed });


    } else {
      
    if (!perms) return tools.embed(message.channel, '**<:adminNep:372599923381633024> | No tienes Permisos para usar este comando.**') // This returns if it CANT find the owner role on them. It then uses the function to send to message.channel, and deletes the message after 120000 milliseconds (2minutes)
    if (!message.mentions.channels.first() && args.join(" ").toUpperCase() !== 'NONE') return tools.embed(message.channel, '**Please mention a channel**\n > *~setChannel #channel*') // This returns if they don't message a channel, but we also want it to continue running if they want to disable the log

    
    let newChannel;
    if (args.join(" ").toUpperCase() === 'NONE') newChannel = ''; 
    else newChannel = message.mentions.channels.first().id; 

    
    db.set(`messageChannel_${message.guild.id}`, newChannel).then(i => {
        tools.embed(message.channel, `**Successfully updated logging channel to ${message.mentions.channels.first()}**`) // Finally, send in chat that they updated the channel.
    })
  }
} 
module.exports.config = {
  command: "setlogs", 
  usage: "<prefix>setlogs",
  aliases: ['setlogs', 'setchannel', 'setcanal']
}