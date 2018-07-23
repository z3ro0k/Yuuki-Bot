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
//DESDE AQUI EMPIEZA A ESCRIBIR EL CODIGO PARA SU BOT
const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();
const tools = require('./functions.js');
const db = require('quick.db')

bot.tools = require('./functions.js');
/*global Set, Map*/
const queue = new Map();

function loadCmds () {
bot.commands = new Discord.Collection();  
bot.aliases = new Discord.Collection();
bot.events = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  
  var jsfiles = files.filter(f => f.split('.').pop() === 'js'); 
  if (jsfiles.length <= 0) { return console.log('No commands Found') }
  else { console.log('Un total de ' + jsfiles.length + ' Comandos cargados') }
  
  jsfiles.forEach((f, i) => {
    delete require.cache[require.resolve(`./commands/${f}`)]; 
    var cmds = require (`./commands/${f}`);
    //console.log(`Command ${f} loading...`);
    bot.commands.set(cmds.config.command, cmds);
    cmds.config.aliases.forEach(alias => {
	      bot.aliases.set(alias, cmds.config.command);
	  });

})
})
}
loadCmds();
function eventsLoad () {
fs.readdir('./eventos/', async (err, files) => {
    if (err) return console.error(err);
    const jsfiles = files.filter(f => f.split('.').pop() === 'js');
    if (jsfiles.length <= 0) {
        return console.log('[eventos] No hay eventos para cargar');
    } else {
        console.log(`Cargando un total de ${jsfiles.length} eventos!`);
    }
    files.forEach(file => {
        let eventFunction = require(`./eventos/${file}`);
        let eventName = file.split('.')[0];
      if(!eventFunction.run) return;
      let run = eventFunction.run.bind(null, bot);
        bot.events.set(eventName, run);
        
        bot.on(eventName, run);
    });
});
}
eventsLoad();

var prefix = 'Yu!';
bot.on('message', message => {
 
  if (message.channel.type != 'text') return;
 
  bot.ownerID = '322203879208910849';
  bot.color = 0xDFE0D2;
 
  var sender = message.author;
  var msg = message.content.toLowerCase();
  
  var cont = message.content.slice(prefix.length).split(' ');
  var args = cont.slice(1);
  
  if (!message.content.startsWith(prefix)) return;
  
  var cmd = bot.commands.get(cont[0].toLowerCase()) || bot.commands.get(bot.aliases.get(cont[0].toLowerCase()));
  if (cmd) cmd.run(bot, message, args, tools, queue, loadCmds, eventsLoad);
  

})

//bot.login('MzcwODI5Mzc5Mjc5OTEyOTcx.DdvsgQ.vEjUN5QR04xpa3JmC7dCCZehv4c') Yuuki pruebas token
bot.login('MzY1OTQ5Nzg4ODA3NzU3ODM0.DUwiiw.5XOJyb96StwLoAE_JZxpXNWaclE')
//bot.login('Mzk2NTA1Mjc3MjYxOTM4Njg5.DXgWmw.e1zXkHOcrXJEY3635Pu8-cFWAgQ') //Supreme Bot token

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
