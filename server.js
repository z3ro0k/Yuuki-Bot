//ESTE CODIGO NO AFECTARA SU BOT, SCRIPT DE ARRANQUE

const http = require('http');
const express = require('express');
const app = express();

//
app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/", (request, response) => {
  response.sendStatus(200);
});

app.listen(process.env.PORT);

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`); 
}, 280000);
//DESDE AQUI EMPIEZA A ESCRIBIR EL CODIGO PARA SU BOT
const Discord = require('discord.js')

const bot = new Discord.Client();

bot.on('message', message =>{
  
  var sender = message.author;
  var msg = message.content.toUpperCase();
  var prefix = '-';
  
  if (msg === prefix + 'PING'){
      message.channel.send('Pong! **' + sender.username + '**');  
  
  }

  if (message.channel.id === '410604743296286731') {
    if (isNaN(message.content)){
        message.delete();
          message.author.send('Porfavor solo numeros manda en el canal <#410604743296286731>, Gracias!')      
        }
       
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
bot.login('Mzk2NTA1Mjc3MjYxOTM4Njg5.DVvirQ.TJ9A4pbAR7YFZcH5Gkx8Elc6l5Q')