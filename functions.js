const Discord = require('discord.js');
const bot = new Discord.Client();

module.exports = { 
  
  ping: function() { 
    
    return 'Hello!'; 
    
  },
  
  embed: function(channel, message, timer) { 
    
    channel = channel.channel || channel; 
    
    channel.send({embed:{ 
      description: message, 
      color: 0x36393e
    }}).then(msg => { 
      if (!isNaN(timer)) msg.delete({timeout: timer}); 
    });
    
  }
  }