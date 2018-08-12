
const moment = require("moment")
const momen = require('moment-duration-format');
const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (bot, message, args) => {

const actividad = moment.duration(bot.uptime).format(" D [dias], H [hrs], m [mins], s [secs]");
  
const cpu = process.cpuUsage().system / 1024 / 1024;   
  
   let emoji = bot.emojis.find(e => e.name === 'Upvote');
 var dev
    try { dev = bot.users.get('322203879208910849').tag } catch (e) { dev = 'PoeticAzurex#9169' }
var users = `${Math.round(bot.users.size / 1000)} K`
  
 var langg
 const idioma = await db.fetch(`guildLang_${message.guild.id}`)
 if (idioma === null) langg = 'es'
  else langg = idioma       
 const lang = require(`../langs/${langg}.json`) 
 
const embed = new Discord.MessageEmbed()
.setColor(0x36393e)
.setAuthor(`${lang.info} ${bot.user.username} `, bot.user.displayAvatarURL())
.addField(`<:Owner:442443039915507743> ${lang.about.owner}`, `**└──**\`${dev}\``, true)
.addField(`<:Version:442442898651217922> ${lang.about.v}`, `**└──**\`2.6.0\``, true)
.addField(`<:Libraries:442442996705918987> ${lang.about.L} Discord.js`, `**└──**\`v${Discord.version}\``, true)
.addField(`<:cloud:447518353972658207> ${lang.about.M}`, `**└──**\`${bytesToSize(process.memoryUsage().rss, 3)}\``, true)
.addField(`<:CPU:462586915783180298> ${lang.about.CPU}`, `**└──**\`${Math.round(cpu * 100) / 100}%\``, true)
.addField(`<:relog:447518519752523776> ${lang.about.uptime}`, `**└──**\`${actividad}\``, true)
.addField(`<:wEmoji:440388223017943042> ${lang.about.C}`, `**└──**\`${bot.commands.size}\`` , true)
.addField(`<:doc:448784570188562433> ${lang.about.E}`, `**└──**\`${bot.events.size}\``, true)
.addField(`<:Servers:442443125005352962> ${lang.about.guilds}`, `**└──**\`${bot.guilds.size.toLocaleString()}\``, true)
.addField(`<:members:442439950747697164> ${lang.about.Mem}`, `**└──**\`${users}\``, true)
.addField(`<:doc:448784570188562433> ${lang.about.Ca}`, `**└──**\`${bot.channels.size.toLocaleString()}\``, true)
.addField(`<:partnerbot:447295492200595457> WebSite`, `**└──**[\`${lang.click}\`](https://brayanmaldonado9.wixsite.com/yuuki)`, true)
.addField(`<:Astart:441067034554662932> ${lang.about.Prefix}`, '**└──**`Yu!`', true)
.addField(`${emoji} ${lang.about.Vote}`, `**└──**\`${lang.about.use}\``, true)
.setFooter(`© ${new Date().getFullYear()} ${bot.options.author} | ${bot.options.invite}`)

message.channel.send({embed});
}
var unit = ["", "K", "M", "G", "T", "P"];
	function bytesToSize(input, precision) {
		var index = Math.floor(Math.log(input) / Math.log(1024));
		if(unit >= unit.length) return `${input} B`;
		return `${(input / Math.pow(1024, index)).toFixed(precision)} ${unit[index]}B`;
	}

exports.config = {
  command: "about",
  aliases: ["about", "infobot"],
  category: "system",
  description: "Te muestra informacion del bot",
  usage: "Yu!about"
};