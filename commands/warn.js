const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let WarnCase = 12;
let channel

const db = require('quick.db')
let warns = JSON.parse(fs.readFileSync("./data/warnings.json", "utf8"));

exports.run = (bot, message, args, func) => {

  
  if(!message.member.hasPermission("KICK_MEMBERS")) {
  message.reply("<:adminNep:372599923381633024> **| No tienes Permisos para usar este comando.**");
  return; 
  }
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) {
  message.reply("Porfavor mencionar a un usuario para warnear");
  return;  
  }
  if(wUser.hasPermission("KICK_MEMBERS")) {
  message.reply("No puedo warnear al usuario mencionado");
  return; 
  }
  
  let reason = args.join(" ").slice(22);
  if(!reason) {
    message.reply('Escribe la razon ')
  return;
}

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

   const embed = new Discord.MessageEmbed() 
  .setDescription(`Warns | #${WarnCase = WarnCase + 1}`)
  .setAuthor(message.author.username)
  .setColor(0x36393e)
  .addField("Warned User", '<@'+ wUser.id + '>')
  .addField("Warned In", message.channel)
  .addField("Number of Warnings", warns[wUser.id].warns)
  .addField("Reason", reason);

  let canal = message.guild.channels.get(channel => channel.name === 'mod-logs')
  if(!canal) return message.reply("Couldn't find channel");

  canal.send({ embed });
   
  if(warns[wUser.id].warns == 3){
    let muterole = message.guild.roles.find(role => role.name === "muted");
    if(!muterole)  message.reply("El rol **muted** no existe en el servidor.");

    let mutetime = "10m";
    wUser.roles.add(message.guild.roles.find(role => role.name === "muted"));
    message.channel.send(`<@${wUser.id}> fue silenciado temporalmente!`);

    setTimeout(function(){
      wUser.roles.remove(muterole)
      message.reply(`Se le ha acabado el tiempo del silencio a <@${wUser.id}> `)
    }, ms(mutetime))
  }
  if(warns[wUser.id].warns == 5){
    message.guild.member(wUser).ban(reason);
    message.reply(`<@${wUser.id}> a sido baneado del servidor por pasar las 5 warns.`)
  }

}
module.exports.config = {
  command: "warn",
  aliases: ['warn', 'warnear']
}