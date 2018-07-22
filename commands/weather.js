const Discord = require('discord.js');
const weather = require('weather-js');
const db = require('quick.db')
exports.run = async (bot, message, args) => {
 

 weather.find({search: args.join(' '), degreeType: 'C'}, function(err, result) { 
                  
   if (!args.join(' ')) {
   message.channel.send('**Porfavor ingresa una Localizacion.**')
  return;
 
   } try {
  var current = result[0].current;
   let embed = new Discord.MessageEmbed()
   .setTitle('Ciudad: '+current.observationpoint+'')
   .addField('la temperatura es de:', +current.temperature+'°C')
   .addField('La hora actual es de:', current.observationtime)
   .addField('La humedad actual es de:', + current.humidity +'%')
   .addField('Fecha',  current.date)
   .setColor(0x36393e)
   .setThumbnail(current.imageUrl)
  message.channel.send({embed})
    } catch (err) {
      message.channel.send('** No hay una ciudad con el nombre:**`'+ current.observationpoint + '`');
    }

    message.delete(); 
 });

}
exports.config = {
  command: "weather",
  aliases: ["weather"]
}