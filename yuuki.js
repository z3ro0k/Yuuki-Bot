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
    invite: "https://discord.gg/4rzxMBT"
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
  
  var prefix = await bot.tools.GuildPrefix(message.guild)
  var sender = message.author;
  var msg = message.content.toLowerCase();
  
  var cont = message.content.slice(prefix.length).split(' ');
  var args = cont.slice(1);
  
  if (!message.content.startsWith(prefix)) return;
  
  var cmd = bot.commands.get(cont[0].toLowerCase()) || bot.commands.get(bot.aliases.get(cont[0].toLowerCase()));
  if (cmd) cmd.run(bot, message, args, queue);
  
})

bot.login('MzY1OTQ5Nzg4ODA3NzU3ODM0.DUwiiw.5XOJyb96StwLoAE_JZxpXNWaclE')

const { stringify } = require('querystring');
const { request } = require('https');

const dblupdate = () => {
const data = stringify({ server_count: bot.guilds.size });
  
const req = request({
    host: 'discordbots.org',
    path: `/api/bots/${bot.user.id}/stats`,
    method: 'POST',
    headers: {
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM2NTk0OTc4ODgwNzc1NzgzNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTE0OTM5ODc3fQ.QFcaSEfNHj3l6VTegWbi5w7Vz52KqikAdt4KUlVvy4Y',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(data)
    }
  });
  req.write(data);
  req.end();
};

bot.on('ready', dblupdate);
bot.on('guildCreate', dblupdate);
bot.on('guildRemove', dblupdate);

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
