const Discord = require('discord.js')
const db = require('quick.db')
const tools = require('../functions.js')
exports.run = async (bot, channel) => {
let audit = await tools.fetchLastAudit(channel.guild);
  if (!audit) return;
  if (audit.action !== 'CHANNEL_DELETE') return;
  
  // Push to database
  db.push(`delChannels_${channel.guild.id}`, { target: `#${audit.changes[0].old}`, user: { id: audit.executor.id, tag: `${audit.executor.username}#${audit.executor.discriminator}` }, timestamp: Date.now() })
  
  // Starboard
  let starboard = await db.fetch(`starboard_${channel.guild.id}`)
  if (starboard !== null && starboard.enabled && starboard.channel === channel.id) {
    db.set(`starboard_${channel.guild.id}`, false, { target: '.enabled' }) 
  }

}