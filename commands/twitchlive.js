const request = require('request-promise-native');
const config  = require('../data/apis.json');

exports.run = (bot, message, args) => {
  let options = {
      headers: {
        'Client-ID': config.twitchClientID,
        'Accept': 'Accept: application/vnd.twitchtv.v3+json'
      },
      url: `https://api.twitch.tv/kraken/streams/${args}`,
      json: true
    };

request(options).then(response => { console.log(response);

    let author, fields, image, footer;

    if (response.stream === null) {
      return message.reply('This user is not LIVE <:twitch:430890176802193409>');
    }
  

    author = {
      name: response.stream.channel.display_name,
      url: response.stream.channel.url,
      icon_url: response.stream.channel.logo
    };
    fields = [
      {
        name: 'Game',
        value: response.stream.game,
        inline: true
      },
      {
        name: 'Viewers',
        value: response.stream.viewers,
        inline: true
      }
    ];
    image = {
      url: response.stream.preview.large
    };
    footer = {
      text: 'Yuuji Twitch Live Command'
    };

    message.channel.send({
      embed: {
        color: 0x36393e,
        author: author,
        title: response.stream.channel.status,
        url: response.stream.channel.url,
        fields: fields,
        image: image,
        footer: footer,
        timestamp: new Date(response.stream.created_at)
      }
    }).catch(e => {
      console.log.error(e);
    });
    }).catch(e => console.log(e));
  };
exports.config = {
  command: "twitchlive",
  aliases: ["twitchlive", "livetwitch"]
}