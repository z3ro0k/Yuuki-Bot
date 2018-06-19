const Discord = require('discord.js')
const fs = require('fs')
module.exports.run = async (bot, message, args, tools, loadCmds, eventsLoad) => {
if(args[0].toLowerCase() === 'commanads' || args[0].toLowerCase() === 'comandos'){
  message.channel.send('<a:loader:458776406512369664> Actualizando Comandos').then(m => {
    setTimeout(() => {
  const loadC = new Discord.MessageEmbed()
.setThumbnail('https://cdn.dribbble.com/users/143640/screenshots/2666261/fueled-24112015-jm_2x.gif')
.setTitle('Revooting Commands')
.addField('<:kEmoji:440388066197110785> Commands loaded', bot.commands.size + 11, true)
  .addField('<:kEmoji:440388066197110785> Alias Loaded', bot.aliases.size + 11, true)
.setColor(0x36393e)
m.channel.send(load)
      loadCmds();
    }, 5000);
  });
  
}
if(args[0].toLowerCase() === 'events' || args[0].toLowerCase() === 'eventos'){
  message.channel.send('Actualizando Comandos').then(m => {
    setTimeout(() => {
  const loadC = new Discord.MessageEmbed()
.setThumbnail('https://cdn.dribbble.com/users/143640/screenshots/2666261/fueled-24112015-jm_2x.gif')
.setTitle('Rebooting Events')
.addField('<:doc:448784570188562433> Charged events', bot.commands.size + 11, true)
.setColor(0x36393e)
m.channel.send(load)
    }, 5000);
  });
  
} 
const load = new Discord.MessageEmbed()
.setThumbnail('https://cdn.dribbble.com/users/143640/screenshots/2666261/fueled-24112015-jm_2x.gif')
.setTitle('Bot Status')
.setDescription('<a:Online:446119385480953866> All System Reload <:Ainfo:441067085163134976>')
.addField('<:kEmoji:440388066197110785> Comandos Cargados', bot.commands.size + 11, true)
.addField('<:doc:448784570188562433> Eventos cargados', bot.events.size, true)
.setColor(0x36393e)
message.channel.send(load)
eventsLoad();

}
module.exports.config = {
  command: "reboot",
  aliases: ['reboot', 'recargar']
}