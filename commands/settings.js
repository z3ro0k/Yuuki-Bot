const Discord = require('discord.js'),
      db = require('quick.db')
      
exports.run = async (bot, message, args) => {

  let mod
  let prefix = await bot.tools.GuildPrefix(message.guild)
  let channel
  let starboardChannel
  
  let autoRoleU = await bot.tools.autoRoleUsers(message.guild)
  var User = '<:onn:442082974037573641> ' + autoRoleU
  
  let autoRoleB = await bot.tools.autoRoleBots(message.guild)
  var Bots = '<:onn:442082974037573641> ' + autoRoleB
  
  var langg = await bot.tools.Lang(message.guild)    
 const lang = require(`../langs/${langg}.json`) 
 
  db.fetch(`welcomeSettings_${message.guild.id}`).then(welcomeSettingsFetched => {

        if (!welcomeSettingsFetched) mod  = '<:off:442082928323985408> Mod-logs disable'
        else mod = welcomeSettingsFetched
    
    db.fetch(`messageChannel_${message.guild.id}`).then(channelIDFetched => {

        if (!message.guild.channels.get(channelIDFetched)) channel = '**<:off:442082928323985408>  Not set**'
        else channel = message.guild.channels.get(channelIDFetched)     

        db.fetch(`starboardChannel_${message.guild.id}`).then(stardboardIDFetchd => {
              if(!stardboardIDFetchd) starboardChannel = '**<:off:442082928323985408>  Not set**'
              else starboardChannel = '<:onn:442082974037573641> <#' + stardboardIDFetchd + '>'
        
 
    
const settings = new Discord.MessageEmbed()
.setAuthor('Settings', 'https://cdn.discordapp.com/emojis/393126289214537738.png')
.setDescription('Esta es la página de configuración para **Yuuki**. Todos los ajustes se enumeran aquí. \nPuede ver los comandos y su estado actual')
.addField(lang.langu.title , lang.langu.name , true)
.addField('prefix:', prefix, true)
.addField('Command:', prefix +'lang <idioma>', true)
.addField('Command', prefix +'sprefix <newprefix>', true)
.addField('Welcome Settings', mod, true)
.addField('Channel', channel, true)
.addField('Command:', prefix+'welcome', true)
.addField('Command:', prefix + 'setlogs #channel',true)
.addField('Autorole Users', User, true)
.addField('Autorole Bots', Bots, true)
.addField('StarBoard', starboardChannel, true)
.addField('Command:', prefix + 'sautorole <rolename>', true)
.addField('Command:', prefix + 'starboard set #channel', true)
.setColor(0x36393e)
message.channel.send(settings)
          })          
        })
      })
  
}
module.exports.config = {
  command: "settings", 
  usage: "<prefix>settings",
  aliases: ['settings', 'config', 'configuracion']
}