const randomPuppy = require('random-puppy');
const Discord = require('discord.js')

exports.run = async (bot, message, args) => {
  
randomPuppy().then(url =>{
  const dog = new Discord.RichEmbed()
  .setImage(url)
  .setThumbnail(url)
  .setDescription('Tu perro random esta aqui')
      message.channel.send(url);