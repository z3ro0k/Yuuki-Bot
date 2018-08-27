const db = require('quick.db')

exports.run = async (bot, message, args) => {
    
    var langg = await bot.tools.Lang(message.guild)    
    const lang = require(`../langs/${langg}.json`) 

    var prefixx =  await bot.tools.GuildPrefix(message.guild) 
    let rolee = message.mentions.roles.first() || message.guild.roles.find(role => role.name === args[0])
    
    if (!message.member.hasPermission('ADMINISTRATOR')) return  bot.tools.embed(message.channel, lang.noP.ban) 
    if (!rolee) return message.channel.send(lang.roleusers.args) 

    db.set(`autoRoleU_${message.guild.id}`, rolee.name).then(i => { 

        message.channel.send(`${lang.roleusers.roleS} **${rolee.name}**`); 

    })

}
exports.config = {
  command: "sautoroleusers",
  aliases: ["autoroleusers", "roleusers"]
}