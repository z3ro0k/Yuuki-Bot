const Discord = require('discord.js')

exports.run = (bot, message, args, func) => {
var member = message.member
        if (message.mentions.users.array()[0]) {
            member = message.guild.members.get(message.mentions.users.array()[0].id);
        }

        var p = member.permissions.serialize(true);

        var perms = new Discord.MessageEmbed()
            .setAuthor(member.user.username + '#' + member.user.discriminator, member.user.avatarURL())
            .setDescription('User Permissions for ' + message.guild.name)
            .setColor(message.guild.me.displayColor);

        var i = 0;
        for (var key in p) {
            if (p.hasOwnProperty(key) && i < 24) {
                if (p[key] === false) {
                    perms.addField(blah(key), '<:xEmoji:449152918776446997>', true);
                } else {
                    perms.addField(blah(key), '<:yEmoji:449152942226931729>', true);
                }
                i++;
            }
            if (i === 24) {
                message.channel.send({ embed: perms });
                perms = new Discord.MessageEmbed()
                    .setColor(message.guild.me.displayColor)
                    .setFooter('Perms for ' + message.author.username, message.author.avatarURL())
                    .setTimestamp();
                i = 0;
            }
        }

        message.channel.send({ embed: perms });

        function blah(str) {
            if (str === 'MANAGE_ROLES_OR_PERMISSIONS') str = 'MANAGE_ROLES';
            str = str.replace(new RegExp('_', 'g'), ' ');
            return str.replace(/\w\S*/g, txt => {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }

}
exports.config = {
  command: "perms",
  aliases: ["permisos"]
}