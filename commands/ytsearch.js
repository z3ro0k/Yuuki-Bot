const Discord = require('discord.js')
const YoutubeDL = require('youtube-dl');
const db = require('quick.db')

exports.run = (bot, message, args, func) => {

		if (!args.join(' ')) {
    const embed = new Discord.MessageEmbed()
    .setColor(0x36393e)
    .setDescription(':x: **enter something to find it**')
    message.channel.send({embed})
      return;
    }

		message.channel.send('**:arrows_counterclockwise: Buscando la canción solicitada...**').then(response => {
			var searchstring = args.join(' ')
			if (!args.join(' ').startsWith('http')) {
				searchstring = 'gvsearch1:' + args;
			}

			YoutubeDL.getInfo(searchstring, ['-q', '--no-warnings', '--force-ipv4'], (err, info) => {
				
				if (err || info.format_id === undefined || info.format_id.startsWith('0')) {
					return response.edit(':x:  |  Vídeo no encontrado.');
				}

				info.requester = message.author.id;

      const embed = new Discord.MessageEmbed()
      .setColor(0x36393e)
      .addField('Song Name:', `[${info.title}](${info.webpage_url})`, true)
      .addField('Duration', info._duration_hms,true)
      .addField('Video ID', info.id)
      .setImage(info.thumbnail)
      .setThumbnail(info.thumbnail)
      .setFooter('Reacciona ➕ para mostrar más')
      .addField("Requested by:", `<@${message.author.id}>`, true)
      response.edit({embed}).then(msg => {
 
        msg.react('➕').then(r => {
            
            
            const backwardsFilter = (reaction, user) => reaction.emoji.name === '➕' && user.id === message.author.id
            
            
            const backwards = msg.createReactionCollector(backwardsFilter, { time: 10000 })
 
            backwards.on('collect', r => {
              message.delete()
                const embed = new Discord.MessageEmbed()
                embed.setColor(0x36393e)
                embed.setThumbnail(info.thumbnail)
                embed.setDescription(`Description\n${info.description}`);
                msg.edit(embed)
            })
          })    
        })      
      })
    })
  }
  
exports.config = {
  command: "ytsearch",
  aliases: ['ytsearch', 'buscarvideo']
}