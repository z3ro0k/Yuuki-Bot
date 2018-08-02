const Discord = require('discord.js'),
  db = require('quick.db'),
  ms = require('parse-ms');

function parseTime(milliseconds) {

  let string = '',
    obj = ms(Date.now() - milliseconds);

  if (obj.days === 1) string += `${obj.days} día `
  else if (obj.days > 1) string += `${obj.days} dias `

  if (obj.hours === 1) string += `${obj.hours} hora `
  else if (obj.hours > 1) string += `${obj.hours} horas `

  if (obj.minutes === 1) string += `${obj.minutes} minuto `
  else if (obj.minutes > 1) string += `${obj.minutes} minutos `

  if (string === '') string = 'Justo ahora'
  else string = 'hace ' + string 

  return string;

}

exports.run = async (client, message, args) => {

  let entries = await db.fetch('changelog');

  const embed = new Discord.MessageEmbed()
    .setColor(0x36393e)

  if (entries === null) {
    embed.setFooter('¡Entradas no encontradas!');
    return message.channel.send(embed);
  }

  if (entries instanceof Array) entries = entries.slice(-25);

  let changelog = '';
  for (var i in entries.reverse()) {
    changelog += `**\`${parseTime(entries[i].timestamp)}\`** | *${entries[i].entry}*\n`
  }

  embed.setTitle(`Registro de cambios del Bot (${entries.length})`)
    .setDescription(changelog)
    .setThumbnail('http://media.getsitecontrol.com/main/preset-images/Ballicons+Gifs+512/13-email.gif')

  message.channel.send(embed)

}
exports.config = {
  command: "changelogs",
  aliases: ["changelogs", "actualizacion"],
  category: "info",
  description: "Te manda el registro de cambios del bot",
  usage: "Yu!changelogs"
};