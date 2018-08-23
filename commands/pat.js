const Discord = require('discord.js')
const fetch = require('node-fetch')

exports.run = async (bot, msg, args) => {
 try {
    
      const patFetch = await fetch('https://nekos.life/api/v2/img/pat'),
        petImg = await patFetch.json();
      
     var member = msg.mentions.users.first() || msg.guild.members.get(args.join(' ')) 
     if(member.id === msg.author.id) return msg.channel.send()
     
      return msg.embed({
        description: member
          ? `${member.displayName}! You got patted by ${msg.member.displayName} 🐇!`
          : `${msg.member.displayName} you must feel alone... Have a 🐈`,
        image: {url: member ? petImg.url : 'http://gifimage.net/wp-content/uploads/2017/06/anime-cat-gif-17.gif'},
        color: msg.guild ? msg.guild.me.displayColor : 10610610
      }, `<@${member ? member.id : msg.author.id}>`);
    } catch (err) {

      return msg.reply('something went wrong getting a pat image 💔');
    }
}
module.exports.config = {
  command: "pat",
  aliases: ['pat']
}