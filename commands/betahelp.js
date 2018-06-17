
const Discord = require("discord.js");
const { stripIndents } = require('common-tags');
    let pages = ['◈ `Yu!ping` ◈ `Yu!avatar` ◈ `Yu!ascii`◈ `Yu!calc◈` `Yu!emojis` ◈ `Yu!playing` ◈ `Yu!jumbo` ◈ `Yu!hug` ◈ `Yu!fortnite` ◈ `Yu!cat` ◈ `Yu!dog`'];
    let info = ['◈ `Yu!spotify` ◈ `Yu!weather` ◈ `Yu!help` ◈ `Yu!npm` ◈ `Yu!user` ◈ `Yu!ytsearch` ◈ `Yu!google` ◈ `Yu!mcuser` ◈ `Yu!roblox`']
    let admin = ['◈ `Yu!hook` ◈ `Yu!settings` ◈ `Yu!tmute` ◈ `Yu!warn` ◈ `Yu!warnlist` ◈ `Yu!clean`']
    let nsfw = ['◈ No hay comandos NSFW por el momento']
    let botC = ['◈ `Yu!report` ◈ `Yu!suggestion` ◈ `Yu!about`  ◈ `Yu!changelogs`']
    let server = ['◈ `Yu!welcome` ◈ `To!setautorole` ◈ `To!setchannel` ◈ `Yu!perms` ◈ `Yu!server` ◈ `Yu!starboard`']
    let music = ['== Comandos de Musica ==\n\n◈ `Yu!play`    ::  Ponga en fila una canción/lista de reproducción por URL o busque una canción.\n◈ `Yu!queue`   :: Muestra la lista de canciones a reproducir\n◈ `Yu!search`   :: Busca hasta 10 resultados.\n◈ `Yu!skip`   :: Salta una canción o varias canciones.\n◈ `Yu!pause`   :: Pausa la cola.\n◈ `Yu!resume`   :: Reanuda la cola.\n◈ `Yu!volumen`   :: Ajusta el volumen del bot.\n◈ `Yu!np`   :: Muestra la canción que se está reproduciendo actualmente.\n◈ `Yu!clearqueue`   :: Borra la cola actual.\n◈ `Yu!leave`   :: Deja el canal de voz y limpia la cola.\n◈ `Yu!loop`   :: Cambia el estado del bucle']

exports.run =  async (bot, message, args) => {

    var command = bot.commands.get(args[0]) || bot.commands.get(bot.aliases.get(args[0]))
   await message.delete();

if(!command) {

     const embed = new Discord.MessageEmbed()
      .setDescription(`<:helpNEP3:372992359287488512>**Mis comandos son **<:helpNEP3:372992359287488512>\nUse Yu!help comando para ver información detallada sobre el comando.`)
      .addField("== Comandos de Diversion ==", pages)
      .addField("== Comandos de información ==", info)
      .addField("== Comandos de administración ==", admin)
      .addField("== BOT Commands ==", botC)
      .addField("== Server Commands ==", server)
      .addField("== NSFW Commands ==", nsfw)
      .setFooter(`${bot.commands.size + 11} Commands`, bot.user.displayAvatarURL())
      .setColor(0x36393e) 

				message.author.send({ embed });
        //message.author.send( musice );
				await message.reply('�� Te envié un DM con la lista de mis comandos');

		}
  const embed2 = new Discord.MessageEmbed()
  .addField("Comando:", `**${command.config.command}**`)
  .addField("Alias:", `${command.config.aliases.join(', ') || 'None'}`)
  .addField("Categoria:", `(\`${command.config.category}\`)`)
  .addField("Descripción:", `**${command.config.description}**`) 
  .setThumbnail(bot.user.displayAvatarURL())
 return message.channel.send( embed2 );
	}
exports.config = {
  command: "betahelp",
  aliases: ["ayuda", "commands"],
  category: "info",
  description: "Te muestra la lista de los comandos de Yuuki",
  usage: "Yu!help"
};