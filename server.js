
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

var commandsList = fs.readFileSync('Storage/commands.txt', 'utf8');

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
  
  var sender = message.author;
  var msg = message.content.toUpperCase();
  var prefix = '-';
  var cont = message.content.slice(prefix.length).split(' ');
  var args = cont.slice(1);
  
  
  if (!message.content.startsWith(prefix)) return;
  
  var cmd = bot.commands.get(cont[0])
  if (cmd) cmd.run(bot, message, args);
  
  if (message.channel.id === '410604743296286731') {
    if (isNaN(message.content)){
        message.delete();
          message.author.send('Porfavor solo numeros manda en el canal <#410604743296286731>, Gracias!')      
        }
       
      }
  
  if (msg === prefix + 'RELOAD') {
      message.channel.send('All Comands Reload')
      loadCmds()
  } 
})
bot.on('ready', () =>{
console.log('Bot launched...')
bot.user.setActivity('Hello everyone!')
bot.user.setStatus('dnd')  
});
bot.on('guildMemberAdd', member => {
  console.log('El usuario' + member.user.username + 'a entrado al server')
  var role = member.guild.roles.find('name', 'Members');
  member.addRole(role)
});
//bot.login('Mzk2NTA1Mjc3MjYxOTM4Njg5.DVvirQ.TJ9A4pbAR7YFZcH5Gkx8Elc6l5Q')