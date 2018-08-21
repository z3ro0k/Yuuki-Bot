const { MessageEmbed } = require('discord.js')
const { oneLineTrim } = require('common-tags')
const columnify = require('columnify')
const db = require('quick.db')
exports.run = async (bot, message, args) => {
 var guilds = bot.guilds.size
 var users = bot.users.size
 
 const embed = new MessageEmbed()
     .setDescription(`Estoy en ${guilds} y cuento con ${users} usuarios`)
     .setColor(0x36393e) 
    message.channel.send(embed)
  }
exports.config = {
  command: "guild",
  aliases: ["guild", "guilds"],
  category: "info",
  description: "Te manda la lista de servidores donde esta Yuuki",
  usage: "Yu!guilds"
};