const db = require('quick.db');
const Discord = require('discord.js');
const fs = require('fs');

exports.run = async (client, message, args) => {
  
  const embed = new Discord.MessageEmbed()
      .setColor(0x36393e)
      .setTitle('Starboard')
  

  if (args[0] && args[0].toLowerCase() === 'set') {
    if (!message.member.hasPermission('ADMINISTRATOR')) return embed.setFooter('Este comando requiere permisos de "ADMINISTRADOR".'), message.channel.send(embed);
    
    if (!message.mentions.channels.first()) return embed.setFooter('Por favor, mencione un canal "Yu!Starboard set #channel".'), message.channel.send(embed);
    db.set(`starboard_${message.guild.id}`, { enabled: true, channel: message.mentions.channels.first().id })
    db.set(`starboardChannel_${message.guild.id}`, message.mentions.channels.first().id)
    embed.setFooter('Channel successfully set!')
    return message.channel.send(embed)
  }
  

  if (args[0] && args[0].toLowerCase() === 'role') {
    if (!message.member.hasPermission('ADMINISTRATOR')) return embed.setFooter('Este comando requiere permisos de "ADMINISTRADOR".'), message.channel.send(embed);
    if (!args[1]) return embed.setFooter('Especifique un roleName Yu!Starboard role [roleName | remove].'), message.channel.send(embed);
    if (args[1].toLowerCase() === 'remove') {
      db.delete(`starStarter_${message.guild.id}`)
      embed.setFooter('El requisito de función se deshabilitó correctamente.')
      return message.channel.send(embed)
    } else {
      args = args.slice(1).join(' ')
      db.set(`starStarter_${message.guild.id}`, args)
      embed.setFooter(`rol necesario establecido a "${args}".`)
      return message.channel.send(embed)
    }
  }
  
  let enabled = await db.fetch(`starboard_${message.guild.id}`, { target: '.enabled' })
  let requiredRole = await db.fetch(`starStarter_${message.guild.id}`)
  if (requiredRole === null) requiredRole = '*- No establecido*'
  if (enabled === null || !enabled) {
    embed.setFooter('Use YU!Starboard set #channel para establecer el canal de salida.')
    return message.channel.send(embed)
  }
  
  let starboard = await db.fetch(`starboard_${message.guild.id}`)
  embed.addField('Canal', client.channels.get(starboard.channel), true)
  .addField('Habilitado', `${starboard.enabled}`, true)
  .addField('Rol requerido', requiredRole, true)
  .setFooter('Nota: El Rol requerido solo se aplica a la primera estrella, cualquiera puede protagonizar después de eso. Puedes usar Yu!Starboard role <roleName> para configurar esto.')
  
  message.channel.send(embed)
  
}
exports.config = {
  command: "starboard",
  aliases: ["starboard"]
}