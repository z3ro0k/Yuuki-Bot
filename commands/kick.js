const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
  
    const casenumbers = new db.table('CASENUMBERs')
    const guildcasenumber = await casenumbers.fetch(`case_${message.guild.id}`)
    const a = guildcasenumber
    const b = a + 1
    casenumbers.set(`case_${message.guild.id}`, b)

    if(!message.member.hasPermission("KICK_MEMBERS")) return errors.noPerms(message, "KICK_MEMBERS");

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return errors.cantfindUser(message.channel);
    if(kUser.hasPermission("MANAGE_MESSAGES")) return errors.equalPerms(message, kUser, "MANAGE_MESSAGES");

    let kReason = args.join(" ").slice(22);   
    if(!kReason) return message.channel.send("Por favor, especifique la razón para patear al usuario mencionado.");
    
    let kickEmbed = new Discord.MessageEmbed()
    .setDescription(`**<:kEmoji:440388066197110785>Kick | Case #${guildcasenumber}**`)
    .setColor(0x36393e)
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`, true)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`, true)
    .addField("Kicked In", message.channel, true)
    .addField("Reason", kReason ,true)
    .addField("Time", message.createdAt, true)
     
    let kickChannel = message.guild.channels.find(c => c.name === "mod-logs");
    if(!kickChannel) return message.channel.send("No se puede encontrar el canal `mod-logs` porfavor crealo para mandar los incidetes ahi");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
}

exports.config = {
  command: "kick",
  aliases: ['kickear', 'patear'],
  category: "mod",
  description: "Pateas al usuario mencionado del server",
  usage: "Yu!kick @ToXicGMDyt#7319 spam"
};