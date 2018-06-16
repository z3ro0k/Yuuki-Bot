exports.config = {
  command: "help",
  aliases: ["ayuda", "commands"],
  category: "info",
  description: "Te muestra la lista de los comandos de Yuuki",
  usage: "Yu!help"
};
const Discord = require("discord.js");

exports.run =  (bot, message, args) => {
    const Discord = require('discord.js');  

  message.delete();
    let pages = ['== Comandos de Diversion ==\n\n◈ `Yu!ping`     ::  Muestra la lactancia de los mesanjes del bot y la api de discord\n◈ `Yu!avatar`   ::  Muestra tu avatar o la del usuario mencionado\n◈ `Yu!ascii`    ::  Convierte un tezt a ASCII\n◈ `Yu!calc`     ::  Calcula un aecuacion o suma\n◈ `To!emojis`   ::  Muestra los emojis que hay en el server\n◈ `Yu!playing`  ::  Muestra el jugando del usuario mencionado\n◈ `Yu!jumbo`    ::  Agranda un emoji owo\n◈ `Yu!hug`  ::  abraza al usuario mencionado\n◈ `Yu!fortnite` ::  Muestra información sobre usuarios específicos de Fortnite\n◈ `Yu!cat`      ::  Envía una imagen de un gato!\n◈ `Yu!dog`      ::  Envía una imagen de un perro!'];
    let info = ['== Info Commands ==\n\n ◈ `Yu!spotify`  ::  Muestra la canción que estás escuchando en spotify el usuario mencionado\n◈ `Yu!weather`  ::  Muestra información sobre una ciudad\n◈ `Yu!help`     ::  Muestra todos los comandos disponibles\n◈ `Yu!npm`      ::  busca un paquete para agregar a tu bot\n◈ `Yu!user` ::  muestre su información o la del usuario mencionado\n◈ `Yu!ytsearch` ::  buscar canciones de youtube con el bot\n◈ `Yu!google`   ::  Busca algo en google\n◈ `Yu!mcuser`   ::  ¡Obtén la información de un usuario de minecraft!\n◈ `Yu!roblox`   ::  busca un usuario roblox y obtén información']
    let admin = ['== Admin Commands ==\n\n◈ `Yu!hook`    :: envía un weekhook con tus argumentos\n◈ `Yu!settings`  ::  muestra la configuración actual del bot en su servidor\n◈ `Yu!tmute` ::  Silenciar al usuario mencionado por x tiempo\n◈ `Yu!warn`    ::  Advierte al usuario mencionado\n◈ `Yu!warnlist` ::  Muestra la lista de warns del usuario mencionado \n◈ `Yu!clean`    ::  borras mensajes con el bot']
    let nsfw = ['== NSFW Commands ==\n\n◈ No hay comandos NSFW por el momento']
    let botC = ['== BOT Commands ==\n\n◈ `Yu!report`  :: Usted envía un error que tiene el bot\n◈ `Yu!suggestion` :: Envía una sugerencia para agregar un comando al bot\n◈ `Yu!about`    :: Muestra toda la informacion del bot']
    let server = ['== Server Commands ==\n\n◈ `Yu!welcome`    ::  Activa los mod-logs para tu servidor\n◈ `To!setautorole`   ::  establecer el rol automático\n◈ `To!setchannel`    :: establece el canal a enviar los mensajes de bienvenida\n◈ `Yu!perms`         ::  Muestra los permsios que tiene el usuario mencionado o tuyos\n◈ `Yu!server`  ::  muestra información del servidor\n◈ `Yu!starboard`  ::  Establece la tabal de estrellas en tu servdidor']
    let music = ['== Comandos de Musica ==\n\n◈ `Yu!play`    ::  Ponga en fila una canción/lista de reproducción por URL o busque una canción.\n◈ `Yu!queue`   :: Muestra la lista de canciones a reproducir\n◈ `Yu!search`   :: Busca hasta 10 resultados.\n◈ `Yu!skip`   :: Salta una canción o varias canciones.\n◈ `Yu!pause`   :: Pausa la cola.\n◈ `Yu!resume`   :: Reanuda la cola.\n◈ `Yu!volumen`   :: Ajusta el volumen del bot.\n◈ `Yu!np`   :: Muestra la canción que se está reproduciendo actualmente.\n◈ `Yu!clearqueue`   :: Borra la cola actual.\n◈ `Yu!leave`   :: Deja el canal de voz y limpia la cola.\n◈ `Yu!loop`   :: Cambia el estado del bucle']
  if(args[0] === "fun" || args[0] === "Fun" || args[0] === "FUN" || args[0] === "FuN") {
    const embed = new Discord.MessageEmbed()
        .setColor(0x36393e)
        .setFooter(`Comandos de diversión`)
        .setDescription(pages);
 
    return message.channel.send(embed) 
 }
  if(args[0] === "info" || args[0] === "Info" || args[0] === "INFO") {
    let page = 1
    const embed = new Discord.MessageEmbed()
        .setColor(0x36393e)
        .setFooter(`Comandos Informativos`)
        .setDescription(info);
 
    return message.channel.send(embed) 
 } 
  if(args[0] === "admin" || args[0] === "Admin" || args[0] === "ADMIN") {
    const embed = new Discord.MessageEmbed()
        .setColor(0x36393e)
        .setFooter('Comandos Administrativos')
        .setDescription(admin);
 
    return message.channel.send(embed) 
 } 
  if(args[0] === "nsfw" || args[0] === "NSFW" || args[0] === "Nsfw") {
    const embed = new Discord.MessageEmbed()
        .setColor(0x36393e)
        .setFooter('Comandos +18')
        .setDescription(nsfw);
 
    return message.channel.send(embed) 
 } 
  if(args[0] === "botc" || args[0] === "Botc" || args[0] === "BOTC") {
    const embed = new Discord.MessageEmbed()
        .setColor(0x36393e)
        .setFooter('Comandos para la informacion del bot')
        .setDescription(admin);
 
    return message.channel.send(embed) 
 } 
  if(args[0] === "server" || args[0] === "Server" || args[0] === "SERVER") {
    const embed = new Discord.MessageEmbed()
        .setColor(0x36393e)
        .setFooter('Comandos Administrativos')
        .setDescription(admin);
 
    return message.channel.send(embed) 
 } 
  if(args[0] === "music" || args[0] === "Music" || args[0] === "MUSIC") {
    const embed = new Discord.MessageEmbed()
        .setColor(0x36393e)
        .setFooter('Comandos de Musica')
        .setDescription(music);
 
    return message.channel.send(embed) 
 } else {
    const embed = new Discord.MessageEmbed()
      .setDescription(`<:helpNEP3:372992359287488512>**Mis categorias son**<:helpNEP3:372992359287488512>`)
      .addField("Yu!help fun","Muestra los comandos para divertirse un rato")
      .addField("Yu!help info","Muestra los comandos para informarte")
      .addField("Yu!help music","Muestra los comandos de musica")
      .addField("Yu!help botc", "Muestra los comandos del bot")
      .addField("Yu!help server", "Muestra los comandos de los mod-logs")
      .addField("Yu!help nsfw", "Muestra los comandos +18")
      .setFooter("Modo de uso Yu!help fun", bot.user.displayAvatarURL())
      .setColor(0x36393e)
 
return  message.channel.send({embed})  
 }
    }