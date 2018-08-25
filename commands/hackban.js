const Discord = require("discord.js");
var bCase = 2;
const { IdOwner } = require('../botconfig.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
        
   var langg = await client.tools.Lang(message.guild)    
  const lang = require(`../langs/${langg}.json`) 
  
        const member = args[0]
        const days = args[1]
        const reason = args[2]
        
     if(!message.guild) { 
        return message.member.hasPermission('BAN_MEMBERS') || message.author.id !== IdOwner
    }
      if(!member) return message.channel.send(lang.hackban.user);
      if (member === client.user.id) return message.channel.send(lang.hackban.uB);
      if (member === message.author.id) return message.channel.send(lang.hackban.uA);
      if(!days) return message.channel.send(lang.hackban.days);
      if(!reason) return message.channel.send(lang.hackban.reason);
      
  

        client.users.fetch(member).then(async usr => {
            await message.channel.send(`Are you sure you want to ban **${usr.tag}**? \`\`(y/n)\`\``);
            const msgs = await message.channel.awaitMessages(res => res.author.id === message.author.id, {
                max: 1,
                time: 30000
            });

            if (!msgs.size || !['y', 'yes'].includes(msgs.first().content.toLowerCase())) return message.channel.send(lang.hackban.cancel);
            if (['n', 'no'].includes(msgs.first().content.toLowerCase())) return message.channel.send(lang.hackban.cancel)
 
            await message.guild.members.ban(usr.id, { days, reason });
            return await message.channel.send(lang.hackban.succ);
        })


    }
exports.config = {
  command: "hackban",
  aliases: ["hb", "hackb"],
  category: "mod",
  description: "Bannea a un usuario usando su ID",
  usage: "Yu!hackban 322203879208910849"
};