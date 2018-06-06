const snekfetch = require("snekfetch");
var npm = require("npm-module-search");
const Discord = require('discord.js');
const humanizeduration = require("humanize-duration");

exports.run = (bot, message, args, func) => {
  
snekfetch.get("https://skimdb.npmjs.com/registry/" + args[0].toLowerCase()).then((body) => {
  
 
if (!args.join('+')) {
return message.channel.send(":x: You must specify an argument maximum.");
}
  
npm.search(args.join('+') ,function(err, modules) {
  var module = modules[0]
const embed = new Discord.MessageEmbed()
.setThumbnail('https://images-ext-1.discordapp.net/external/-NXRfQPM329Ppw6RFeMnwDmLyqPo8Nj9gxy8vNBIuJs/https/i.imgur.com/8DKwbhj.png?width=72&height=28')
.setAuthor(body.body.name + ' - npmjs Package Information', 'https://i.imgur.com/7s93NUA.png', `https://www.npmjs.com/search?q=${args.join('+')}`)
.addField('description', body.body.description)
.addField('Author', body.body.author.name, true)
.addField('Version',  body.body["dist-tags"].latest, true)
.addField("Maintainers", body.body.maintainers.map((m) => m.name).join(", "), true)
.addField("Last Updated", humanizeduration(Date.now() - new Date(body.body.time[body.body["dist-tags"].latest]).getTime(), {round: true,largest: 2}), true)
.addField('NPMjs Package', `[NPM Js](https://www.npmjs.com/search?q=${args.join('+')})`, true)
.addField("Github Repository",  '[GitHub](' + ((body.body.repository) ? body.body.repository.url.replace("git+", "").replace(".git", "").replace("git://", "https://").replace("git@github.com:", "https://github.com/") + ")" : "No Repository"), true)
.setTimestamp()
.setColor(0x36393e)

message.channel.send({ embed }).catch (error => {
        message.channel.send({
            embed: {
                title: "ERROR!",
                color: 0xE50000,
                description: `The npm **${args[0]}** was not found`
            }
        })
      });
    })
  })
}
exports.config = {
  command: "npm",
  aliases: ["npm", "npmjs"]
}