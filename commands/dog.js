const randomPuppy = require('random-puppy');
const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (bot, message, args) => {
  
   var langg = await bot.tools.Lang(message.guild)    
  const lang = require(`../langs/${langg}.json`) 
  
randomPuppy().then(url =>{
  const dog = new Discord.MessageEmbed()
  .setImage(url)
  .setThumbnail(url)
  .setDescription(lang.dogandcat.DogMessage)
      message.channel.send(dog);
})
}
exports.config = {
  command: "dog",
  aliases: ["dogs", "perro"],
  category: "fun",
  description: "Manda un perro aleatori",
  usage: "Yu!dog"
};