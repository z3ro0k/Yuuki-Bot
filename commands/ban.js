const Discord = require('discord.js')

exports.run = async (bot, message, args) => {

let user = message.mentions.users.first();
let razon = args[1]
let perms = message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS");

if(!perms) return message.channel.send("<:adminNep:372599923381633024> **| No tienes Permisos para usar este comando.**");
     
if (message.mentions.users.size < 1) return message.reply("Debe mencionar a alguien <:bEmoji:440388028939239434> ").catch(console.error);
if(!razon) return message.channel.send('Escriba un razón, `N!ban @username [razón]`');
if (!message.guild.member(user).bannable) return message.reply('No puedo banear al usuario mencionado.');
                                      
                                  
 message.guild.member(user).ban(razon);
  
 message.channel.send(`**${user.username}**, fue baneado del servidor, razón: ${razon}.`);
}
module.exports.config = {
  command: "ban"
}