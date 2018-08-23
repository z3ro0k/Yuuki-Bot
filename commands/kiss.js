const Discord = require('discord.js')
const db = require('quick.db')
const fetch = require('node-fetch')
      
exports.run = async (bot, msg, args) => {
  
    try {
  const kissFetch = await fetch('https://nekos.life/api/v2/img/kiss'),
        kissImg = await kissFetch.json();
var member = msg.mentions.users.first() || msg.guild.members.get(args.join(' ')) 
  //console.log(member)
//if(member.id === msg.author.id) return msg.channel.send()
 return msg.channel.send({ embed: {
        description: member
          ? `${member.username}! You were kissed by ${msg.member.displayName} 💋!` : `${msg.member.displayName} you must feel alone... Have a 🐈`,
        image: {url: member ? kissImg.url : 'http://gifimage.net/wp-content/uploads/2017/06/anime-cat-gif-17.gif'},
        color: msg.guild ? msg.guild.me.displayColor : 10610610
      }}/*, `<@${member ? member.id : msg.author.id}>`*/);
  
    } catch (err) {
    console.log(err)
      return msg.reply('something went wrong getting a kiss image 💔');
  }
} 
exports.config = {
  command: "kiss",
  aliases: ['kiss', 'besar'],
  category: "fun",
  description: "Besas al usuario mencionado",
  usage: "Yu!kiss @ToXicGMDyt#7319 "
};