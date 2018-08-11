const db = require('quick.db')

exports.run = (bot, message, args) => {
    
    if (!message.member.hasPermission('ADMINISTRATOR')) return  bot.tools.embed(message.channel, '<:adminNep:372599923381633024> **| No tienes Permisos para usar este comando.**') 
    if (!args.join(" ")) return message.channel.send('Por favor ingrese el nombre del rol. `roleusers <roleName>`') 

    db.set(`autoRoleU_${message.guild.id}`, args.join(" ").trim()).then(i => { 

        message.channel.send('Cambió correctamente el rol automático para los usuarios  a: **' + i + '**'); 

    })

}
exports.config = {
  command: "sautoroleusers",
  aliases: ["autoroleusers", "roleusers"]
}