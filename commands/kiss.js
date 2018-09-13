const Discord = require('discord.js')
const db = require('quick.db')
const fetch = require('node-fetch')
      
exports.run = async (bot, msg, args) => {
 var member = msg.mentions.users.first() || msg.guild.members.get(args.join(' ')) 
var langg = await bot.tools.Lang(msg.guild)    
const lang = require(`../langs/${langg}.json`) 
  
 try {
     if(member === msg.author) return msg.channel.send(lang.kiss.author)
     if(member === bot.user) return msg.channel.send(lang.kiss.client)
   
  const kissFetch = await fetch('https://nekos.life/api/v2/img/kiss'),
        kissImg = await kissFetch.json();

 return msg.channel.send(`<@${member ? member.id : msg.author.id}>` ,{ embed: {
        description: member
          ? `${message.author.username} gave ${message.mentions.members.first().user.username} a kiss!` : 
        `${msg.member.displayName} ${lang.kiss.notMention}`,
        image: {url: member ? kissImg.url : 'http://gifimage.net/wp-content/uploads/2017/06/anime-cat-gif-17.gif'},
        color: msg.guild ? msg.guild.me.displayColor : 10610610
      }}/*, */);
  
    } catch (err) {
    console.log(err)
      return msg.reply(lang.kiss.error);
  }
} 
exports.config = {
  command: "kiss",
  aliases: ['kiss', 'besar'],
  category: "fun",
  description: "Besas al usuario mencionado",
  usage: "Yu!kiss @ToXicGMDyt#7319 "
};