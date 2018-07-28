// NOTE:
// The following part is the <prefix>changelog command:

const Discord = require('discord.js'),
  db = require('quick.db'),
  ms = require('parse-ms');

// parseTime function
function parseTime(milliseconds) {

  // Declare Variables
  let string = '',
    obj = ms(Date.now() - milliseconds);

  // Check Days
  if (obj.days === 1) string += `${obj.days} día `
  else if (obj.days > 1) string += `${obj.days} dias `

  // Check Hours
  if (obj.hours === 1) string += `${obj.hours} hora `
  else if (obj.hours > 1) string += `${obj.hours} horas `

  // Check Minutes
  if (obj.minutes === 1) string += `${obj.minutes} minuto `
  else if (obj.minutes > 1) string += `${obj.minutes} minutos `

  if (string === '') string = 'Justo ahora'
  else string = 'hace ' + string 

  return string;

}

exports.run = async (client, message, args) => {

  // Fetch Changelog Entries
  let entries = await db.fetch('changelog');

  // Create Embed
  const embed = new Discord.MessageEmbed()
    .setColor(0x36393e)

  // If none found, return
  if (entries === null) {
    embed.setFooter('¡Entradas no encontradas!');
    return message.channel.send(embed);
  }

  // Only display 25 most recent entries
  if (entries instanceof Array) entries = entries.slice(-25);

  // Compile
  let changelog = '';
  for (var i in entries.reverse()) {
    changelog += `**\`${parseTime(entries[i].timestamp)}\`** | *${entries[i].entry}*\n`
  }

  // Configure Embed
  embed.setTitle(`Registro de cambios del Bot (${entries.length})`)
    .setDescription(changelog)
    .setThumbnail('http://media.getsitecontrol.com/main/preset-images/Ballicons+Gifs+512/13-email.gif')

  // Send Embed
  message.channel.send(embed)

}
exports.config = {
  command: "changelogs",
  aliases: ["changelogs", "actualizacion"],
  category: "info",
  description: "Te manda el registro de cambios del bot",
  usage: "Yu!changelogs"
};