const Discord = require('discord.js')
const fetch = require('node-fetch')

exports.run = async (bot, msg, args) => {
  
var member = msg.mentions.users.first() || msg.guild.members.get(args.join(' ')) 
var langg = await bot.tools.Lang(msg.guild)    
const lang = require(`../langs/${langg}.json`) 
  
 try {
     if(member === msg.author) return msg.channel.send(lang.slap.author)
     if(member === bot.user) return msg.channel.send(lang.client.client)
   
      const slapFetch = await fetch('https://nekos.life/api/v2/img/slap'),
        slapImg = await slapFetch.json()

      return msg.channel.send({ embed: {
          description: member
          ? `${member.displayName}! ${lang.slap.mention} ${msg.member.displayName} 💢!` : 
        `${msg.member.displayName} ${lang.slap.noMention}`,
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