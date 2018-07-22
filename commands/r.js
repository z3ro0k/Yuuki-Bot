const Discord = require('discord.js')
const db = require('quick.db')

exports.run = (client, message, args, func) => {
var command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]))   
    if (!args.join(' ')) {
      message.channel.send(`:x: Provide a command name to reload.`);
      return;
    }
    const embed = new Discord.MessageEmbed()
    .setColor(client.color);
  
  if (message.author.id !== client.ownerID) {
    
    // Modify Embed
    embed.setFooter('Sorry, this command is reserved for developers.');
    
    // Send Response
    return message.channel.send(embed);
    
  }
  
  // Modify Embed (Default)
  embed.setFooter(`Successfully reloaded: ${args[0]}`);
  //embed.setThumbnail(client.user.displayAvatarURL())
  // Delete from cache
  try {
    delete require.cache[require.resolve(`../commands/${args[0]}.js`)];
  } catch (e) {
    // Modify Embed (Error Fallback)
    embed.setFooter(`Unable to reload: ${args[0]}`);
  }
  
  message.channel.send(embed);
}
exports.config = {
  command: "r",
  aliases: ['r', 'reload']
}