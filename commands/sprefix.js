const { MessageEmbed } = require('discord.js'),
  db = require('quick.db')

exports.run = async (client, message, args) => {

 let Prefix = args[0] 
 if(!Prefix) {
 
   client.tools.GetGuildPrefix(message.channel, message.guild)
   
 } else {
   
  const setP = Prefix
   client.tools.UpdateGuildPrefix(message.channel, message.guild, setP)
 }
}
exports.config = {
  command: "sprefix",
  aliases: ["setprefix", "prefix", "newprefix"],
  category: "beta",
  description: " ",
  usage: " "
};