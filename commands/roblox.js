const Discord = require('discord.js')
const jsroblox = require('js-robloxapi');


exports.run = (bot, message, args, func) => {
  if(!args.join(' ')){
  func.embed(message.channel,'**Por favor, especifique un usuario!**')
  return;  
  }
  if (args.length > 1) {
    func.embed(message.channel,"Mi sistemas me dicen que los nombres de usuario de Roblox no tienen espacios en sus nombres");
  return;
  }
jsroblox.getInfo(args, (data) => {
if (!data) return message.channel.send(`Usuario **${args[0]}** no fue encontrado`); 
  
    let pages = [`**Nombre**\n ${data.Name}\n**ID:**\n ${data.Id}\n **Estado en línea**\n ${data.Online}`, `**Total de amigos:** \` ${data.TotalFriends}\`\n**Lista de amigos:**\n ${data.ListFriends}`, `**Lista de insignias**\n ${data.ListBadges}`, `**Lista de grupos**\n ${data.ListGroup}`]
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
                embed.setImage(data.Avatar)
                embed.setFooter(`Page ${page} of ${pages.length}`);
                
                msg.edit(embed);
            });
 
            forwards.on('collect', r => {
                if (page === pages.length) return;
                page++;
                embed.setDescription(pages[page - 1]);
                embed.setImage(data.Avatar)
                embed.setFooter(`Page ${page} of ${pages.length}`);
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