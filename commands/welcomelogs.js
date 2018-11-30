const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const tools = require('../functions.js');
const { IdOwner } = require('../botconfig.js');

exports.run = async (bot, message, args) => {
  
  var langg = await bot.tools.Lang(message.guild)   
  const lang = require(`../langs/${langg}.json`) 
 
  let prefix = await bot.tools.GuildPrefix(message.guild)
     
  const ids = bot.options.owner
  const perms = ids.includes(message.author.id) || message.member.hasPermission('ADMINISTRATOR') 
  
   let off = await db.fetch(`welcomeSettings_${message.guild.id}`);
  
    if (off !== '<:onn:442082974037573641>Mod-logs enable' ) {
        
        const embed = new MessageEmbed()
        .setTitle(lang.welcomelogs.noActive)
        .setColor(0x36393e)
        .setThumbnail('https://cdn.discordapp.com/emojis/442082928323985408.png')
        .setDescription(lang.welcomelogs.text.replace('{{prefix}}', prefix))
        message.channel.send({ embed: embed });


    } else {
      
    if (!perms) return tools.embed(message.channel, lang.noP.ban)
    if (!message.mentions.channels.first() && args.join(" ").toUpperCase() !== 'NONE') return tools.embed(message.channel, lang.welcomelogs.args.replace('{{prefix}}', prefix)) 
    
    let newChannel;
    if (args.join(" ").toUpperCase() === 'NONE') newChannel = ''; 
    else newChannel = message.mentions.channels.first().id; 

    
    db.set(`welcomeChannel_${message.guild.id}`, newChannel).then(i => {
        tools.embed(message.channel, `${lang.welcomelogs.logsC} **#${message.mentions.channels.first().name}**`) 
    })
  }
} 
module.exports.config = {
  command: "welcomelogs", 
  usage: "<prefix>welcomelogs",
  aliases: ['welcomelogs', 'setwelcome', 'logswelcome']
}