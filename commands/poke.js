const Discord = require('discord.js')
const fetch = require('node-fetch')

exports.run = async (bot, msg, args) => {
  
var member = msg.mentions.users.first() || msg.guild.members.get(args.join(' ')) 
var langg = await bot.tools.Lang(msg.guild)    
const lang = require(`../langs/${langg}.json`) 
  
 try {
     if(member === msg.author) return msg.channel.send(lang.pat.author)
     if(member === bot.user) return msg.channel.send(lang.pat.client)
   
     
      const pokeFetch = await fetch('https://nekos.life/api/v2/img/poke'),
        pokeImg = await pokeFetch.json();

      return msg.channel.send(`<@${member ? member.id : msg.author.id}>` ,{ embed: {
        description: member
          ? `${member.username}! ${lang.poke.mention} ${msg.member.displayName} 👉!` : 
        `${msg.member.displayName} ${lang.poke.notMention}`,
        image: {url: member ? pokeImg.url : 'http://gifimage.net/wp-content/uploads/2017/06/anime-cat-gif-17.gif'},
        color: msg.guild ? msg.guild.me.displayColor : 10610610
      }});
    } catch (err) {
  
      return msg.reply(lang.poke.error);
    }
}
module.exports.config = {
  command: "poke",
  aliases: ['poke']
}