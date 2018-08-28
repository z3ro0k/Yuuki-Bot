
const Discord = require("discord.js");
const { stripIndents } = require('common-tags');
   
    //let music = ['== Comandos de Musica ==\n\n◈ `Yu!play`    ::  Ponga en fila una canción/lista de reproducción por URL o busque una canción.\n◈ `Yu!queue`   :: Muestra la lista de canciones a reproducir\n◈ `Yu!search`   :: Busca hasta 10 resultados.\n◈ `Yu!skip`   :: Salta una canción o varias canciones.\n◈ `Yu!pause`   :: Pausa la cola.\n◈ `Yu!resume`   :: Reanuda la cola.\n◈ `Yu!volumen`   :: Ajusta el volumen del bot.\n◈ `Yu!np`   :: Muestra la canción que se está reproduciendo actualmente.\n◈ `Yu!clearqueue`   :: Borra la cola actual.\n◈ `Yu!leave`   :: Deja el canal de voz y limpia la cola.\n◈ `Yu!loop`   :: Cambia el estado del bucle']

exports.run =  async (bot, message, args) => {
  
    var prefix = await bot.tools.GuildPrefix(message.guild) 
    
    let pages = [`◈ \`${prefix}ping\` ◈ \`${prefix}avatar\` ◈ \`${prefix}ascii\` ◈ \`${prefix}calc\` ◈ \`${prefix}emojis\` ◈ \`${prefix}playing\` ◈ \`${prefix}jumbo\` ◈ \`${prefix}cat\` ◈ \`${prefix}dog\` `];
    let info = [`◈ \`{prefix}spotify\` ◈ \`{prefix}help\` ◈ \`{prefix}user\` ◈ \`{prefix}ytsearch\`  ◈ \`{prefix}server\` ◈ \`{prefix}roblox\` ◈ \`{prefix}info\` ◈ \`Yu!about\` - \`{prefix}mdocs\` `]
    let admin = ['◈ \`{prefix}hook\` ◈ \`{prefix}settings\` ◈ \`{prefix}hackban\` ◈ \`{prefix}warn\` ◈ \`{prefix}warnlist\` ◈ \`{prefix}clean\` - \`{prefix}kick\` - \`{prefix}unban']
    let nsfw = ['◈ No hay comandos NSFW por el momento']
    let botC = ['◈ `Yu!report` ◈ `Yu!suggestion` ◈ `Yu!about`  ◈ `Yu!changelogs`']
    let server = ['◈ `Yu!welcome` ◈ `To!setautorole` ◈ `To!setchannel` ◈ `Yu!perms` ◈ `Yu!server` ◈ `Yu!starboard`']
    
    var command = bot.commands.get(args[0]) || bot.commands.get(bot.aliases.get(args[0]))
  

if(!command) {
     const embed = new Discord.MessageEmbed()
      .setDescription(`<:help:483876577420247040>Use ${prefix}help <command> or @Yuuki#3102 <command> para ver información detallada sobre el comando.<:help:483876577420247040>`)
      .addField("== Comandos de Diversion ==", pages)
      .addField("== Comandos de información ==", info)
      .addField("== Comandos de Interacción ==", 'weas aqui')
      .addField("== Comandos de administración ==", admin)
      .addField("== Comandos Útiles ==", botC)
      .addField("== Comandos de Configuración ==", server)
      .addField("== NSFW Commands ==", nsfw)
      .setFooter(`${bot.commands.size } Commands`, bot.user.displayAvatarURL())
      .setColor(0xfcc7fb);
     
			 message.channel.send("Te envie mi lista de comandos a tu DMs").then(m => {
    return message.author.send({ embed })
      }).catch(e => { 
         message.reply('Error al enviar DM Probablemente tengas DMs deshabilitados.')
      return;
      });
		 
		} else {
  const embed2 = new Discord.MessageEmbed()
  .setAuthor(`Comando/Command **${command.config.command}**`)
  .setDescription(`**${command.config.description || "Nothing"}**`)
  .addField("Alias", `${command.config.aliases.join(', ') || 'None'}`,true)
  .addField("Categoria/Category", `(\`${command.config.category || "None" }\`)`, true)
  .setThumbnail(bot.user.displayAvatarURL())
  .setColor(0xfcc7fb);
 return message.channel.send( embed2 );
    }
	}
exports.config = {
  command: "help",
  aliases: ["ayuda", "commands"],
  category: "info",
  description: "Te muestra la lista de los comandos de Yuuki",
  usage: "Yu!help"
};