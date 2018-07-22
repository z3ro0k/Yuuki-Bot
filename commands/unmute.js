const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (bot, message, args) => {
  
 let miembro = message.mentions.members.first();
        let role = message.guild.roles.find("name", "Silenciado");
        let perms = message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS");
        let razon = args.join(' ');
        
        if(!perms) return message.channel.send("No tienes el rango requerido para usar este comando.");
        if(message.mentions.users.size < 1) return message.reply("Debes mencionar a alguien para quitarle el silencio.").catch(console.error);
        if(!role) return message.channel.send('Rol no encontrado.');
        if(!miembro.roles.find("name", "Silenciado")) return message.reply("El usuario especificado no está silenciado.")
        if (!razon) {
        miembro.removeRole(role).catch(console.error);
        const embed = new Discord.RichEmbed()
        .setTitle(":loud_sound: Usuario no silenciado")
        .setDescription(`El silencio de **${miembro.user.username}** fue retirado.`)
        .addField('Razón:', 'Ninguna.')
        .addField("Admin/mod responsable:", `${message.author.username}#${message.author.discriminator}`)
        .setTimestamp()
        .setColor(0x42cc25)
        message.channel.send({embed});
          return;
        } else {
        
        message.delete();
        miembro.roles.remove(role).catch(console.error);
        const embed = new Discord.RichEmbed()
        .setTitle(":loud_sound: Usuario no silenciado")
        .setDescription(`El silencio de **${miembro.user.username}** fue retirado.`)
        .addField('Razón:', `${razon}`)
        .addField("Admin/mod responsable:", `${message.author.username}#${message.author.discriminator}`)
        .setTimestamp()
        .setColor(0x42cc25)
        message.channel.send({embed});
      }
  }
module.exports.config = {
  command: "unmute",
  aliases: ['unmute', 'desmutear']
}