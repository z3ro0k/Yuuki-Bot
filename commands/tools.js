const { MessageEmbed } = require('discord.js'),
  db = require('quick.db'),
  ms = require('parse-ms');

exports.run = async (client, message, args) => {
 
let tool = args.join(' ')
if(!tool) {
  message.channel.send('enter the name of the function to be executed')
  return;
}
  try {
  client.tools.tool()
  } catch(e) {
  message.channel.send("error when executing the function " + tool + "\nError: ```" +  e + "```")
  return;
 } 
}
exports.config = {
  command: "tools",
  aliases: ["tools", "tools"],
  category: "dev",
  description: " ",
  usage: " "
};