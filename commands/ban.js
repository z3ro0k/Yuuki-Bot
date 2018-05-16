const Discord = require('discord.js')
let bCase = 12;
exports.run = async (bot, message, args) => {

let user = message.mentions.users.first();
let razon = args[1]
let perms = message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS");
  if(args[0] == "help"){
  const help = new Discord.RichEmbed()
      .addField('Uso:', "Yu-ban <user> <razon> ")
      .setColor(0x36393e)
      .addField('Descripción', "Baneas al usuario mencionado de tu server incluye razon")
      .addField('Ejemplos:', "Yu-ban @ToXicGMDyt#7319 spam DM\nYu-ban @Kikin'M#9816 no respetar las reglas")
      message.channel.send(help);
      return;
    }
if(!perms) return message.channel.send("<:adminNep:372599923381633024> **| No tienes Permisos para usar este comando.**");
     
if (message.mentions.users.size < 1) return message.reply("Debe mencionar a alguien <:bEmoji:440388028939239434> ").catch(console.error);
if(!razon) return message.channel.send('Escriba un razón, `N!ban @username [razón]`');
if (!message.guild.member(user).bannable) return message.reply('No puedo banear al usuario mencionado.');
                                      
                                  
 message.guild.member(user).ban(razon);
  let banEmbed = new Discord.RichEmbed()
    .setDescription(`**<:bEmoji:440388028939239434>Ban | Case #${bCase = bCase + 1}**`)
    .setColor(0x36393e)
    .addField("Banned User", `${user} with ID ${user.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Reason", razon)
    .addField("Time", message.createdAt)
    
 message.channel.send(banEmbed);
}
module.exports.config = {
  command: "ban"
}