const Discord = require('discord.js')
const jsroblox = require('js-robloxapi');
const db = require('quick.db')

exports.run = async (bot, message, args) => {
var langg = await bot.tools.Lang(message.guild)    
const lang = require(`../langs/${langg}.json`) 

  if(!args.join(' ')){
  bot.tools.embed(message.channel, lang.roblox.args)
  return;  
  }
  if (args.length > 1) {
     bot.tools.embed(message.channel, lang.roblox.args1);
  return;
  }
jsroblox.getInfo(args, (data) => {
  var noF = lang.roblox.noFound
  
if (!data) return message.channel.send(noF.replace('{{user}}', args[0])); 
  
    let pages = [`**${lang.roblox.N}**\n ${data.Name}\n**${lang.roblox.ID}**\n ${data.Id}\n **${lang.roblox.status}**\n ${data.Online}`, `**${lang.roblox.friends}** \` ${data.TotalFriends}\`\n**${lang.roblox.friendsL}**\n ${data.ListFriends}`, `**${lang.roblox.weas}**\n ${data.ListBadges}`, `**${lang.roblox.groups}**\n ${data.ListGroup}`]
    let page = 1;
    let pag = lang.Gif.page
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
                embed.setImage(data.Avatar)
                embed.setFooter(pag.replace('{{page}}', page).replace('{{pagesL}}', pages.length))
                
                msg.edit(embed);
            });
 
            forwards.on('collect', r => {
                if (page === pages.length) return;
                page++;
                embed.setDescription(pages[page - 1]);
                embed.setImage(data.Avatar)
                embed.setFooter(pag.replace('{{page}}', page).replace('{{pagesL}}', pages.length))
                msg.edit(embed);
        }); 
      });
    });
  });
}
module.exports.config = {
  command: "roblox",
  aliases: ['roblox', "userroblox"]
}