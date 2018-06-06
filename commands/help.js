    module.exports.config = {
        command: "help",
        aliases: ['ayuda', 'halp']
    }

const Discord = require("discord.js");

exports.run =  (bot, message, args) => {
    const Discord = require('discord.js');  
  message.delete();
    let pages = ['== Comandos de Diversion ==\n\n◈ `Yu!ping`     ::  Muestra la lactancia de los mesanjes del bot y la api de discord\n◈ `Yu!avatar`   ::  Muestra tu avatar o la del usuario mencionado\n◈ `Yu!ascii`    ::  Convierte un tezt a ASCII\n◈ `Yu!calc`     ::  Calcula un aecuacion o suma\n◈ `To!emojis`   ::  Muestra los emojis que hay en el server\n◈ `Yu!playing`  ::  Muestra el jugando del usuario mencionado\n◈ `Yu!jumbo`    ::  Agranda un emoji owo\n◈ `Yu!hug`  ::  abraza al usuario mencionado\n◈ `Yu!fortnite` ::  Muestra información sobre usuarios específicos de Fortnite\n◈ `Yu!cat`      ::  Envía una imagen de un gato!\n◈ `Yu!dog`      ::  Envía una imagen de un perro!', '== Info Commands ==\n\n ◈ `Yu!spotify`  ::  Muestra la canción que estás escuchando en spotify el usuario mencionado\n◈ `Yu!weather`  ::  Muestra información sobre una ciudad\n◈ `To!help`     ::  Muestra todos los comandos disponibles\n◈ `To!npm`      ::  busca un paquete para agregar a tu bot\n◈ `To!user` ::  muestre su información o la del usuario mencionado\n◈ `To!ytsearch` ::  buscar canciones de youtube con el bot\n◈ `To!google`   ::  Busca algo en google\n◈ `To!mcuser`   ::  ¡Obtén la información de un usuario de minecraft!\n◈ `To!roblox`   ::  busca un usuario roblox y obtén información', '== Admin Commands ==\n\n◈ `Yu!hook`    :: envía un weekhook con tus argumentos\n◈ `To!settings`  ::  muestra la configuración actual del bot en su servidor\n◈ `To!tmute` ::  Silenciar al usuario mencionado por x tiempo\n◈ `To!warn`    ::  Advierte al usuario mencionado\n◈ `To!warnlist` ::  Muestra la lista de warns del usuario mencionado \n◈ `To!clean`    ::  borras mensajes con el bot' , '== NSFW Commands ==\n\n◈ No hay comandos NSFW por el momento' , '== BOT Commands ==\n\n◈ `To!report`  :: Usted envía un error que tiene el bot\n◈ `To!suggestion` :: Envía una sugerencia para agregar un comando al bot\n◈ `To!about`    :: Muestra toda la informacion del bot', '== Server Commands ==\n\n◈ `To!welcome`    ::  Activa los mod-logs para tu servidor\n◈ `To!setautorole`   ::  establecer el rol automático\n◈ `To!setchannel`    ::  establece el canal a enviar los mensajes de bienvenida\n◈ `Yu!perms`         ::  Muestra los permsios que tiene el usuario mencionado o tuyos\n◈ `Yu!server`  ::  muestra información del servidor\n◈ `Yu!starboard`  ::  Establece la tabal de estrellas en tu servdidor'];
   
    let page = 1;
 
    const embed = new Discord.MessageEmbed()
        .setColor(0x36393e)
        .setFooter(`Page ${page} of ${pages.length}`)
        .setDescription(pages[page - 1]);
 
    message.channel.send(embed).then(msg => {
 
        msg.react('⏪').then(r => {
            msg.react('⏩');
  
         
            const backwardsFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
            const forwardsFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;
            const delet = (reaction, user) => reaction.emoji.name === '🇽' && user.id === message.author.id;
            const stopC = (reaction, user) => reaction.emoji.name === '⏹' && user.id === message.author.id;
            
            const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 });
            const forwards = msg.createReactionCollector(forwardsFilter, { time: 60000 });
            const borrar = msg.createReactionCollector(delet, { time: 60000 });
            const stop = msg.createReactionCollector(stopC, { time: 60000})
   
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