const Discord = require('discord.js');
const math = require('math-expression-evaluator');
const db = require('quick.db')

exports.run = async (bot, message) => {
  
   var langg = await bot.tools.Lang(message.guild)    
   const lang = require(`../langs/${langg}.json`) 
 
    const args = message.content.split(" ").slice(1).join(" ")
    if (args.length < 1) {
        message.channel.send(lang.calculated.noArgs)
        return;
    }

    let answer;
    try {
        answer = math.eval(args);
    } catch (err) {
       var embed = new Discord.MessageEmbed()
       .setTitle(lang.calculated.errorTitle)
       .setColor(0x36393e)
       .setThumbnail("http://www.drodd.com/images15/red-x22.png")
       .addField(lang.calculated.ErrorM, `${args}`)
       .addField("Key:", "```md\n <Adición: +> \n <Sustracción: -> \n <Multiplicación: *> \n <Division: /> \n <PEMDAS: (1+1)x1> \n```")
       message.channel.send({ embed: embed })
        return;
    };
  
    message.delete();
    var embed2 = new Discord.MessageEmbed()
    .setTitle(lang.calculated.sussT)
    .setColor(0x36393e)
    .setThumbnail("https://lh3.googleusercontent.com/WDs87hbKj9l2bnA8rHp5DzES5vsXuf4VWR1fmvD1RyA_b_oeeiuXaMGKn0a-_aThybI=w300")
    .addField(lang.calculated.firtsField, `${args}`)
    .addField(lang.calculated.secondField, `${answer}`)
    message.channel.send({ embed: embed2 })
			
};
exports.config = {
  command: "calc",
  aliases: ["calc", "calculadora", "calcular"],
  category: "info",
  description: "Calcula o suma una ecuación",
  usage: "Yu!calc 1+1"
};