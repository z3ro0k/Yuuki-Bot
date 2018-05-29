const Discord = require("discord.js");
var bCase = 2;
const { IdOwner } = require('../botconfig.js')
exports.run = (client, message, args) => {
        
        const { member, reason } = args.join(' ');
   if(!message.guild) { message.author.id !== IdOwner
        return message.member.hasPermission('BAN_MEMBERS') || message.author.id !== IdOwner
    }

        if (member === client.user.id) return message.channel.send('Please don\'t hackban me...!');
        if (member === message.author.id) return message.channel.send('I wouldn\'t dare hackban you...!');

        client.users.fetch(member).then(async usr => {
            await message.channel.send(`Are you sure you want to ban **${usr.tag}**? \`\`(y/n)\`\``);
            const msgs = await message.channel.awaitMessages(res => res.author.id === message.author.id, {
                max: 1,
                time: 30000
            });

            if (!msgs.size || !['y', 'yes'].includes(msgs.first().content.toLowerCase())) return message.channel.send('Cancelled command!');
            if (['n', 'no'].includes(msgs.first().content.toLowerCase())) return message.channel.send('Cancelled command!')

            await message.guild.ban(member, 2);
            return await message.channel.send(`Successfully banned **${usr.tag}**! 👋`);
        })


    }
exports.config = {
  command: "hackban"
}