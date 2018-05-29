//a
const http = require('http');
const express = require('express');
const app = express();

//
app.use(express.static('public'));

app.get("/", function (request, response) {
});

app.get("/", (request, response) => {
  response.sendStatus(200);
});

app.listen(process.env.PORT);

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`); 
}, 280000);
//DESDE AQUI EMPIEZA A ESCRIBIR EL CODIGO PARA SU BOT
const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();

var userAFK = [];


function loadCmds () {
bot.commands = new Discord.Collection();
//
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  
  var jsfiles = files.filter(f => f.split('.').pop() === 'js'); 
  if (jsfiles.length <= 0) { return console.log('No commands Found') }
  else { console.log(jsfiles.length + ' Commands found') }
  
  jsfiles.forEach((f, i) => {
    delete require.cache[require.resolve(`./commands/${f}`)]; 
    var cmds = require (`./commands/${f}`);
    console.log(`Command ${f} loading...`);
    bot.commands.set(cmds.config.command, cmds);

})
})
}
loadCmds();



bot.on('message', message => {
  
 
  var prefix = '.';
 
  var sender = message.author;
  var msg = message.content.toLowerCase();
  
  var cont = message.content.slice(prefix.length).split(' ');
  var args = cont.slice(1);
  
  if (!message.content.startsWith(prefix)) return;
  
  var cmd = bot.commands.get(cont[0])
  if (cmd) cmd.run(bot, message, args, loadCmds, userAFK);
  
  
  
 /* if (msg === prefix + 'RELOAD') {
      message.channel.send('All Comands Reload')
      loadCmds()
  } 
 */
})
bot.on('ready', () =>{
console.log('Bot launched...')
bot.user.setActivity('Hello everyone!')
bot.user.setStatus('dnd')  
});

bot.login('MzcwODI5Mzc5Mjc5OTEyOTcx.DdvsgQ.vEjUN5QR04xpa3JmC7dCCZehv4c')
//bot.login('Mzk2NTA1Mjc3MjYxOTM4Njg5.DXgWmw.e1zXkHOcrXJEY3635Pu8-cFWAgQ') //Supreme Bot token