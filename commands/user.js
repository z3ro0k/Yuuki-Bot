const Discord = require("discord.js");
const dateformat = require('dateformat');
const datediff = require('date-diff')


exports.run = async(bot, message, args) => {
 
    
let user = message.mentions.users.first() || message.author
let member = message.guild.member(user)
let roles = member.roles.array().slice(1).sort((a, b) => a.comparePositionTo(b)).reverse().map(role => `<@&${role.id}>`);
let messageauthor = message.guild.member(message.author)
let authorroles = message.guild.member(message.author).roles.array().slice(1).sort((a, b) => a.comparePositionTo(b)).reverse().map(role => `<@&${role.id}>`)

let joined = new datediff(Date.now(), member.joinedAt);
let created = new datediff(Date.now(), user.createdAt);

if (roles.length < 1) roles = ['None']
const status = {
   online: 'Online', 
   idle: 'Idle',
   dnd: 'Do Not Disturb',
   offline: 'Offline/Invisible'
 };
 let emoji;
 if (user.presence.status === "online") {
     emoji = "<a:Online:446119385480953866>"
 }
 if (user.presence.status === "dnd") {
     emoji = "<a:Dnd:446126900788592670>"
 }
 if (user.presence.status === "idle") {
     emoji = "<a:Idle:446126963585974283>"
 }
 if (user.presence.status === "offline") {
     emoji = "<a:Offline:446126934355738627>"
 }
 
 let game = user.presence.game && user.presence.game && user.presence.game.name
 if (!game) {
     game = "User is not playing a game"
 }
  let nickname
  if (user.displayName === undefined ) nickname = 'oof!'        
  else nickname = user.displayName  
  
  let botuser; 
  if (member.user.bot === true) botuser = 'Yes'
  else botuser = 'No'
  
                var lastmsg = user.lastMessage;
                if (lastmsg === undefined) {
                    lastmsg = "Has not said a message yet"
                }
        	
          
	let embed = new Discord.RichEmbed()
	.setTitle("Userinfo ")
  .setColor(0x36393e)
  .setThumbnail(user.displayAvatarURL)
  .addField("Username:", user.tag, true)
  .addField("Nickname", nickname, true)
  .addField("ID", user.id, true)
  .addField(`Status${emoji}`, status[user.presence.status], true)
 // .addField("Last Message", lastmsg, true)
  .addField("Playing", `${game}`, true) 
  .addField("Bot?", `${botuser}`, true)
  .addField("Created Account On", `${dateformat(user.createdAt, "***mmmm dS, yyyy***, On a ***dddd***, ***h:MM:ss TT, Z***")}, that is **${Math.round(created.days())} days ago!**`, true)
  .addField(`Joined ${message.guild.name} On`, `${dateformat(member.joinedAt, "***mmmm dS, yyyy***, On a ***dddd***, ***h:MM:ss TT, Z***")}, that is **${Math.round(joined.days())} days ago!**`, true)
  .addField("Roles", `${roles.join(' [➜](https://discord.gg/RwmuHu6) ')}`, true)
  message.channel.send({ embed: embed })

}
module.exports.config = {
  command: "user"
}
