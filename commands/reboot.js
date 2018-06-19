const Discord = require('discord.js')
const fs = require('fs')
module.exports.run = async (bot, message, args, tools, loadCmds, eventsLoad) => {
if(args[0] === 'commands' || args[0] === 'comandos'){
 return message.channel.send('<a:loader:458776406512369664> Rebooting Commands').then(m => {
    
    setTimeout(() => {
       m.delete();
  const loadC = new Discord.MessageEmbed()
.setThumbnail('https://cdn.dribbble.com/users/143640/screenshots/2666261/fueled-24112015-jm_2x.gif')
.setTitle('Revooting Commands')
.addField('<:kEmoji:440388066197110785> Commands loaded', bot.commands.size + 11, true)
  .addField('<:kEmoji:440388066197110785> Alias Loaded', bot.aliases.size , true)
.setColor(0x36393e)
m.channel.send(loadC)
      loadCmds();
    }, 5000);
  });
  
}
if(args[0] === 'events' || args[0] === 'eventos'){
 return message.channel.send('<a:loader:458776406512369664> Rebooting Events').then(m => {
    
    setTimeout(() => {
       m.delete();
  const loadE = new Discord.MessageEmbed()
.setThumbnail('https://cdn.dribbble.com/users/143640/screenshots/2666261/fueled-24112015-jm_2x.gif')
.setTitle('Rebooting Events')
.addField('<:doc:448784570188562433> Charged events', bot.commands.size + 11, true)
.setColor(0x36393e)
m.channel.send(loadE)
      eventsLoad();
    }, 5000);
  });
  
} 
  if(args[0] === 'all' || args[0] === 'all') {
return message.channel.send('<a:loader:458776406512369664> Rebooting all System').then(m => {
    setTimeout(() => {
      m.delete();
    const allload = new Discord.MessageEmbed()
.setThumbnail('https://cdn.dribbble.com/users/143640/screenshots/2666261/fueled-24112015-jm_2x.gif')
.setTitle('Rebooting All System')
.setDescription('<a:Online:446119385480953866> All System Reload <:Ainfo:441067085163134976>')
.addField('<:kEmoji:440388066197110785> Comandos Cargados', bot.commands.size + 11, true)
.addField('<:doc:448784570188562433> Eventos cargados', bot.events.size, true)
.setColor(0x36393e)
m.channel.send(allload)
      loadCmds();
      eventsLoad();
      }, 5000);
    });
  } else {
   message.channel.send('Seleccione una categoría para reiniciar `Yu!reboot commands | events | all`') 
    return;
  }
}
module.exports.config = {
  command: "reboot",
  aliases: ['reboot', 'recargar']
}