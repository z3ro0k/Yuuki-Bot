const Discord = require('discord.js')
const request = require('request');

exports.run = async (bot, message, args) => {

  
  var r = request.get('http://thecatapi.com/api/images/get.php/gif.php?type=gif', function (err) {
  
      if (err) {
       message.channel.send("Hubo un error, Inténtelo nuevamente");
       return;
      }
  
      const embed = new Discord.MessageEmbed() 
      .setColor(0x00AE86)
      .setDescription("Aqui esta tu gato aleatorio <:CatLove2:437761552146235402>")
      .setFooter("ﾠ")
      .setImage(r.uri.href)

      message.channel.send({embed});
  })
}
exports.config = {
  command: "cat",
  aliases: ['gato', 'cats']
}