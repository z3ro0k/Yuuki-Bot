const config  = require('../data/apis.json');
const Discord = require('discord.js');
const fetch = require('node-fetch');
const db = require('quick.db')

exports.run = (bot, message, args) => {

    let apiKey = config.twitchClientID;
    if (!args.join(' ')) {
        return message.reply('You must give me a twitch channel for stats');
    }
    
     fetch('https://api.twitch.tv/kraken/users/' + args.join(' ') + '?client_id=' + apiKey)
    .then(res => {
        return res.json();
    }).then(json => {
        fetch('https://api.twitch.tv/kraken/channels/' +args.join(' ') + '?client_id=' + apiKey)
          .then(res => {
              return res.json();
          }).then(json2 => {
              if (json.status === 404) {
                  return message.reply(`Channel: \`\`${args.join(' ')}\`\` does not exist.`).catch(e => console.log(e));
              }
  
              
              const embed = new Discord.MessageEmbed()
              .setAuthor('Twitch Info ')
              .addField('Name', json.name, true)
              .addField('Since', json.created_at, true)
              .addField('Total followers', Number(json2.followers).toLocaleString(), true)
              .addField('Total views', Number(json2.views).toLocaleString(), true)
              .addField('Channel link', json2.url, true)
              .addField('**Has partner?**', json2.partner)
              .setColor(0x36393e)
              .setThumbnail('https://i.imgur.com/gYf1BEK.png');

              message.channel.send({embed}).catch(e => console.log(e));
          }).catch(e => console.log(e));
    });
  };
exports.config = {
  command: "twitchstats",
  aliases: ["tstats", "twitchs"]
}