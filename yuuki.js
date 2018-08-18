const http = require('http');
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get("/", (request, response) => {
  response.sendStatus(200);
});

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/index.html');
});
app.listen(process.env.PORT);

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`); 
}, 280000);


const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client({ 
    owner: "322203879208910849",
    disableEveryone: true,
    invite: "https://discord.gg/4rzxMBT",
    author: "PoeticAzurnex"
});

const db = require('quick.db')

/*global Set, Map*/
const queue = new Map();

bot.tools = require('./functions.js');
bot.tools.loadCmds(bot)
bot.tools.eventsLoad(bot)
bot.ownerID = '322203879208910849';
bot.color = 0xfcc7fb;

bot.on('message', async (message) => {


  if (message.channel.type != 'text') return;
  
  var prefixx =  await bot.tools.GuildPrefix(message.guild) 
  
  const mentionPrefix = new RegExp(`^<@!?${bot.user.id}> `)
            .exec(message.content);
        const prefixes = ['yuuki ', `${mentionPrefix}`, 'Yu!', prefixx];
        let prefix = false;

        for (const i of prefixes) {
            if (message.content.startsWith(i)) prefix = i;
        }

        if (!prefix) return;
  
  var sender = message.author;
  var msg = message.content.toLowerCase();
  
  var cont = message.content.slice(prefix.length).split(' ');
  var args = cont.slice(1);
  
  if (!message.content.startsWith(prefix)) return;
  
  var cmd = bot.commands.get(cont[0].toLowerCase()) || bot.commands.get(bot.aliases.get(cont[0].toLowerCase()));
  if (cmd) cmd.run(bot, message, args, queue);
  
})

bot.login('MzY1OTQ5Nzg4ODA3NzU3ODM0.DUwiiw.5XOJyb96StwLoAE_JZxpXNWaclE')

var dbl = async () => {
await bot.tools.post_dbl(bot)
} 
bot.on('ready', dbl);
bot.on('guildCreate', dbl);
bot.on('guildRemove', dbl);

const lupdate = async ()  => {

const snekfetch = require("snekfetch");

await snekfetch.post(`https://listcord.com/api/bot/${bot.user.id}/guilds`)
    .set("token", "402bKuIVcNr2x1pekyYIeoV4TK~AMOOr_AQko3CSqMC")
    .send({ guilds: bot.guilds.size })
    .then(() => console.log("Successfully posted guild count to listcord.com"))
    .catch(error => {
        //Error.captureStackTrace(error);
        console.error(error);
    });
}

bot.on('ready', lupdate);
bot.on('guildCreate', lupdate);
bot.on('guildRemove', lupdate);
