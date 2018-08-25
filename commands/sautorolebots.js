const db = require('quick.db')

exports.run = async (bot, message, args) => {
    var langg = await bot.tools.Lang(message.guild)    
    const lang = require(`../langs/${langg}.json`) 

    var prefixx =  await bot.tools.GuildPrefix(message.guild) 
    
    if (!message.member.hasPermission('ADMINISTRATOR')) return  bot.tools.embed(message.channel, '<:adminNep:372599923381633024> **| No tienes Permisos para usar este comando.**') 
    if (!args.join(" ")) return message.channel.send(lang.rolebots.args.replace('{{prefix}}', prefixx)) // Tell them if they didn't supply arguments

    db.set(`autoRoleB_${message.guild.id}`, args.join(" ").trim()).then(i => { // .trim() removes the whitespaces on both ends of the string. 

        message.channel.send(`${lang.rolebots.roleS} **${i}**`); // This tells them what they just set the autorole to.

    })

}
exports.config = {
  command: "sautorolebots",
  aliases: ["sautorolebots", "rolebots"]
}