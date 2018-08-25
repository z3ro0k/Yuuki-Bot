const Discord = require('discord.js')
const fetch = require('node-fetch')

exports.run = async (bot, msg, args) => {
  
var member = msg.mentions.users.first() || msg.guild.members.get(args.join(' ')) 
var langg = await bot.tools.Lang(msg.guild)    
const lang = require(`../langs/${langg}.json`) 
  
 try {
     if(member === msg.author) return msg.channel.send(lang.pat.author)
     if(member === bot.user) return msg.channel.send(lang.pat.client)
   
      const patFetch = await fetch('https://nekos.life/api/v2/img/pat'),
        petImg = await patFetch.json();
      
      return msg.channel.send(`<@${member ? member.id : msg.author.id}>` , { embed: {
        description: member
          ? `${member.username}! ${lang.pat.mention} ${msg.member.displayName} 🐇!`
          : `${msg.member.displayName} ${lang.pat.notMention}`,
        image: {url: member ? petImg.url : 'http://gifimage.net/wp-content/uploads/2017/06/anime-cat-gif-17.gif'},
        color: msg.guild ? msg.guild.me.displayColor : 10610610
      }});
    } catch (err) {
    console.log(err)
      return msg.reply(lang.pat.error);
    }
}
module.exports.config = {
  command: "pat",
  aliases: ['pat']
}