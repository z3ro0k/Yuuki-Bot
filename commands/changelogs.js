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
  if (obj.days === 1) string += ` ${obj.days} day `
  else if (obj.days > 1) string += ` ${obj.days} days `

  // Check Hours
  if (obj.hours === 1) string += `${obj.hours} hour `
  else if (obj.hours > 1) string += `${obj.hours} hours `

  // Check Minutes
  if (obj.minutes === 1) string += `${obj.minutes} minute `
  else if (obj.minutes > 1) string += `${obj.minutes} minutes `

  // Append Text
  if (string === '') string = 'Just now'
  else string += 'ago'

  return string;

}

exports.run = async (client, message, args, tools) => {

  // Fetch Changelog Entries
  let entries = await db.fetch('changelog');

  // Create Embed
  const embed = new Discord.MessageEmbed()
    .setColor(0x36393e)

  // If none found, return
  if (entries === null) {
    embed.setFooter('No entries found!');
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
  embed.setTitle(`Server Changelog (${entries.length})`)
    .setDescription(changelog)

  // Send Embed
  message.channel.send(embed)

}
exports.config = {
  command: "changelogs",
  aliases: ["changelogs", "actualizacion"]
}