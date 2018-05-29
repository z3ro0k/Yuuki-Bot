const Discord = require("discord.js");
var bCase = 2;
exports.run = (client, message, args) => {
        
        let id = message.mentions.users.first() ? message.mentions.users.first().id : args.join(' ').match(/\d{16,18}/) ? args.join(' ').match(/\d{16,18}/)[0]: null;

            
if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply(':no_entry_sign: Sorry, you are not allowed to ban user on this server!');
 
if (!id) return message.reply('Mention someone or specify an ID!');
let user = client.users.has(id) ? client.users.get(id) : null;
if (user) {

    message.guild.ban(user, 2);
    
    const embed = new Discord.RichEmbed()
    .setTitle(`**<:bEmoji:440388028939239434>Banned | Case #${bCase = bCase + 1}**`)
    .addField(`${user.tag}`, `**ID: ${user.id}**` )
    .addField(`User banned`,` ${user.username} was banned successfully!`)
    .setThumbnail(user.displayAvatarURL)
    .setColor(0x36393e)
   
    let incidentchannel = message.guild.channels.find(`name`, "mod-logs");
    if(!incidentchannel) return message.channel.send("Can't find incidents channel.");
    incidentchannel.send({embed});
} else {
    message.reply('I did not find any users');
}
};
exports.config = {
  command: "hackban"
}