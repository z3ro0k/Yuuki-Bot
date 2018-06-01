
const db = require('quick.db')

exports.run = (bot, message, args, func) => {

   
    if (!message.member.hasPermission('ADMINISTRATOR')) return func.embed(message.channel, '**This command requires the Administrator role**') // This returns if it CANT find the owner role on them. It then uses the function to send to message.channel, and deletes the message after 120000 milliseconds (2minutes)
    if (!message.mentions.channels.first() && args.join(" ").toUpperCase() !== 'NONE') return func.embed(message.channel, '**Please mention a channel**\n > *~setChannel #channel*') // This returns if they don't message a channel, but we also want it to continue running if they want to disable the log

    
    let newChannel;
    if (args.join(" ").toUpperCase() === 'NONE') newChannel = ''; 
    else newChannel = message.mentions.channels.first().id; 

    
    db.set(`messageChannel_${message.guild.id}`, newChannel).then(i => {
        func.embed(message.channel, `**Successfully updated logging channel to ${message.mentions.channels.first()}**`) // Finally, send in chat that they updated the channel.
    })

} 
module.exports.config = {
  command: "setlogs", 
  usage: "<prefix>setlogs",
  aliases: ['setlogs', 'setch', 'configuracion']
}