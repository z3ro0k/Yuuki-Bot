const db = require('quick.db');
const Discord = require('discord.js');
const ms = require('parse-ms');

module.exports = { // This basically works like every normal package you use.

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
  
    pages: function(message, pages, config) {
      
      let page = 1;
  
    const embed = new Discord.MessageEmbed()
      .setColor(0xffffff)
      .setFooter(`Page ${page} of ${pages.length}`)
      .setDescription(pages[page-1])

    message.channel.send(embed).then(msg => {
      
      msg.react('⏪').then( r => {
        msg.react('⏩')
        
        // Create Filters
        const backwardsFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
        const forwardsFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;
        
        const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 });
        const forwards = msg.createReactionCollector(forwardsFilter, { time: 60000 });
        
        backwards.on('collect', r => {
          if (page === 1) return;
          page--;
          embed.setDescription(pages[page-1])
          embed.setFooter(`Page ${page} of ${pages.length}`)
          msg.edit(embed)
        });
        
        forwards.on('collect', r => {
          if (page === pages.length) return;
          page++;
          embed.setDescription(pages[page-1])
          embed.setFooter(`Page ${page} of ${pages.length}`)
          msg.edit(embed)
        });
        
      })
      
    })
      
    },
  
    setChannels: function(message) {
      
       const embed = new Discord.MessageEmbed()
        .setColor(0x1db954)
        .setTitle('Optional Channels')
        .setDescription('**Want to join a channel? Type:**\n`~join #`\n\n**To leave, type the following in the channel:**\n`~leave`')
       
       let joinList = [];
       setTimeout(function() {
       db.fetchArray(`officialChannels_${message.guild.id}`).then(o => {
         let officialChannels = '';
         o.shift()
         let index = o.length;
         for (var i = 0; i < o.length; i++) {
          joinList.push(o[i])
          officialChannels += `**${i+1}** [❱](https://discord.io/plexidev) ${message.guild.channels.get(o[i]).name.charAt(0).toUpperCase() + message.guild.channels.get(o[i]).name.slice(1).replace('nsfw', 'NSFW')}`
          //if (message.guild.channels.get(o[i]).topic) officialChannels += ` **-** ${message.guild.channels.get(o[i]).topic}`
          officialChannels += '\n\n'
         }
         if (o.length > 0) embed.addField('Official Channels', officialChannels,true);
         db.fetchArray(`publicChannels_${message.guild.id}`).then(p => {
           let publicChannels = '';
           p.shift()
           for (var i = 0; i < p.length; i++) {
            joinList.push(p[i])
            publicChannels += `**${i+1+index}** [❱](https://discord.io/plexidev) ${message.guild.channels.get(p[i]).name.charAt(0).toUpperCase() + message.guild.channels.get(p[i]).name.slice(1).replace('nsfw', 'NSFW')}`
            //if (message.guild.channels.get(p[i]).topic) publicChannels += ` **-** ${message.guild.channels.get(p[i]).topic}`
            publicChannels += '\n\n'
           }
           if (p.length > 0) embed.addField('Community Channels', publicChannels,true);
           embed.setFooter('Have an idea for an optional channel? Message a staff member!')
           message.guild.channels.get('409922524948987924').messages.fetch('412707175950057474').then(msg => msg.edit(embed));
           db.setArray(`joinList_${message.guild.id}`, joinList)
         })
       })
         
       },100)

    }
  
}