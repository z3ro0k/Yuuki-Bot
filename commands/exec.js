const exec = require('child_process').exec;
const Discord = require('discord.js'),
      hastebin = require('hastebin-gen')
      
exports.run = async(client, message, args, level) => {
    
  if (message.author.id !== "322203879208910849" && message.author.id !== "422208401020551173") return message.channel.send("Only owners can use this command")
    exec(`${args.join(' ')}`, (error, stdout) => {
      const response = (error || stdout);
      if (response.length > 1024 || response.length > 1024) {
            
          hastebin(`${response}`, "js").then(r => {
              
            const embed = new Discord.MessageEmbed()
              .setTitle('~ Exec Command ~')
              .setDescription(`**Ran: ${args.join(" ")}**\n\n[\`${r}\`](${r})`)
              .setThumbnail(client.user.displayAvatarURL())
              .setColor(0x36393e)  
            message.channel.send({ embed }).catch(console.error);
            
          })
      } else {
        
        const embed = new Discord.MessageEmbed()
              .setTitle('~ Exec Command ~')
              .setDescription(`**Ran: ${args.join(" ")}**\n\`\`\`\js\n${response} \n\`\`\``, {code: "asciidoc", split: "\n"})
              .setThumbnail(client.user.displayAvatarURL())
              .setColor(0x36393e)  
            message.channel.send({ embed }).catch(console.error);
        
      }
    });
};
exports.config = {
  command: "exec",
  aliases: ["exec"],
  category: "system",
  description: "Ejecuta un código de símbolo del sistema",
  usage: "exec [...code]"
};