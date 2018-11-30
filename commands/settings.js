const Discord = require('discord.js'),
      db = require('quick.db')
      
exports.run = async (bot, message, args) => {
  
 var langg = await bot.tools.Lang(message.guild)    
 const lang = require(`../langs/${langg}.json`) 

  let mod
  let prefix = await bot.tools.GuildPrefix(message.guild)
  
  let starboardChannel
  
  /*Welcome Logs channel*/
  let ChannelID = await bot.tools.getWelcomeChannel(message.guild)
  
  let Logs
  if (!message.guild.channels.get(ChannelID)) Logs = `${lang.settings.noSet}`
  else Logs = message.guild.channels.get(ChannelID)  
  
  /*Mod Logs channel*/
  let channelLogsID = await bot.tools.getLogsChannel(message.guild)
  
  let Mlogs
  if (!message.guild.channels.get(channelLogsID)) Mlogs = `${lang.settings.noSet}`
  else Mlogs = message.guild.channels.get(channelLogsID) 
  
      
  let autoRoleU = await bot.tools.autoRoleUsers(message.guild)
  var User = autoRoleU
  
  let autoRoleB = await bot.tools.autoRoleBots(message.guild)
  var Bots = autoRoleB
  
 
  const textjoin = await bot.tools.welcomeText(message.guild) 
  const textleave = await bot.tools.leaveText(message.guild)
  
  db.fetch(`welcomeSettings_${message.guild.id}`).then(welcomeSettingsFetched => {

        if (!welcomeSettingsFetched) mod  = `${lang.settings.welcomeL}`
        else mod = welcomeSettingsFetched
   

        db.fetch(`starboardChannel_${message.guild.id}`).then(stardboardIDFetchd => {
              if(!stardboardIDFetchd) starboardChannel = `${lang.settings.noSet}`
              else starboardChannel = '<:onn:442082974037573641> <#' + stardboardIDFetchd + '>'
        
 
    
const settings = new Discord.MessageEmbed()
.setThumbnail("https://cdn.dribbble.com/users/114736/screenshots/1046938/loading-gif.gif")
.setAuthor('Settings', 'https://cdn.discordapp.com/emojis/393126289214537738.png')
.setDescription(lang.settings.message)
.addField(lang.langu.title , lang.langu.name , true)
.addField('prefix:', prefix, true)

.addField(lang.settings.cmd, prefix +'lang <idioma>', true)
.addField(lang.settings.cmd, prefix +'sprefix <newprefix>', true)

.addField(lang.settings.field1, mod, true)
.addField(lang.settings.field2, "Coming Soon..", true)

.addField(lang.settings.cmd, prefix+'welcome', true)
.addField(lang.settings.cmd, prefix+'antiinvite <false/true>', true)

.addField('Welcome Logs', Logs, true)
.addField('Mod-Logs', Mlogs , true)

.addField(lang.settings.cmd, prefix + 'welcomelogs #channel',true)
.addField(lang.settings.cmd, prefix + 'modlogs #channel',true)

.addField('Autorole Users', User, true)
.addField('Autorole Bots', Bots, true)

.addField(lang.settings.cmd, prefix + 'roleusers <rolename>', true)
.addField(lang.settings.cmd, prefix + 'rolebots <rolename>', true)

.addField('StarBoard', starboardChannel, true)
.addField(lang.settings.field3, "Imagen", true)

.addField(lang.settings.cmd, prefix + 'starboard set #channel', true)
.addField(lang.settings.cmd, prefix + 'wtype <image/embed> ', true)

.addField(lang.settings.field4, textjoin, true)
.addField(lang.settings.field5, textleave, true)
.setColor(0x36393e)
message.channel.send(settings)
          })          
        })
}
module.exports.config = {
  command: "settings", 
  usage: "<prefix>settings",
  aliases: ['settings', 'config', 'configuracion']
}