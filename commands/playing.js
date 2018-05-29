const Discord = require('discord.js')

exports.run = (bot, message, args, func) => { 
  
let user = message.mentions.users.first() || bot.users.get(args[0]) || message.author
let juego = user.presence.activity || {} 
   if (user.presence.activity !== null && user.presence.type === 'LISTENING' && user.presence.name === 'Spotify' && user.presence.activity.assets !== null) {
     message.channel.send(`the user **${user.username}** is listening to music on spotify for more information use >spotify @user or >spotify`)
     return;
   }
  if (user.presence.activity !== null && user.presence.type === 'STREAMING') {
     const embed = new Discord.RichEmbed()
      .setColor(0x7301c5)
      .setThumbnail(user.displayAvatarURL())
      .addField(`State of ${user.username}`, '<:stream:409502167108419637>Transmitting')
      .addField(`${user.username} is transmitting to`, `${juego.name || 'Nothing'} [(Streaming URL)](${user.presence.activity.url})`)
     message.channel.send({ embed })
     return;
   }
  
 if (message.author.presence.game !== null) {
    }
       let color = {
      "online": "#00c903",
      "idle": "#ff9a00",
      "dnd": "#ff0000",
      "offline": "#d8d8d8",
      "streaming": 0x7301c5
};
let estados = {
      "online": "<:online:409502042604961792>Online",
      "idle": "<:idle:409502137521799168>Absent",
      "dnd": "<:dnd:409502091510415362>Do not bother",
      "offline": "<:invisible:409502255847309313>Offline / invisible",
      "streaming": "<:stream:409502167108419637>Transmitting"
};


let game = user.presence.activity || {} 
const embed = new Discord.RichEmbed()
    .setColor(color[user.presence.status])
    .setThumbnail(user.displayAvatarURL)
    .addField(`State of ${user.username}`, `${estados[user.presence.status]} `)
    .addField(`${user.username} is playing to `, `${game.name || 'Nothing'} ${game.streaming ? `[(Streaming)](${game.displaygameURL})` : ''}`)
    .setTimestamp()
    message.channel.send({embed}); 
}
exports.config = {
  command: "playing"
}