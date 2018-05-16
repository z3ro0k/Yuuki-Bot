const Discord = require('discord.js');

exports.run = (bot, message) => {
  if(args[0] == "help"){
  const help = new Discord.RichEmbed()
      .addField('Uso:', "Yu-mc ")
      .setColor(0x36393e)
      .addField('Descripción', "Crea un **achievement** de minecraft ")
      .addField('Ejemplos:', "Yu-mc Hola Mundo\nYu-mc Hello World")
      message.channel.send(help);
      return;
    }
          var ids = ["20", "1", "13", "18", "17", "9", "31", "22", "23", "2", "11", "19", "24", "25", "12", "33" ]
            const randomizer = Math.floor(Math.random()*ids.length);
            const args = message.content.split(" ").slice(1).join(" ")
    if (!args) return message.channel.send("Put something you want to achieve!");
    const image = new Discord.Attachment(`https://www.minecraftskinstealer.com/achievement/a.php?i=${ids[randomizer]}&h=Achievement Get!&t=${args}`, "achievement.png");
message.channel.send(image)
    }
module.exports.config = {
  command: "mc"
}