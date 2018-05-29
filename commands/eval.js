const Discord = require('discord.js'),
      hastebin = require('hastebin-gen'),
      ms = require('ms'),
      mss = require('parse-ms')

const { oneLine } = require('common-tags')
const util = require('util')

exports.run = async (bot, message, loadCmds, userAFK) => {
    
   var embed = new Discord.MessageEmbed()
  .setTitle("Restricted")
    .setColor("#f45f42")
  .addField("<:error:401869378506719233> Acceso Denegado", "Este comando es solo para dueños del BOT!")
		
  const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
  const args = message.content.split(" ").slice(1);
  const args2 = message.content.split(' ').slice(1).join(' ');
  
    try {
         var authors = ["322203879208910849", "324411190396715010"];
    if(!authors.includes(message.author.id)) {
    message.channel.send({embed: embed});
    return;
    }
    
    if (!args2) {
      message.channel.send("What do you want me to evaluate?");
      return;
  }
  

       const code = args.join(" ");
      let evaled = eval(code);
      var result = await eval(code)
      var type
      if (typeof result === 'object') {
        type = `object - ${result.constructor.name}`
      } else if (typeof result === 'function') {
        type = oneLine`
          function
          ${result.name || result.length ? '-' : ''}
          ${result.name ? `Name: ${result.name}` : ''}
          ${result.name && result.length ? `|` : ''}
          ${result.length ? `#Args: ${result.length}` : ''}
        `
        result = result.toString()
      } else {
        type = typeof result
      }
      if (typeof (result) !== 'string') {
        result = util.inspect(result, {
          showHidden: true,
          compact: false,
          depth: 0
        })
      }
      
                if (code.includes('bot.token')) {
          message.delete()
          message.channel.send("That isnt a good idea cause it includes the bot token in it")
          return;
        }
                if (code.includes('settings.token')) {
                  message.delete()
          message.channel.send("That isnt a good idea cause it includes the bot token in it")
          return;
        }
        if (code.includes("process.env")) {
          message.delete()
          message.channel.send("Why would you wanna reveal our secrets?")
          return;
        }


      if (typeof evaled !== "string")	
        evaled = require("util").inspect(evaled);

        if (clean(evaled).length > 1024 || code.length > 1024) {
        hastebin(`Evaled: ${code}\n\nOutput: \n\n${clean(evaled)}`, "js").then(r => {
          var embed3 = new Discord.MessageEmbed()
          .setTitle("Oops!")
          .setTimestamp()
          .setColor("#ffff66")
          .addField(":warning: I guess the eval was too much! :warning: \nI generated a hastebin link instead! Here you go!", r, true)
          .setFooter(`Type: ${type}`, message.author.displayAvatarURL())
          message.channel.send({ embed: embed3 })
})} else {
        var embed2 = new Discord.MessageEmbed()
        .setTitle('Evaled Code')
        .setColor("#00ced1")
        .setDescription("**Input: <:input:442439882783064067>:** \n\`\`\`js\n" + code + "\n\`\`\`\n\n**Output: <:output:442439781474107395>**\n\n\`\`\`js\n"+ clean(evaled) + "\n\`\`\`")
        .setThumbnail(bot.user.displayAvatarURL())
        .setFooter(`Type: ${type}`, message.author.displayAvatarURL())
        message.channel.send({embed : embed2 });
} 
    } catch (err) {
        const code = args.join(" ");
                if ((err).length > 1024 || code.length > 1024) {
        hastebin(`Evaled: ${code}\n\nError: \n\n${(err)}`, "js").then(r => {
          var embed3 = new Discord.MessageEmbed()
          .setTitle("Oops!")
          .setTimestamp()
          .setColor("#f44242")
          .addField(":warning: I guess the eval was too much! It also errored! :warning: \nI generated a hastebin link instead! Here you go!", r, true)
           .setFooter(`Type: ${type}`, message.author.displayAvatarURL())
          message.channel.send({ embed: embed3 })
})}
      var embed3 = new Discord.MessageEmbed()
      .setTitle("ERROR:")
      .setColor("#f44242")
      .addField("Input: <:input:442439882783064067>", `\`\`\`js\n${code}\n\`\`\``)
      .addField("Output: <:output:442439781474107395>", `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
       .setFooter(`Type: ${type}`, message.author.displayAvatarURL())
      message.channel.send({embed: embed3 });
    }
}
module.exports.config = {
  command: "eval"
}