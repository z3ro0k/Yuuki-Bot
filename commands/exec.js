const exec = require('child_process').exec;
const Discord = require('discord.js')
exports.run = async(client, message, args, level) => {
    
  if (message.author.id !== "322203879208910849" && message.author.id !== "331981819631239168") return message.channel.send("Only owners can use this command")
    exec(`${args.join(' ')}`, (error, stdout) => {
      
      const response = (error || stdout);
      const embed = new Discord.MessageEmbed()
      .setTitle('~ Exec Command ~')
      .setDescription(`**Ran: ${args.join(" ")}**\n\`\`\`\js\n${response} \n\`\`\``, {code: "asciidoc", split: "\n"})
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(0x36393e)
      
      message.channel.send({ embed }).catch(console.error);
    
    });
};
exports.config = {
  command: "exec",
  aliases: ["exec"],
  category: "System",
  description: "Executes command prompt code",
  usage: "exec [...code]"
};