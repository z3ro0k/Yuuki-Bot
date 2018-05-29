const Discord = require('discord.js')
const snekfetch = require('snekfetch');
const { shorten, base64 } = require('../utils/Util');
const { TWITTER_KEY, TWITTER_SECRET } = require('../data/apis.json')

exports.run = async (bot, msg, args) => {
    const author = args[0]
    const repository = args[1]
    if(!author) {
    msg.channel.send('Who is the author of the repository?')
      return;
    }
  if(!repository) {
    msg.channel.send('What is the name of the repository?')
      return;
    }
    
 try {
			if (!this.token) await this.fetchToken();
			const { body } = await snekfetch
				.get('https://api.twitter.com/1.1/users/show.json')
				.set({ Authorization: `Bearer ${this.token}` })
				.query({ screen_name: user });
			const embed = new MessageEmbed()
				.setColor(0x55ADEE)
				.setAuthor('Twitter', 'https://i.imgur.com/QnfcO7y.png', 'https://twitter.com/')
				.setThumbnail(body.profile_image_url_https)
				.setURL(`https://twitter.com/${body.screen_name}`)
				.setTitle(`${body.name} (@${body.screen_name})`)
				.setDescription(body.description)
				.addField('❯ Tweets', body.statuses_count, true)
				.addField('❯ Followers', body.followers_count, true)
				.addField('❯ Following', body.friends_count, true)
				.addField('❯ Protected?', body.protected ? 'Yes' : 'No', true)
				.addField('❯ Verified?', body.verified ? 'Yes' : 'No', true)
				.addField('❯ Creation Date', new Date(body.created_at).toDateString(), true)
				.addField('❯ Latest Tweet', body.status ? body.status.text : '???');
			return msg.channel.send(embed);
		} catch (err) {
			if (err.statusCode === 401) await this.fetchToken();
			if (err.statusCode === 404) return msg.say('Could not find any results.');
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	

	async fetchToken() {
		const { body } = await snekfetch
			.post('https://api.twitter.com/oauth2/token')
			.set({
				Authorization: `Basic ${base64(`${TWITTER_KEY}:${TWITTER_SECRET}`)}`,
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			})
			.send('grant_type=client_credentials');
		this.token = body.access_token;
		return body;
	}

module.exports.config = {
  command: "github"
}