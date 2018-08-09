const Discord = require('discord.js'),
      db = require('quick.db')
      
exports.run = async (bot, message, args) => {

  let mod
  let prefix
  let channel
  let autoRole
  let starboardChannel
  
  var langg = await client.tools.Lang(message.guild)    
 const lang = require(`../langs/${langg}.json`) 
  db.fetch(`welcomeSettings_${message.guild.id}`).then(welcomeSettingsFetched => {

        if (!welcomeSettingsFetched) mod  = '<:off:442082928323985408> Mod-logs disable'
        else mod = welcomeSettingsFetched
  
  
  db.fetch(`guildPrefix_${message.guild.id}`).then(guildPrefixFetch =>{
                    
           if (!guildPrefixFetch) prefix = 'Yu!'
          else prefix = guildPrefixFetch
    
    db.fetch(`messageChannel_${message.guild.id}`).then(channelIDFetched => {

        if (!message.guild.channels.get(channelIDFetched)) channel = '**<:off:442082928323985408>  Not set**'
        else channel = message.guild.channels.get(channelIDFetched)     
        
      db.fetch(`autoRole_${message.guild.id}`).then(autoRoleFetched => {

                    if (!autoRoleFetched) autoRole = '**<:off:442082928323985408>  Not set**'
                    else autoRole = '<:onn:442082974037573641> ' + autoRoleFetched
        db.fetch(`starboardChannel_${message.guild.id}`).then(stardboardIDFetchd => {
              if(!stardboardIDFetchd) starboardChannel = '**<:off:442082928323985408>  Not set**'
              else starboardChannel = '<:onn:442082974037573641> <#' + stardboardIDFetchd + '>'
        
 
    
const settings = new Discord.MessageEmbed()
.setAuthor('Settings', 'https://cdn.discordapp.com/emojis/393126289214537738.png')
.setDescription('Esta es la página de configuración para **Yuuki**. Todos los ajustes se enumeran aquí. \nPuede ver los comandos y su estado actual')
.addField('Language:', 'Español', true)
.addField('prefix:', prefix, true)
.addField('Command:', prefix +'lang <idioma>', true)
.addField('Command', prefix +'sprefix <newprefix>', true)
.addField('Welcome Settings', mod, true)
.addField('Channel', channel, true)
.addField('Command:', prefix+'welcome', true)
.addField('Command:', prefix + 'setlogs #channel',true)
.addField('Autorole', autoRole, true)
.addField('StarBoard', starboardChannel, true)
.addField('Command:', prefix + 'sautorole <rolename>', true)
.addField('Command:', prefix + 'starboard set #channel', true)
.setColor(0x36393e)
message.channel.send(settings)
          })          
        })
      })
    })
  })
}
module.exports.config = {
  command: "settings", 
  usage: "<prefix>settings",
  aliases: ['settings', 'config', 'configuracion']
}