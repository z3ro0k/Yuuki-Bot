
const Discord = require('discord.js'); 
exports.run = (bot, message, args) => { 

  let spotifye = bot.emojis.get('name', 'spotify')
  let user = message.mentions.users.first() || bot.users.get(args[0]) || message.author 
  
  if (user.presence.activity !== null && user.presence.activity.type === 'LISTENING' && user.presence.activity.name === 'Spotify' && user.presence.activity.assets !== null) { // This checks all of these if statements, and if they are all true, it runs the following.
    
    let trackIMG = `https://i.scdn.co/image/${user.presence.activity.assets.largeImage.slice(8)}`;
    let trackURL = `https://open.spotify.com/track/${user.presence.activity.syncID}`;
    let trackName = user.presence.activity.details;
    let trackAuthor = user.presence.activity.state;
    let trackAlbum = user.presence.activity.assets.largeText; 

    const embed = new Discord.MessageEmbed() 
      .setAuthor('Spotify Track Info', 'https://cdn.discordapp.com/attachments/408560900254203905/410956731812937739/spotify4.png',  )  
      .setColor(0x36393e)
      .setThumbnail(trackIMG) 
      .addField('Song Name', trackName, true)  
      .addField('Author', trackAuthor, true)
      .addField('Album', trackAlbum, true)
      .addField('Listen to Track:', '[Spotify URL Track](' + trackURL + ')', true)
      .setFooter(`Spotify Music Command`, 'https://cdn.discordapp.com/attachments/408560900254203905/410956731812937739/spotify4.png')
 
    message.channel.send(embed).then(m => {
      m.react('<:spotify:410957293971177472>')
    })
    
  } else { 
    
    message.channel.send('**This user isn\'t listening to Spotify!**'); 
    
  }
  
  
}
exports.config = {
  command: "spotify",
  aliases: ['spotify']
}