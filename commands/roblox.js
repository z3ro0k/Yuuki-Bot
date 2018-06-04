const Discord = require('discord.js')
const jsroblox = require('js-robloxapi');


exports.run = (bot, message, args, func) => {
  if(!args.join(' ')){
  func.embed(message.channel,'**Please specify a user!**')
  return;  
  }
  if (args.length > 1) {
    func.embed(message.channel,"My systems are telling me Roblox usernames dont have spaces in their names");
  return;
  }
jsroblox.getInfo(args, (data) => {
if (!data) return message.channel.send(`User **${args[0]}** was not found`); 
  
    let pages = [`**Name**\n ${data.Name}\n**ID:**\n ${data.Id}\n **Status Online**\n ${data.Online}`, `**Total Friends:** \` ${data.TotalFriends}\`\n**Friends list:**\n ${data.ListFriends}`, `**Badges list**\n ${data.ListBadges}`, `**Groups List**\n ${data.ListGroup}`]
    let page = 1;
 
    const embed = new Discord.MessageEmbed()
        .setColor(0x36393e)
        .setFooter(`Page ${page} of ${pages.length}`)
        .setImage(data.Avatar)
        .setDescription(pages[page - 1]);
 
    message.channel.send(embed).then(msg => {
 
        msg.react('⏪').then(r => {
            msg.react('⏩');
 
            const backwardsFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
            const forwardsFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;
 
            const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 });
            const forwards = msg.createReactionCollector(forwardsFilter, { time: 60000 });
 
            backwards.on('collect', r => {
                if (page === 1) return;
                page--;
                embed.setDescription(pages[page - 1]);
                
                embed.setFooter(`Page ${page} of ${pages.length}`);
                
                msg.edit(embed);
            });
 
            forwards.on('collect', r => {
                if (page === pages.length) return;
                page++;
                embed.setDescription(pages[page - 1]);
                embed.setFooter(`Page ${page} of ${pages.length}`);
                msg.edit(embed);
        }); 
      });
    });
  });
}