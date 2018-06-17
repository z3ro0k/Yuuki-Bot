
const Discord = require("discord.js");
const { stripIndents } = require('common-tags');
    let pages = ['◈ `Yu!ping` ◈ `Yu!avatar` ◈ `Yu!ascii`◈ `Yu!calc◈` `Yu!emojis` ◈ `Yu!playing` ◈ `Yu!jumbo` ◈ `Yu!hug` ◈ `Yu!fortnite` ◈ `Yu!cat` ◈ `Yu!dog`'];
    let info = ['◈ `Yu!spotify` ◈ `Yu!weather` ◈ `Yu!help` ◈ `Yu!npm` ◈ `Yu!user` ◈ `Yu!ytsearch` ◈ `Yu!google` ◈ `Yu!mcuser` ◈ `Yu!roblox`']
    let admin = ['== Admin Commands ==\n\n◈ `Yu!hook`    :: envía un weekhook con tus argumentos\n◈ `Yu!settings`  ::  muestra la configuración actual del bot en su servidor\n◈ `Yu!tmute` ::  Silenciar al usuario mencionado por x tiempo\n◈ `Yu!warn`    ::  Advierte al usuario mencionado\n◈ `Yu!warnlist` ::  Muestra la lista de warns del usuario mencionado \n◈ `Yu!clean`    ::  borras mensajes con el bot']
    let nsfw = ['== NSFW Commands ==\n\n◈ No hay comandos NSFW por el momento']
    let botC = ['== BOT Commands ==\n\n◈ `Yu!report`  :: Usted envía un error que tiene el bot\n◈ `Yu!suggestion` :: Envía una sugerencia para agregar un comando al bot\n◈ `Yu!about`    :: Muestra toda la informacion del bot']
    let server = ['== Server Commands ==\n\n◈ `Yu!welcome`    ::  Activa los mod-logs para tu servidor\n◈ `To!setautorole`   ::  establecer el rol automático\n◈ `To!setchannel`    :: establece el canal a enviar los mensajes de bienvenida\n◈ `Yu!perms`         ::  Muestra los permsios que tiene el usuario mencionado o tuyos\n◈ `Yu!server`  ::  muestra información del servidor\n◈ `Yu!starboard`  ::  Establece la tabal de estrellas en tu servdidor']
    let music = ['== Comandos de Musica ==\n\n◈ `Yu!play`    ::  Ponga en fila una canción/lista de reproducción por URL o busque una canción.\n◈ `Yu!queue`   :: Muestra la lista de canciones a reproducir\n◈ `Yu!search`   :: Busca hasta 10 resultados.\n◈ `Yu!skip`   :: Salta una canción o varias canciones.\n◈ `Yu!pause`   :: Pausa la cola.\n◈ `Yu!resume`   :: Reanuda la cola.\n◈ `Yu!volumen`   :: Ajusta el volumen del bot.\n◈ `Yu!np`   :: Muestra la canción que se está reproduciendo actualmente.\n◈ `Yu!clearqueue`   :: Borra la cola actual.\n◈ `Yu!leave`   :: Deja el canal de voz y limpia la cola.\n◈ `Yu!loop`   :: Cambia el estado del bucle']

exports.run =  async (bot, message, args) => {

    var command = bot.commands.get(args[0]) || bot.commands.get(bot.aliases.get(args[0]))
   await message.delete();
if(!command) {
    const embed = new Discord.MessageEmbed()
      .setDescription(`<:helpNEP3:372992359287488512>**Mis comandos son **<:helpNEP3:372992359287488512>\nUse Yu!help comando para ver información detallada sobre el comando.`)
      .addField("== Comandos de Diversion ==", pages)
     // .addField("== Info Commands ==", info)
      .addField("Yu!help music","Muestra los comandos de musica")
      .addField("Yu!help botc", "Muestra los comandos del bot")
      .addField("Yu!help server", "Muestra los comandos de los mod-logs")
      .addField("Yu!help nsfw", "Muestra los comandos +18")
      .setFooter(`${bot.commands.size} Commands`, bot.user.displayAvatarURL())
      .setColor(0x36393e) 
  			try {
				//const msgs = [];
				message.author.send({ embed });
				if (message.channel.type !== 'dm') return await message.reply('�� Te envié un DM con la lista de mis comandos');
			} catch (err) {
				return message.reply('Error al enviar DM Probablemente tengas DMs deshabilitados.');
			}
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
  command: "help",
  aliases: ["ayuda", "commands"],
  category: "info",
  description: "Te muestra la lista de los comandos de Yuuki",
  usage: "Yu!help"
};