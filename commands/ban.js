const Discord = require('discord.js')
const db = require('quick.db')
exports.run = async (bot, message, args) => {

 var langg
 const idioma = await db.fetch(`guildLang_${message.guild.id}`)
 if (idioma === null) langg = 'es'
 else langg = idioma       
 const lang = require(`../langs/${langg}.json`)

 const casenumbers = new db.table('CASENUMBERs')
 const guildcasenumber = await casenumbers.fetch(`case_${message.guild.id}`)
 const a = guildcasenumber
 const b = a + 1
 casenumbers.set(`case_${message.guild.id}`, b)
 
let user = message.mentions.users.first();
let razon = args[1]
let perms = message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS");

if(!perms) return message.channel.send(lang.noP.ban);
     
if (message.mentions.users.size < 1) return message.reply(lang.ban.men).catch(console.error);
if(!razon) return message.channel.send(lang.ban.reazon);
if (!message.guild.member(user).bannable) return message.reply(lang.ban.noBP);
         
  const modlog = message.guild.channels.find(channel => channel.name === 'mod-logs');
  if (!modlog) return message.channel.send(lang.ban.noC)
                                  
 message.guild.member(user).ban(razon);
  let banEmbed = new Discord.MessageEmbed()
    .setDescription(`**<:bEmoji:440388028939239434>Ban | Case #${guildcasenumber}**`)
    .setColor(0x36393e)
    .addField("User", `${user} with ID ${user.id}`)
    .addField("Mod", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Reason", razon)
    .addField("Time", message.createdAt)
    
 modlog.send(banEmbed);
}
exports.config = {
  command: "ban",
  aliases: ["ban", "b"],
  category: "info",
  description: "Baneas al usuario mencionado de tu server incluye razon",
  usage: "Yu!ban @ToXicGMDyt#7319 spam DM"
};