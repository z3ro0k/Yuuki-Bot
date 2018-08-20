const Discord = require('discord.js')
const request = require('request');
const db = require('quick.db')

exports.run = async (bot, message, args) => {
  
  var langg = await bot.tools.Lang(message.guild)    
  const lang = require(`../langs/${langg}.json`) 
  
  var r = request.get('http://thecatapi.com/api/images/get.php/gif.php?type=gif', function (err) {
  
      if (err) {
       message.channel.send(lang.Error[0] + err + lang.Error[1]);
       return;
      }
  
      const embed = new Discord.MessageEmbed() 
      .setColor(0x00AE86)
      .setDescription(lang.dogandcat.CatMessage)
      .setFooter("ﾠ")
      .setImage(r.uri.href)

      message.channel.send({embed});
  })
}
exports.config = {
  command: "cat",
  aliases: ["gato", "cats"],
  category: "fun",
  description: "El bot te mandara un gato aleatorio",
  usage: "Yu!cat"
};