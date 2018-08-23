const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let WarnCase = 12;


const db = require('quick.db')
let warns = JSON.parse(fs.readFileSync("./data/warnings.json", "utf8"));

exports.run = async (bot, message, args, func) => {

    var channelID = await bot.tools.getLogsChannel(message.guild)
    const modlog = message.guild.channels.find(channel => channel.id === `${channelID}`);
  
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Sorry, but you do not have valid permissions! If you believe this is an error, contact an owner.")
  
    const mod = message.author;
  
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  
    if (!user) return message.channelsend("Couldn't find user.")
    if (user.hasPermission("KICK_MEMBERS")) return message.channel.send("The user you are trying to warn is either the same, or higher role than you.")
    let reason = message.content.split(" ").slice(2).join(" ");
    if (!reason) return message.channel.send('Please specify a reason for the warn!')
  
  if (!modlog) return message.channel.send('**Please create a channel with the name `mod-log`**')
  
    const casenumbers = new db.table('CASENUMBERs')
    const guildcasenumber = await casenumbers.fetch(`case_${message.guild.id}`)
    const a = guildcasenumber
    const b = a + 1
    casenumbers.set(`case_${message.guild.id}`, b)

    const numberwarn = new db.table('WARNNUMBERs')
    const num1 = await numberwarn.fetch(`user_${user.id}_${message.guild.id}`)
    const y = 1
    const m = y + num1
    numberwarn.set(`user_${user.id}_${message.guild.id}`, m)

    if (user) {

        const userwarn = new db.table('USERWARNINGs')
        const num2 = await numberwarn.fetch(`user_${user.id}_${message.guild.id}`)
        const warns = await userwarn.fetch(`warn_${user.id}_${num2}_${message.guild.id}`)
        userwarn.set(`warn_${user.id}_${num2}_${message.guild.id}`, reason)

        const embed = new Discord.MessageEmbed()
            .setAuthor('Warn')
            .addField('Moderator', `${mod}`)
            .addField('User', `<@${user.id}>`)
            .addField('Reason', `${reason}`)
            .addField('Case Number', `${guildcasenumber}`)
            .setColor(0x36393e)
            .setTimestamp()
            .setThumbnail(user.user.avatarURL)
            .setFooter(`ID ${user.id}`)
       modlog.send(embed)
      
        message.channel.send('I have warned the person and logged it!')
        user.send(`**You have been warned in ${message.guild.name}: ${reason}!**`)
   
  if(num1 === 3){
    let muterole = message.guild.roles.find(role => role.name === "muted");
    if(!muterole)  message.reply("El rol **muted** no existe en el servidor.");

    let mutetime = "10m";
    user.roles.add(message.guild.roles.find(role => role.name === "muted"));
    message.channel.send(`<@${user.id}> fue silenciado temporalmente!`);

    setTimeout(function(){
      user.roles.remove(muterole)
      message.reply(`Se le ha acabado el tiempo del silencio a <@${user.id}> `)
    }, ms(mutetime))
  }
  if(num1 === 5){
    var days = '7'
    await message.guild.members.ban(user.id, { days, reason });
    message.reply(`<@${user.id}> a sido baneado del servidor por pasar las 5 warns.`)
   }
  }
}
  
module.exports.config = {
  command: "warn",
  aliases: ['warn', 'warnear']
}