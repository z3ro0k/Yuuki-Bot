    module.exports.config = {
        command: "help",
        aliases: ['ayuda', 'halp']
    }

const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
    const Discord = require('discord.js');
 
exports.run = (bot, message, args, tools) => {
let emojis;
 emojis = message.channel.guild.emojis.map(e => e).join(" | ");       
  message.delete();
    let pages = ['== Comandos de Diversion ==\n\n◈ `Yu!ping`     ::  Muestra la lactancia de los mesanjes del bot y la api de discord\n◈ `Yu!avatar`   ::  Muestra tu avatar o la del usuario mencionado\n◈ `Yu!ascii`    ::  Convierte un tezt a ASCII\n◈ `Yu!calc`     ::  Calcula un aecuacion o suma\n◈ `To!emojis`   ::  Muestra los emojis que hay en el server\n◈ `Yu!playing`  ::  Muestra el jugando del usuario mencionado\n◈ `Yu!jumbo`    ::  Agranda un emoji owo\n◈ `Yu!hug`  ::  abraza al usuario mencionado\n◈ `Yu!fortnite` ::  Muestra información sobre usuarios específicos de Fortnite\n◈ `Yu!cat`      ::  Envía una imagen de un gato!\n◈ `Yu!dog`      ::  Envía una imagen de un perro!', '== Info Commands ==\n\n ◈ `Yu!spotify`  ::  Muestra la canción que estás escuchando en spotify el usuario mencionado\n◈ `Yu!weather`  ::  Muestra información sobre una ciudad\n◈ `To!help`     ::  Muestra todos los comandos disponibles\n◈ `To!npm`      ::  busca un paquete para agregar a tu bot\n◈ `To!user` ::  muestre su información o la del usuario mencionado\n◈ `To!ytsearch` ::  Search songs with the bot\n◈ `To!google`   ::  Searches something up on google\n◈ `To!mcuser`   ::  Get a minecraft user\'s info!\n◈ `To!roblox`   ::  Gets a roblox character', '== Admin Commands ==\n\n◈ `To!purge(disable)`   ::  you delete messages with the bot\n◈ `To!hook`    ::  send a weekhook with your arguments\n◈ `To!config`  ::  check the configuration you have of the modlogs\n◈ `To!tempmute` ::  Mute the user mentioned by x time \n◈ `To!warn`    ::  Warns the mentioned user\n◈ `To!warnlist` ::  You take the warns of the user you require your ID\n◈ `To!clean`    ::  you delete messages with the bot' , '== NSFW Commands ==\n\n◈ `To!r34`      ::  Does it need one?\n◈ `To!boobs`      ::  This command will return boobs.\n◈ `To!gtn`      ::  Displays a random comic by GreenTeaNeko\n◈ `To!neko`      ::  This command will return a Neko, a lewd Neko if used in a NSFW channel\n  New NSFW commands coming soon' , '== BOT Commands ==\n\n◈ `To!bugreport`  :: You send a bug that has the bot\n◈ `To!suggestion` :: You send a suggestion to add a command to the bot\n◈ `To!unsubscribe` :: Unsubscribes from Task-News\n◈ `To!subscribe`   ::  Subscribe to Task-News!\n◈ `To!about`    ::  Show the bot information', '== Server Commands ==\n\n◈ `To!setwelcome`    ::  set the welcome message on the server\n◈ `To!setautorole`   ::  set the automatic role\n◈ `To!setdm`         ::  Set the welcome message by DM\n◈ `To!setchannel`    ::  set the channel to send the mod-logs\n◈ `To!roles`         ::  Lists all the roles on the discord server\n◈ `To!infserver`  ::  shows server information'];
   
    let page = 1;
 
    const embed = new Discord.MessageEmbed()
        .setColor(0x36393e)
        .setFooter(`Page ${page} of ${pages.length}`)
        .setDescription(pages[page - 1]);
 
    message.channel.send(embed).then(msg => {
 
        msg.react('⏪').then(r => {
            msg.react('⏩');
            msg.react('🇽');
            msg.react('⏹')
            //msg.react('⏭')
            
            const backwardsFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
            const forwardsFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;
            const delet = (reaction, user) => reaction.emoji.name === '🇽' && user.id === message.author.id;
            const stopC = (reaction, user) => reaction.emoji.name === '⏹' && user.id === message.author.id;
            const pag6 = (reaction, user) => reaction.emoji.name === '⏭' && user.id === message.author.id;
            
            const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 });
            const forwards = msg.createReactionCollector(forwardsFilter, { time: 60000 });
            const borrar = msg.createReactionCollector(delet, { time: 60000 });
            const stop = msg.createReactionCollector(stopC, { time: 60000})
            const ultima = msg.createReactionCollector(pag6, { time: 60000})
 
            backwards.on('collect', r => {
                if (page === 1) return;
                page--;
                embed.setDescription(pages[page - 1]);
                embed.setFooter(`Page ${page} of ${pages.length}`);
                msg.edit(embed);
            });
 
            forwards.on('collect', r => {
                if (page === pages.length) return;
                page++;
                embed.setDescription(pages[page - 1]);
                //embed.setThumbnail(message.author.displayAvatarURL())
                embed.setFooter(`Page ${page} of ${pages.length}`);
                msg.edit(embed);
            });
          ultima.on('Collect', r => {
                if (page - pages.length) return;
                page++;
                embed.setDescription(pages[page - 5]);
                //embed.setThumbnail(message.author.displayAvatarURL())
                embed.setFooter(`Page ${page} of ${pages.length}`);
                msg.edit(embed);
          })
            
           borrar.on('collect',r => {
            r.users.remove(message.author.id);

            msg.delete()
 
        });
          stop.on('collect', r => {
          embed.setDescription('The help command stops collecting reactions');
          embed.setFooter(`Page ${page} of ${pages.length}`);
          msg.edit(embed)
            
            
          })
          stop.on('end', r => {
          embed.setDescription('The help command stops collecting reactions');
          embed.setFooter(`Page ${page} of ${pages.length}`);
          msg.edit(embed)
            
            
          })
      
        });
      });  
    }

}