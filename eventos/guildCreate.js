const Discord = require('discord.js')

exports.run = (bot, guild, args, tools) => {

var canal = bot.channels.get('429467913531949056'); 
let user = guild.members.size;
let bots = guild.members.filter(m => m.user.bot).size;
let discriminar = user - bots;
  const channelini = guild.channels.filter(c => c.permissionsFor(guild.me).has('SEND_MESSAGES') && c.type === 'text').first();
let idc = channelini.id;
bot.channels.get(idc).send(`Gracias por invitarme a **${guild.name}**\nUse: Yu!help para mas información`);

  var id = channelini.id;
guild.channels.get(id).createInvite({
    maxAge: 0     

}).then(invite =>  {
var invitacionURL 
if(!invitacionURL === null) invitacionURL = "No invite URL"
  else invitacionURL = '[invitacion]('+ invite.url + ')'
const embed = new Discord.MessageEmbed() 
.setTitle("👥『New Guild』")
.addField(`New Guild:`,`${guild.name}`, true)
.addField(`Total Members:`, `${guild.memberCount}`, true)
.addField(`Guild ID:`,`${guild.id}`, true)
.addField(`<:GearRy:393126289214537738>Bots:`, bots, true)
.addField(`Members`, discriminar, true)
.addField(`Owner:`, `${guild.members.get(guild.ownerID).user.username}#${guild.members.get(guild.ownerID).user.discriminator}`, true)
.addField(`Total servers`,`${bot.guilds.size}`,true)
.addField(`Total users`,`${bot.users.size}`,true)
.addField('Invite', invitacionURL)
.setThumbnail(`${guild.iconURL()}`, true)
.setColor(9823579)
canal.send({embed})

})
}