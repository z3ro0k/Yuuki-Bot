const Discord = require('discord.js'),
      db = require('quick.db')

exports.run = async (bot, message, args ,func) => {
  
  const giphy = require('giphy-api')('Bgn4zuOYf4jIAi6uUwXM3OIZcGI62rde');
  if (!args) return  message.channel.send('Porfavor ingresa algun termino para buscar el gif');
  message.channel.send(':arrows_counterclockwise: Buscando...')
  .then(m => {
    giphy.search({
    q: args,
    limit: 5
    }, function (err, res) {
    if(err){
      return console.log(err);
    }
      if(!res.data){
      return m.edit('¡No encontre algun resultado!')
    }
      let key1 = res.data[0].url.substr(res.data[0].url.lastIndexOf('-') + 1);
      let url1 = `https://media.giphy.com/media/${key1}/giphy.gif`;
      let key2 = res.data[1].url.substr(res.data[1].url.lastIndexOf('-') + 1);
      let url2 = `https://media.giphy.com/media/${key2}/giphy.gif`;
      let key3 = res.data[2].url.substr(res.data[2].url.lastIndexOf('-') + 1);
      let url3 = `https://media.giphy.com/media/${key3}/giphy.gif`;
      let key4 = res.data[3].url.substr(res.data[3].url.lastIndexOf('-') + 1);
      let url4 = `https://media.giphy.com/media/${key4}/giphy.gif`;
      let key5 = res.data[4].url.substr(res.data[4].url.lastIndexOf('-') + 1);
      let url5 = `https://media.giphy.com/media/${key5}/giphy.gif`;
    
  let pages = [url1, url2, url3, url4, url5]

let page = 1

const embed = new Discord.MessageEmbed()
.setAuthor("Resultado de búsqueda de gifs para: '"+args+"'", `https://icdn4.digitaltrends.com/image/api_giphy_logo-1200x630-c-ar1.91.png`)
.setImage(pages[page - 1])
.setColor(0x36393e)
.setFooter(`Página ${page} de ${pages.length}`)
m.edit(embed).then(msg => {
 
        msg.react('⏪').then(r => {
            msg.react('⏩');
 
            const backwardsFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
            const forwardsFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;
 
            const backwards = msg.createReactionCollector(backwardsFilter, { time: 360000 });
            const forwards = msg.createReactionCollector(forwardsFilter, { time: 360000 });
 
            backwards.on('collect', r => {
                if (page === 1) return;
                page--;
                embed.setImage(pages[page - 1]);
                embed.setFooter(`Página ${page} de ${pages.length}`);
                msg.edit(embed);
            });
 
            forwards.on('collect', r => {
                if (page === pages.length) return;
                page++;
                embed.setImage(pages[page - 1]);
                //embed.setThumbnail(message.author.displayAvatarURL())
                embed.setFooter(`Página ${page} de ${pages.length}`);
                msg.edit(embed);
            });
        });
 
    });
    });
  })
}
exports.config = {
  command: "gif",
  aliases: ["gif", "g", "giphy"]
}