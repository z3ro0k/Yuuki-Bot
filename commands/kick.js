const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
  
    var langg = await bot.tools.Lang(message.guild)    
    const lang = require(`../langs/${langg}.json`) 
    
    const casenumbers = new db.table('CASENUMBERs')
    const guildcasenumber = await casenumbers.fetch(`case_${message.guild.id}`)
    const a = guildcasenumber
    const b = a + 1
    casenumbers.set(`case_${message.guild.id}`, b)

    let perms = message.member.hasPermission("KCIK_MEMBERS");
    if(!perms) return message.channel.send(lang.noP.ban);

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  
    if(!kUser) return message.channel.send(lang.kick.men);
    if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send(lang.kick.noBP);

    let kReason = args.join(" ").slice(22);   
    if(!kReason) return message.channel.send(lang.kick.reazon);
    
  var idC = await bot.tools.getLogsChannel(message.guild)
  
  let kickChannel = message.guild.channels.find(c => c.id === idC);
  if(!kickChannel) return message.channel.send(lang.kick.noC);
    
  let kickEmbed = new Discord.MessageEmbed()
    .setDescription(`**<:kEmoji:440388066197110785>Kick | Case #${guildcasenumber}**`)
    .setColor(0x36393e)
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`, true)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`, true)
    .addField("Kicked In", message.channel, true)
    .addField("Reason", kReason ,true)
    .addField("Time", message.createdAt, true)
     

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