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
const apis = require('./data/apis.json')
const bot = new Discord.Client({ 
    owner: "322203879208910849",
    disableEveryone: true,
    invite: "https://discord.gg/4rzxMBT",
    author: "PoeticAzurnex"
});

const idioticApi = require("idiotic-api");
const db = require('quick.db')

/*global Set, Map*/
const queue = new Map();
let cooldown = new Set();

//const DBL = require("dblapi.js");


bot.tools = require('./functions.js');
bot.tools.loadCmds(bot)
bot.tools.eventsLoad(bot)
bot.ownerID = '322203879208910849';
bot.color = 0xfcc7fb;

bot.idiotAPI = new idioticApi.Client('OuuLWREjnx5BNhGl1B7C', { dev: true });
const server = http.createServer(app);
var tokenDBl = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM2NTk0OTc4ODgwNzc1NzgzNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTE0OTM5ODc3fQ.QFcaSEfNHj3l6VTegWbi5w7Vz52KqikAdt4KUlVvy4Y"
const DBL = require('dblapi.js');
const DBl = new DBL(tokenDBl, { webhookPort: 5000, webhookAuth: 'YuukiBot' });

DBl.webhook.on('ready', hook => {
  console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
});
DBl.webhook.on('vote', vote => {
  console.log(`User with ID ${vote.user} just voted!`);
});

bot.on('message', async (message) => {


  if (message.channel.type != 'text') return;
  
  var prefixx =  await bot.tools.GuildPrefix(message.guild) 
  
  const mentionPrefix = new RegExp(`^<@!?${bot.user.id}> `)
            .exec(message.content);
        const prefixes = ['yuuki ', `${mentionPrefix}`, prefixx];
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
  /*
  if(cooldown.has(message.author.id)){
      message.channel.send(`**${message.author.username}**, espera 10 segundos para poder usar el comando de nuevo.`).then(m => {
      m.delete({ timeout: 5000})
      });
      return;
   }
   cooldown.add(message.author.id);
   
   setTimeout(() => {
     cooldown.delete(message.author.id);
   }, 10000);  */    
  
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
