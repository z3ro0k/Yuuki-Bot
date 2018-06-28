const { stripIndents } = require('common-tags')
const { escapeMarkdown } = require('discord.js')
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

exports.run = async (bot, message, args) => {
    var dev
    try { dev = bot.users.get('322203879208910849').tag } catch (e) { dev = 'Alexis M𝒱✘#7319 ' }

   const info = await bot.tools.getInfo();
   const linkLastCommit = `https://glitch.com/edit/#!/welcome-project/commit/${info.version}`;


    var totalGuilds; var totalChannels; var totalUsers
    if (!bot.shard) {
      totalGuilds = await bot.guilds.size.toLocaleString()
      totalChannels = await bot.channels.size.toLocaleString()
      totalUsers = await bot.users.size.toLocaleString()
    } else {
      var totalGuildsData = await bot.shard.fetchClientValues('guilds.size.toLocaleString()')
      totalGuilds = await totalGuildsData.reduce((prev, val) => prev + val, 0)
      var totalChannelsData = await bot.shard.fetchClientValues('channels.size.toLocaleString()')
      totalChannels = await totalChannelsData.reduce((prev, val) => prev + val, 0)
      var totalUsersData = await bot.shard.fetchClientValues('users.size.toLocaleString()')
      totalUsers = await totalUsersData.reduce((prev, val) => prev + val, 0)
    }

    let embed = new MessageEmbed({
      author: {
        name: await bot.fetchApplication().then(app => { return `${app.owner.tag} | ${bot.user.tag}` }),
        icon_url: bot.user.displayAvatarURL(),
        url: require(`${process.cwd()}/package.json`).homepageGithub
      },
      footer: {
        text: message.author.tag,
        icon_url: message.author.displayAvatarURL()
      },
      timestamp: new Date(),
      fields: [
        {
          'name': 'Developer',
          'value': stripIndents`
            Discord: **${escapeMarkdown(dev)}**
            GitHub: [\`@AlexisMV\`](http://github.com/AlexisMV)
          `,
          'inline': false
        },
        {
          'name': 'Developed In',
          'value': stripIndents`
            Language: **JavaScript** (NodeJS)
            Library: **discord.js** (v${require('discord.js/package.json').version})
            Bot Version: **${require(`${process.cwd()}/package.json`).version}**
          `,
          'inline': false
        },
        {
          'name': 'Links',
          'value': stripIndents`
           Bot Invite: [\`Click Here!\`](https://discordapp.com/oauth2/authorize?client_id=396505277261938689&scope=bot&permissions=2084043903)
            Server Invite: [\`Click Here!\`](https://discord.gg/RwmuHu6)
            Homepage: [Click Here!](${require(`${process.cwd()}/package.json`).homepage})
            Repository: [Click Here!](${require(`${process.cwd()}/package.json`).homepageGithub})
          `,
          'inline': false
        },
        {
          'name': 'Discord Stats',
          'value': stripIndents`
            ${bot.shard ? `Shards: **${bot.shard.count}**\n` : ''}Guilds: **${totalGuilds}**
            Channels: **${totalChannels}**
            Users: **${totalUsers}**
          `,
          'inline': false
        },
        {
          name: 'Version',
          value: info.version,
          inline: false
        },
        {
          name: 'Last Commit',
          value: `[Open](${linkLastCommit})`,
          inline: true
        }
         ],
      color: 0x7289DA
       }).setFooter(moment().format('LLLL'));

        if ('message' in info) {
            embed.addField('Last Commitmessage', info.message, false);
        }

        if ('timestamp' in info) {
            embed.addField('Committed', (moment(info.timestamp, 'YYYY-MM-DD HH:mm:ss Z').fromNow()), false);
        }
 message.channel.send({embed});
  }
exports.config = {
  command: "info",
  aliases: ['info', 'info'],
  category: "util",
  description: "info owo",
  usage: "Yu!info"
};