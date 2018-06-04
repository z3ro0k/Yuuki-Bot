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
    
  },
  calcUptime: function(channel, message) {
    channel = channel.channel || channel; 
    
    var time = 0;
    var days = 0;
    var hrs = 0;
    var min = 0;
    var sec = 0;
    var temp = Math.floor(bot.uptime / 1000);
    sec = temp % 60;
    temp = Math.floor(temp / 60);
    min = temp % 60;
    temp = Math.floor(temp / 60);
    hrs = temp % 24;
    temp = Math.floor(temp / 24);
    days = temp;
    var dayText = " days ";
    if (days == 1) {
        dayText = " day ";
    }
	
	var upText = "Uptime: `" + days + dayText + hrs + ":" + min + ":" + sec + "`";
	channel.send({embed:{ 
      description: upText, 
      color: 0x36393e
    }})
    return upText;
}
  }