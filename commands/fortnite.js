const Discord = require('discord.js'),
  {MessageEmbed} = require('discord.js'),
  {oneLine, stripIndents} = require('common-tags')
const key = require('../data/apis.json')
const Client = require('fortnite')
const fortnite = new Client(key.FORTNITE)
const db = require('quick.db')

exports.run = async (bot, msg, args) => {
 //  msg.delete();
  let username = args[0];
  let platform = args[1] || "pc";
  
  if (!args[0]) return msg.channel.send({
            embed: {
                title: "ERROR!",
                color: 0xE50000,
                description: "Please include the username: **Yu!fortnite <username> [ pc | xbl | psn ]**"
            }
        })
  
  if (!['pc', 'xbl', 'psn'].includes(args[1])) return msg.channel.send({
            embed: {
                title: "ERROR!",
                color: 0xE50000,
                description: "Please include the platform: **Yu!fortnite <username> [ pc | xbl | psn ]**"
            }
        })
   try {
     
const res = await fetch(`https://api.fortnitetracker.com/v1/profile/${platform}/${username}`, {
    headers: {
      'TRN-Api-Key': "cb01757e-178a-4d6e-9491-960937fc6cc8"
    }
}),
        stats = await res.json()    

      if (stats.error) throw new Error('noplayer');

      const fortEmbed = new MessageEmbed()
        .setTitle(`Fortnite Player Statistics for ${stats.epicUserHandle}`)
        .setURL(`https://fortnitetracker.com/profile/${stats.platformName}/${stats.epicUserHandle}`)
        .setThumbnail('https://nintendowire.com/wp-content/uploads/2018/06/FortniteSwitch.jpg')
        .setColor(msg.guild ? msg.guild.me.displayHexColor : '#7CFC00')
        .addField('Lifetime Stats', stripIndents`
        Wins: **${stats.lifeTimeStats.filter(el => el.key.toLowerCase() === 'wins')[0].value}**
        Kills: **${stats.lifeTimeStats.filter(el => el.key.toLowerCase() === 'kills')[0].value}**
        KDR: **${parseFloat(stats.lifeTimeStats.filter(el => el.key.toLowerCase() === 'k/d')[0].value, 10) * 100}%**
        Matches Played: **${stats.lifeTimeStats.filter(el => el.key.toLowerCase() === 'matches played')[0].value}**
        Top 3s: **${stats.lifeTimeStats.filter(el => el.key.toLowerCase() === 'top 3s')[0].value}**
        Top 5s: **${stats.lifeTimeStats.filter(el => el.key.toLowerCase() === 'top 5s')[0].value}**
        Top 10s: **${stats.lifeTimeStats.filter(el => el.key.toLowerCase() === 'top 10')[0].value}**
        Top 25s: **${stats.lifeTimeStats.filter(el => el.key.toLowerCase() === 'top 25s')[0].value}**
        `, true)
        .addField('Solos', stripIndents`
        Wins: **${stats.stats.p2.top1.value}**
        Kills: **${stats.stats.p2.kills.value}**
        KDR: **${parseFloat(stats.stats.p2.kd.value, 10) * 100}%**
        Matches Played: **${stats.stats.p2.matches.value}**
        Top 3s: **${stats.stats.p2.top3.value}**
        Top 5s: **${stats.stats.p2.top5.value}**
        Top 10s: **${stats.stats.p2.top10.value}**
        Top 25s: **${stats.stats.p2.top25.value}**
        `, true)
        .addField('Duos', stripIndents`
        Wins: **${stats.stats.p10.top1.value}**
        Kills: **${stats.stats.p10.kills.value}**
        KDR: **${parseFloat(stats.stats.p10.kd.value, 10) * 100}%**
        Matches Played: **${stats.stats.p10.matches.value}**
        Top 3s: **${stats.stats.p10.top3.value}**
        Top 5s: **${stats.stats.p10.top5.value}**
        Top 10s: **${stats.stats.p10.top10.value}**
        Top 25s: **${stats.stats.p10.top25.value}**
        `, true)
        .addField('Squads', stripIndents`
        Wins: **${stats.stats.p9.top1.value}**
        Kills: **${stats.stats.p9.kills.value}**
        KDR: **${parseFloat(stats.stats.p9.kd.value, 10) * 100}%**
        Matches Played: **${stats.stats.p9.matches.value}**
        Top 3s: **${stats.stats.p9.top3.value}**
        Top 5s: **${stats.stats.p9.top5.value}**
        Top 10s: **${stats.stats.p9.top10.value}**
        Top 25s: **${stats.stats.p9.top25.value}**
        `, true);

      return msg.channel.send(fortEmbed);
    } catch (err) {

      if ((/(noplayer)/i).test(err.toString())) {
        return msg.reply('no player found by that name. Check the platform (`pc`, `xbox` or `psn`)');
      }
    }
};
exports.config = {
  command: "fortnite",
  aliases: ["fortnite", "fort"],
  category: "info",
  description: "Busca información de un usuario de fortnite",
  usage: "Yu!fortnite MrNedinator pc"
};