const Discord = require('dsicord.js')

exports.run = async (bot, message, args) => {
const guilds = client.guilds.map(g => g.id)
    
  const randomizer = Math.floor(Math.random()*guilds.length);
    const channel = client.guilds.get(guilds[randomizer]).channels.filter(m => m.type === 'text').map(t => t.id).slice(1)
    const randomizer2 = Math.floor(Math.random()*channel.length);
        if (message.author.id !== "322203879208910849" && message.author.id !== "396027480097554432") {
        var embed = new Discord.RichEmbed()
        .setTitle("Restricted")
        .setColor("#FF0000")
        .setTimestamp()
        .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Flat_cross_icon.svg/1024px-Flat_cross_icon.svg.png")
        .addField(`Im sorry __${message.author.username}__...`, ":octagonal_sign: **You are not allowed to use this command...** :octagonal_sign:")
         message.channel.send({ embed: embed })
         return;
}
		message.channel.send({
            embed: {
                color: 0x503d82,
                description: "Invite was sent to your DMs to avoid raiders :mailbox_with_mail:"
            }
        })
        client.channels.get(channel[randomizer2]).createInvite().then(invite => {
        message.author.send(`Here is your invite from **${client.guilds.get(guilds[randomizer])}**! \n${invite.url}`)
  
        });
  }
}