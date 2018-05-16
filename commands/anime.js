const Discord = require('discord.js')
 const Anime = require('malapi').Anime;
exports.run = async (bot, message, args) => {
 
if(!args.join(' ')) {
  message.channel.send('Escribe el nombre del anime a buscar')
  return;
}
              Anime.fromName(args.join(' ')).then(anime => {
             const embed = new Discord.RichEmbed()
                .setTitle(anime.title+' - '+ anime.id)
                .setURL(anime.detailsLink)
                .addField('Episodios', `${anime.episodes}`, true)
                .addField('Tipo', `${anime.type}`, true)
                .addField('Estado', `${anime.status}`, true)
                .addField('Géneros', `${anime.genres}`, true)
                .addField('Fecha de transmisión', `${anime.aired}`, true)
                .addField('Productora', `${anime.studios}`, true)
                .setFooter(`${anime.synopsis}`)
                .setThumbnail(anime.image)
                .setColor(0x36393e)
                message.channel.send({embed});
              });
}
module.exports.config = {
  command: "anime"
}