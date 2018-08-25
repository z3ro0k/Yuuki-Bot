const Discord = require('discord.js')
const fetch = require('node-fetch')

exports.run = async (bot, msg, args) => {
var member = msg.mentions.users.first() || msg.guild.members.get(args.join(' ')) 
var langg = await bot.tools.Lang(msg.guild)    
const lang = require(`../langs/${langg}.json`) 
  
 try {
     if(member === msg.author) return msg.channel.send(lang.hug.author)
     if(member === bot.user) return msg.channel.send(lang.hug.client)

   
      const hugFetch = await fetch('https://nekos.life/api/v2/img/hug'),
        hugImg = await hugFetch.json();

      return msg.channel.send(`<@${member ? member.id : msg.author.id}>`, { embed: {
         description: member
          ? `${member.username}! ${lang.hug.mention} ${msg.member.displayName} 💖!`
          : `${msg.member.displayName} ${lang.hug.notMention}`,
        image: {url: member ? hugImg.url : 'http://gifimage.net/wp-content/uploads/2017/06/anime-cat-gif-17.gif'},
        color: msg.guild ? msg.guild.me.displayColor : 10610610
      }});
    } catch (err) {
    console.log(err)
      return msg.reply(lang.hug.error);
    }
}
module.exports.config = {
  command: "hug",
  aliases: ['hug']
}