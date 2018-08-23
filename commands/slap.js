const Discord = require('discord.js')
const fetch = require('node-fetch')

exports.run = async (bot, msg, args) => {
var member = msg.mentions.users.first() || msg.guild.members.get(args.join(' ')) 
 try {
     
      const slapFetch = await fetch('https://nekos.life/api/v2/img/slap'),
        slapImg = await slapFetch.json()

      return msg.channel.send({ embed: {
          description: member
          ? `${member.displayName}! You got slapped by ${msg.member.displayName} 💢!` : `${msg.member.displayName} did you mean to slap someone B-Baka 🤔?`,
        image: {url: member ? slapImg.url : 'http://cdn.awwni.me/mz98.gif'},
        color: msg.guild ? msg.guild.me.displayColor : 10610610
      }});
    } catch (err) {
  
      return msg.reply('something went wrong getting a poke image 💔');
    }
}
module.exports.config = {
  command: "slap",
  aliases: ['slap']
}