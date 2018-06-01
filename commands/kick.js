const Discord = require("discord.js");
const errors = require("../utils/errors.js");
let kCase = 1;
module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("KICK_MEMBERS")) return errors.noPerms(message, "KICK_MEMBERS");
      if(args[0] == "help"){
  const help = new Discord.MessageEmbed()
      .addField('Uso:', "Yu-kick <user> <razon> ")
      .setColor(0x36393e)
      .addField('Descripción', "Pateas al usuario mencionado del tu server")
      .addField('Ejemplos:', "Yu-kick @ToXicGMDyt#7319 spam\nYu-kick @Kikin'M#9816 no respetar las reglas")
      message.channel.send(help);
      return;
    }
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return errors.cantfindUser(message.channel);
    if(kUser.hasPermission("MANAGE_MESSAGES")) return errors.equalPerms(message, kUser, "MANAGE_MESSAGES");

    let kReason = args.join(" ").slice(22);   
    if(!kReason) return message.channel.send("Please specify the reason to kick the mentioned user.");
    
    let kickEmbed = new Discord.MessageEmbed()
    .setDescription(`**<:kEmoji:440388066197110785>Kick | Case #${kCase = kCase + 1}**`)
    .setColor(0x36393e)
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Reason", kReason)
    .addField("Time", message.createdAt)
     
    let kickChannel = message.guild.channels.find(`name`, "mod-logs");
    if(!kickChannel) return message.channel.send("Can't find incidents channel.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
}

module.exports.config = {
  command: "kick",
  aliases: ['kickear', 'patear']
}