const Discord = require("discord.js");
const dateFormat = require('dateformat');

//let cooldown = new Set();

exports.run = async(bot, message, args) => {
  if(args[0] == "help"){
    const help = new Discord.MessageEmbed()
      .addField('Uso:', "Yu-server")
      .setColor(0x36393e)
      .addField('Descripción', "Muestra la información del server")
      .addField('Ejemplos:', "Yu-server 322209371704786945\nYu-server 312846399731662850\nYu-server")
      message.channel.send(help);
      return;
    }
  let server = bot.guilds.get(args.join(' ')) || message.guild
  let sender = message.author
  let online = server.members.filter(m => m.presence.status == 'online')
  let offline = server.members.filter(m => m.presence.status == 'offline')
  let dnd = server.members.filter(m => m.presence.status == 'dnd')
  let idle = server.members.filter(m => m.presence.status == 'idle')
  let streaming = server.members.filter(s => s.presence.status === 'streaming')

    const now = new Date();
				 dateFormat(now, '***On dddd, mmmm dS, yyyy, h:MM:ss TT***');

	let region = {
		"brazi": "Brazil** :flag_br:",
		"eu-central": "Central Europe :flag_eu:",
    "singapore": "Singapore** :flag_sg:",
    "us-central": "U.S. Central** :flag_us:",
    "sydney": "Sydney** :flag_au:",
    "us-east": "U.S. East :flag_us:",
    "us-south": "U.S. South :flag_us:",
    "us-west": "U.S. West :flag_us:",
    "eu-west": "Western Europe :flag_eu:",
    "singapore": "Singapore :flag_sg:",
    "london": "London :flag_gb:",
    "japan": "Japan :flag_jp:",
    "russia": "russia :flag_ru:",
    "hongkong": "Hong Kong :flag_hk:"
	}
	let icon;
	if (server.iconURL) {
	    icon = server.iconURL
	}
	if (!server.iconURL) {
	    icon = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Blue_computer_icon.svg/2000px-Blue_computer_icon.svg.png"
	}
	let owner = server.owner.user
	if (!owner) {
	    owner = "None for some reason..."
	};
	
    const millis = new Date().getTime() - server.createdAt.getTime();
    const days = millis / 1000 / 60 / 60 / 24;



    const verificationLevels = ['None', 'Low', 'Medium', '(╯°□°）╯︵ ┻━┻ (High)', '┻━┻彡 ヽ(ಠ益ಠ)ノ彡┻━┻ (Extreme)'];
  
  var embed = new Discord.MessageEmbed()
    .setTitle(`**Server Info for ${server.name}** 👪`)
    .setColor(0x36393e)  
    .setThumbnail(icon)
    .setDescription(`[>](https://discord.gg/hZACuxT)Members Online: <a:Online:446119385480953866>${online.size}\n[>](https://discord.gg/hZACuxT)Members offline: <a:Offline:446126934355738627>${offline.size}\n[>](https://discord.gg/hZACuxT)Members dnd: <a:Dnd:446126900788592670>${dnd.size}\n[>](https://discord.gg/hZACuxT)Members idle: <a:Idle:446126963585974283>${idle.size}\n[>](https://discord.gg/hZACuxT)Members streaming <a:Streaming:446126986482417676>${streaming.size}`)
    .addField("**Guild ID** :id:", `[>](https://discord.gg/hZACuxT)${server.id}`, true)
    .addField("**Created On** <:Verific:446119366187024394>", `[>](https://discord.gg/hZACuxT)${dateFormat(server.createdAt)}`)
    .addField("**Region** ", `[>](https://discord.gg/hZACuxT)${region[server.region]}`, true)
    .addField("**User Count** 👥", `[>](https://discord.gg/hZACuxT)${server.members.filter(m => m.presence.status !== 'offline').size} **Online** out of ${server.memberCount} members`, true)
    .addField("**Owner** :prince:", `[>](https://discord.gg/hZACuxT)${owner.username}`, true)
    .addField("**Text Channels Count** :speaker:", `[>](https://discord.gg/hZACuxT)${server.channels.filter(m => m.type === 'text').size} Text Channels`, true)
    .addField("**Voice Channels Count** :loudspeaker:", `[>](https://discord.gg/hZACuxT)${server.channels.filter(m => m.type === 'voice').size} Voice Channels `, true)
    .addField("**Verification Level** 📶", `[>](https://discord.gg/hZACuxT)${verificationLevels[server.verificationLevel]}`, true)
    .addField("**Roles Count** :scroll:", `[>](https://discord.gg/hZACuxT)${server.roles.size} Roles `, true)
    message.channel.send({ embed: embed });
}
module.exports.config = {
  command: "server",
  aliases: ['serverinfo', 'servidor']
}