const db = require('quick.db');
const Discord = require('discord.js');
const ms = require('parse-ms');
const exec = require('child_process').exec;
const { MessageEmbed } = require('discord.js');
const bot = require('./yuuki.js').bot
const fs = require('fs')
module.exports = { 
  
    hook: function(channel, title, message, color, avatar) { 

        if (!channel) return console.log('Channel not specified.');
        if (!title) return console.log('Title not specified.');
        if (!message) return console.log('Message not specified.');
        if (!color) color = '0x36393e'; 
        if (!avatar) avatar = 'https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png' 
      
        color = color.replace(/\s/g, '');
        avatar = avatar.replace(/\s/g, '');

        channel.fetchWebhooks() 
            .then(webhook => {

                let foundHook = webhook.find(hook => hook.name ==='Webhook'); 

                if (!foundHook) {
                    channel.createWebhook('Webhook', 'https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png') // Make sure this is the same thing for when you search for the webhook. The png image will be the default image seen under the channel. Change it to whatever you want.
                        .then(webhook => {
                            
                            webhook.send('', {
                                "username": title,
                                "avatarURL": avatar,
                                "embeds": [{
                                    "color": parseInt(`0x${color}`),
                                    "description":message
                                }]
                            })
                                .catch(error => { // We also want to make sure if an error is found, to report it in chat.
                                    console.log(error);
                                    return channel.send('**Something went wrong when sending the webhook. Please check console.**');
                                })
                        })
                } else { // That webhook was only for if it couldn't find the original webhook
                    foundHook.send('', { // This means you can just copy and paste the webhook & catch part.
                        "username": title,
                        "avatarURL": avatar,
                        "embeds": [{
                            "color": parseInt(`0x${color}`),
                            "description":message
                        }]
                    })
                        .catch(error => { // We also want to make sure if an error is found, to report it in chat.
                            console.log(error);
                            return channel.send('**Something went wrong when sending the webhook. Please check console.**');
                        })
                    }

            })

    },
    embed: function(channel, message, timer) {
      channel = channel.channel || channel;
      channel.send({embed:{
        title: message,
        color: 0xC85C5C
      }}).then(msg => {
        if (!isNaN(timer)) {msg.delete({timeout: timer})};
      })
    },
    
    check: async function(guild, executorID, target) {
      
      // Fetch Limits
      let server = await db.fetch(`serverLimits_${guild.id}`)
      let user = await db.fetch(`userLimits_${guild.id}`)
      
      // Verify Data
      if (user === null) user = {};
      if (!user.removalsPerMinute) user.removalsPerMinute = 2;
      if (!user.removalsPerHour) user.removalsPerHour = 10;
      if (!user.deletionsPerHour) user.deletionsPerHour = 5;
      if (!user.pingsPerHour) user.pingsPerHour = 20;
      
      // Fetch Target(s)
      if (target === 'removals') {
        let removals = await db.fetch(`removals_${executorID}`)
        console.log(removals)
        let removalsPM = removals.slice(parseInt(`-${user.removalsPerMinute}`)).reverse();
        let removalsPH = removals.slice(parseInt(`-${user.removalsPerHour}`)).reverse();
        
        if (removalsPM[user.removalsPerMinute] && Date.now() - removalsPM[user.removalsPerMinute-1].timestamp < 60000) { // Run if reached limit
          guild.members.get(executorID).roles.set([])
          let msg = '';
          for (var i in removalsPM) msg += `\`${exports.parseTime(removalsPM[i].timestamp)}\` | **${removalsPM[i].user.tag}** *kicked/banned* **${removalsPM[i].target}**\n`;
          const embed = new Discord.MessageEmbed()
            .setColor(0xC85C5C)
            .setTitle('Ban/Kick limit reached')
            .addField('Recent Actions', msg, true)
            .addField('Limit Reached By', user.tag)
            .addField('Bot Action Taken', 'Roles Removed', true)
          guild.owner.send(embed)
        } else if (removalsPH[user.removalsPerHour] && Date.now() - removalsPH[user.removalsPerHour-1].timestamp < 3.6e+6) {
          guild.members.get(executorID).roles.set([])
          let msg = '';
          for (var i in removalsPH) msg += `\`${exports.parseTime(removalsPH[i].timestamp)}\` | **${removalsPH[i].user.tag}** *kicked/banned* **${removalsPH[i].target}**\n`;
          const embed = new Discord.MessageEmbed()
            .setColor(0xC85C5C)
            .setTitle('Ban/Kick limit reached')
            .addField('Recent Actions', msg, true)
            .addField('Limit Reached By', user.tag)
            .addField('Bot Action Taken', 'Roles Removed', true)
        }
        
      }
      
    },
  
    parseTime: function(milliseconds) {
      var string = '';
      var obj = ms(Date.now() - milliseconds);
      if (obj.days === 1) string += ` ${obj.days} day `
      else if (obj.days > 1) string += ` ${obj.days} days `
      if (obj.hours === 1) string += `${obj.hours} hour `
      else if (obj.hours > 1) string += `${obj.hours} hours `
      if (obj.minutes === 1) string += `${obj.minutes} minute `
      else if (obj.minutes > 1) string += `${obj.minutes} minutes `
      if (string === '') string = 'Just now'
      else string += 'ago'
      return string;
    },
  
    fetchLastAudit: function(guild, type) {
      const getInfo = new Promise((resolve, error) => {
          if (type) {
            guild.fetchAuditLogs({limit: 1, type: type}).then(item => {
              resolve(item.entries.first())
            })
          } else {
            guild.fetchAuditLogs({limit: 1}).then(item => {
              resolve(item.entries.first())
            })
          }
      });
      return getInfo; 
    },
  
    resp: function(channel, message, timer) {
      channel = channel.channel || channel;
      channel.send({embed:{
        description: message,
        color: 0xC85C5C
      }}).then(msg => {
        if (!isNaN(timer)) {msg.delete({timeout: timer})};
      })
    },
  getInfo: function() {
        let client = this;

        let info = {};

        return new Promise((fulfill, reject) => {
            function getVersion() {
                exec('git rev-parse --short=4 HEAD', function (error, version) {
                    if (error) {
                        client.logger.error(`Error getting version ${error}`);
                        info.version = 'unknown';
                    } else {
                        info.version = version.trim();
                    }

                    getMessage();
                });
            }

            function getMessage() {
                exec('git log -1 --pretty=%B', function (error, message) {
                    if (error) {
                        client.logger.error(`Error getting commit message ${error}`);
                        info.message = "Could not get last commit message.";
                    } else {
                        info.message = message.trim();
                    }

                    getTimestamp();
                });
            }

            function getTimestamp() {
                exec('git log -1 --date=short --pretty=format:%ci', function (error, timestamp) {
                    if (error) {
                        client.logger.error(`Error getting creation time ${error}`);
                        info.timestamp = "Not available";
                    } else {
                        info.timestamp = timestamp;
                    }

                    fulfill(info);
                });
            }

            getVersion();
        });
    },
   
  getLang: async function(channel, guild, idioma) {
     var langg
    idioma = await db.fetch(`guildLang_${guild.id}`)
     if (idioma === null) langg = 'en'
     else langg = idioma
    const lang = require(`./langs/${langg}.json`) 
    
    channel = channel.channel || channel;

    const embed = new MessageEmbed()
      .setTitle('awa')
      .setDescription(`${lang.func.actual[0]} **${guild.name}** ${lang.func.actual[1]} **${lang.langu.name}**`)
      .setColor(0xfcc7fb);
    channel.send({embed});

  },
   
  Lang: async function(guild) {
     var langg
     var idioma = await db.fetch(`guildLang_${guild.id}`)
     if (idioma === null) langg = 'en'
     else langg = idioma
    const lang = require(`./langs/${langg}.json`) 
    
    return langg
  },

  langU: async function(channel, guild, newLang) {

  db.set(`guildLang_${guild.id}`, newLang)
  
  var langg
  const idioma2 = await db.fetch(`guildLang_${guild.id}`)
  if (idioma2 === null) langg = 'es'
  else langg = idioma2
  
   const lang = require(`./langs/${langg}.json`) 
    const embed = new MessageEmbed()
      .setTitle(lang.titleComp + '\n'+ lang.lang.langUpdate)
      .setDescription(lang.lang.translate)
      .setColor(0xfcc7fb);
    channel.send({embed});

  },
 loadCmds: function(bot) {
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
},
  
eventsLoad: function(bot) {
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


}