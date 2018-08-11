const db = require('quick.db')

exports.run = (bot, message, args) => {
    
    if (!message.member.hasPermission('ADMINISTRATOR')) return  bot.tools.embed(message.channel, '<:adminNep:372599923381633024> **| No tienes Permisos para usar este comando.**') 
    if (!args.join(" ")) return message.channel.send('Por favor ingrese el nombre del rol. `rolebots <roleName>`') // Tell them if they didn't supply arguments

    db.set(`autoRoleB_${message.guild.id}`, args.join(" ").trim()).then(i => { // .trim() removes the whitespaces on both ends of the string. 

        message.channel.send('Cambió correctamente el rol automático para los bots a : **' + i + '**'); // This tells them what they just set the autorole to.

    })

}
exports.config = {
  command: "sautorolebots",
  aliases: ["sautorolebots", "rolebots"]
}