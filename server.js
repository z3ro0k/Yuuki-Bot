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
const tools = require('./functions.js');
const db = require('quick.db')


function loadCmds () {
bot.commands = new Discord.Collection();  
bot.aliases = new Discord.Collection();

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
    cmds.config.aliases.forEach(alias => {
	      bot.aliases.set(alias, cmds.config.command);
	  });

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
  
  var cmd = bot.commands.get(cont[0]) || bot.commands.get(bot.aliases.get(cont[0]));
  if (cmd) cmd.run(bot, message, args, loadCmds, tools);
  

})
bot.on('ready', () =>{
console.log('Bot launched...')
bot.user.setActivity('Hello everyone!')
bot.user.setStatus('dnd')  
});

bot.login('MzcwODI5Mzc5Mjc5OTEyOTcx.DdvsgQ.vEjUN5QR04xpa3JmC7dCCZehv4c')
//bot.login('Mzk2NTA1Mjc3MjYxOTM4Njg5.DXgWmw.e1zXkHOcrXJEY3635Pu8-cFWAgQ') //Supreme Bot token
bot.on('channelDelete', async channel => {
  let audit = await tools.fetchLastAudit(channel.guild);
  if (!audit) return;
  if (audit.action !== 'CHANNEL_DELETE') return;
  
  // Push to database
  db.push(`delChannels_${channel.guild.id}`, { target: `#${audit.changes[0].old}`, user: { id: audit.executor.id, tag: `${audit.executor.username}#${audit.executor.discriminator}` }, timestamp: Date.now() })
  
  // Starboard
  let starboard = await db.fetch(`starboard_${channel.guild.id}`)
  if (starboard !== null && starboard.enabled && starboard.channel === channel.id) {
    db.set(`starboard_${channel.guild.id}`, false, { target: '.enabled' }) 
  }
  
  // Check
  
  
})
// Starboard: Add
bot.on('messageReactionAdd', async (messageReaction, user) => {
  console.log(messageReaction)
  if (messageReaction.emoji.toString() !== '⭐') return; // Incorrect Emoji

  // Fetch Data
  let item = await db.fetch(`starItem_${messageReaction.message.id}`)
  let target = await db.fetch(`starboard_${messageReaction.message.guild.id}`)
  let requiredRole = await db.fetch(`starStarter_${messageReaction.message.guild.id}`)
  let channel = messageReaction.message.guild.channels.get(target.channel) || false;
  
  // Return Statements
  if (!target.enabled) return; // Not Enabled
  if (!channel) return; // No Channel
  
  const embed = new Discord.MessageEmbed()
      .setColor(0x36393e)
      .setTitle('Starboard')
  
  if (messageReaction.message.author.id === user.id) {
    embed.setFooter('¡No puedes reacionar a tu propio mensaje!')
    return messageReaction.message.channel.send(embed).then(msg => {
      msg.delete({timeout: 10000})
    })
  }
  
  let hasRole;
  if (requiredRole === null) hasRole = true;
  else if (messageReaction.message.guild.members.get(user.id).roles.find(role => role.name === requiredRole)) hasRole = true;
  else hasRole = false;
  
  if (item === null && hasRole) { // Starboard message not created
    db.set(`starItem_${messageReaction.message.id}`, { reactions: 1, reactants: [user.tag], message: { id: messageReaction.message.id, content: messageReaction.message.content }, author: { id: messageReaction.message.author.id, tag: messageReaction.message.author.tag } })
    
      embed.setDescription(messageReaction.message.content)
      .addField('Estrellas', '`⭐1`', true)
      .setFooter(`Reactivos: ${user.tag}`)
      .addField('Autor', messageReaction.message.guild.members.get(messageReaction.message.author.id), true)
    
    if (messageReaction.message.attachments.first()) {
      db.set(`starItem_${messageReaction.message.id}`, messageReaction.message.attachments.first().url, { target: '.attachment' })
      embed.setImage(messageReaction.message.attachments.first().url)
    }
    
    channel.send(embed).then(msg => {
      db.set(`starItem_${messageReaction.message.id}`, msg.id, { target: '.embedID' })
    })
  } else if (item !== null) {
    console.log(item)
    let msgID = messageReaction.message.id;
    
    // Configure Database
    await db.add(`starItem_${msgID}`, 1, { target: '.reactions' })
    let newItem = await db.fetch(`starItem_${msgID}`)
    newItem.reactants.push(user.tag)

      embed.setDescription(newItem.message.content)
      .addField('Estrellas', `\`⭐${newItem.reactions}\``, true)
      .setFooter(`Reactivos: ${newItem.reactants.join(', ')}`)
      .addField('Autor', messageReaction.message.guild.members.get(newItem.author.id), true)
      
      if (newItem.attachment) embed.setImage(newItem.attachment)
    
    bot.channels.get(target.channel).messages.get(newItem.embedID).edit(embed)
    
    db.set(`starItem_${msgID}`, newItem)
    
  } else if (!messageReaction.message.guild.members.get(user.id).roles.find(role => role.name === 'Moderators')) {
    embed.setFooter(`Lo sentimos, solo las personas con el rol ${requiredRole} pueden ser los primeros en destacar el mensaje.`)
    return messageReaction.message.channel.send(embed).then(msg => {
      msg.delete({timeout: 10000})
    })
  }
  
});

// Starboard: Remove
bot.on('messageReactionRemove', async (messageReaction, user) => {
  if (messageReaction.emoji.toString() !== '⭐') return; // Incorrect Emoji

  // Fetch Data
  let item = await db.fetch(`starItem_${messageReaction.message.id}`)
  let target = await db.fetch(`starboard_${messageReaction.message.guild.id}`)
  let channel = messageReaction.message.guild.channels.get(target.channel) || false;
  
  // Return Statements
  if (!target.enabled) return; // Not Enabled
  if (!channel) return; // No Channel
  
    let msgID = messageReaction.message.id;
    
    // Configure Database
    await db.subtract(`starItem_${msgID}`, 1, { target: '.reactions' })
    let newItem = await db.fetch(`starItem_${msgID}`)
    if (newItem.reactants instanceof Array) newItem.reactants.splice(newItem.reactants.indexOf(user.tag), 1)

    const embed = new Discord.RichEmbed()
      .setColor(0x36393e)
      .setTitle('Starboard')
      .setDescription(newItem.message.content)
      .addField('Estrellas', `\`⭐${newItem.reactions}\``, true)
      .addField('Autor', messageReaction.message.guild.members.get(newItem.author.id), true)
    
    if (newItem.reactants instanceof Array) embed.setFooter(`Reactivos: ${newItem.reactants.join(', ')}`)
    if (newItem.attachment) embed.setImage(newItem.attachment)
    bot.channels.get(target.channel).messages.get(newItem.embedID).edit(embed)
    
    db.set(`starItem_${msgID}`, newItem)
  
});