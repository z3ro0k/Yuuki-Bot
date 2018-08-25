const Discord = require('discord.js')
const fetch = require('node-fetch')

exports.run = async (bot, msg, args) => {
var member = msg.mentions.users.first() || msg.guild.members.get(args.join(' ')) 
var langg = await bot.tools.Lang(msg.guild)    
const lang = require(`../langs/${langg}.json`) 
  
 try {
     if(member.id === msg.author.id) return msg.channel.send(lang.hug.author)
     if(member.id === bot.user.id) return msg.channel.send(lang.hug.client)
     if(member.bot) return msg.channel.send(lang.hug.author)
   
      const hugFetch = await fetch('https://nekos.life/api/v2/img/hug'),
        hugImg = await hugFetch.json();

      return msg.channel.send({ embed: {
         description: member
          ? `${member.displayName}! You were hugged by ${msg.member.displayName} 💖!`
          : `${msg.member.displayName} you must feel alone... Have a 🐈`,
        image: {url: member ? hugImg.url : 'http://gifimage.net/wp-content/uploads/2017/06/anime-cat-gif-17.gif'},
        color: msg.guild ? msg.guild.me.displayColor : 10610610
      }});
    } catch (err) {
  
      return msg.reply('something went wrong getting a poke image 💔');
    }
}
module.exports.config = {
  command: "hug",
  aliases: ['hug']
}