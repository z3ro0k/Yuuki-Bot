const Discord = require('discord.js'),
      hastebin = require('hastebin-gen'),
      ms = require('ms'),
      mss = require('parse-ms')

exports.run = (bot, message, loadCmds) => {
    
   var embed = new Discord.RichEmbed()
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
          var embed3 = new Discord.RichEmbed()
          .setTitle("Oops!")
          .setTimestamp()
          .setColor("#ffff66")
          .addField(":warning: I guess the eval was too much! :warning: \nI generated a hastebin link instead! Here you go!", r, true)
          message.channel.send({ embed: embed3 })
})} else {
        var embed2 = new Discord.RichEmbed()
        .setTitle('Evaled Code')
        .setColor("#00ced1")
        .setDescription("**Evaled: :inbox_tray:** \n\`\`\`js\n" + code + "\n\`\`\`\n\n**Output: :outbox_tray:**\n\n\`\`\`js\n"+ clean(evaled) + "\n\`\`\`")
        .setThumbnail(bot.user.displayAvatarURL)
        message.channel.send({embed : embed2 });
} 
    } catch (err) {
        const code = args.join(" ");
                if ((err).length > 1024 || code.length > 1024) {
        hastebin(`Evaled: ${code}\n\nError: \n\n${(err)}`, "js").then(r => {
          var embed3 = new Discord.RichEmbed()
          .setTitle("Oops!")
          .setTimestamp()
          .setColor("#f44242")
          .addField(":warning: I guess the eval was too much! It also errored! :warning: \nI generated a hastebin link instead! Here you go!", r, true)
          message.channel.send({ embed: embed3 })
})}
      var embed3 = new Discord.RichEmbed()
      .setTitle("ERROR:")
      .setColor("#f44242")
      .addField("Evaled: :inbox_tray:", `\`\`\`js\n${code}\n\`\`\``)
      .addField("Output: :outbox_tray:", `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
      message.channel.send({embed: embed3 });
    }
}
module.exports.config = {
  command: "eval"
}