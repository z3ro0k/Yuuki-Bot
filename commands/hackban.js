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
      
  
        try {
            banMember(args[0], args[1] ? args.slice(1).join(' ') : "No reason provided.");
        } catch(err) {
            msg.channel.createMessage('User wasn\'t found.');
        }
            return await message.channel.send(`Successfully banned **${usr.tag}**! 👋`);

         function banMember(id, reason) {
            msg.channel.guild.banMember(id, 7, `[${msg.author.username}#${msg.author.discriminator}] ${reason}`)
                .then((m) => {
                    msg.channel.send(`Successfully banned **<@${id}>**! 👋`);
                })
                .catch(e => {
                    msg.channel.createMessage(`Error has occured while banning <@${id}>. :<`);
                });


    }
exports.config = {
  command: "hackban",
  aliases: ["hb", "hackb"],
  category: "mod",
  description: "Bannea a un usuario usando su ID",
  usage: "Yu!hackban 322203879208910849"
};