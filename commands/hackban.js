const Discord = require("discord.js");
var bCase = 2;
const { IdOwner } = require('../botconfig.js')
const db = require('quick.db')

exports.run = (client, message, args) => {
        
        const member = args[0]
        const days = args[1]
        const reason = args[2]
        
     if(!message.guild) { message.author.id !== IdOwner
        return message.member.hasPermission('BAN_MEMBERS') || message.author.id !== IdOwner
    }
      if(!member) return message.channel.send('Which user do you want to hackban?\n');
      if (member === client.user.id) return message.channel.send('Please don\'t hackban me...!');
      if (member === message.author.id) return message.channel.send('I wouldn\'t dare hackban you...!');
      if(!days) return message.channel.send('How much days to delete message history? (max: 7)\n');
      if(!reason) return message.channel.send('What is the reason?\n');
      
  

        client.users.fetch(member).then(async usr => {
            await message.channel.send(`Are you sure you want to ban **${usr.tag}**? \`\`(y/n)\`\``);
            const msgs = await message.channel.awaitMessages(res => res.author.id === message.author.id, {
                max: 1,
                time: 30000
            });

            if (!msgs.size || !['y', 'yes'].includes(msgs.first().content.toLowerCase())) return message.channel.send('Cancelled command!');
            if (['n', 'no'].includes(msgs.first().content.toLowerCase())) return message.channel.send('Cancelled command!')
 
            await message.guild.members.ban(usr.id, { days, reason });
            return await message.channel.send(`Successfully banned **${usr.tag}**! 👋`);
        })


    }
exports.config = {
  command: "hackban",
  aliases: ["hb", "hackb"],
  category: "mod",
  description: "Bannea a un usuario usando su ID",
  usage: "Yu!hackban 322203879208910849"
};