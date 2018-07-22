const Discord = require('discord.js'),
      tools = require('../functions.js')
const db = require('quick.db')

exports.run = async (bot, message, args ) => {
message.channel.send(calcUptime())

  function calcUptime() {
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
	
    return upText;
}
}
exports.config = {
  command: "uptime",
  aliases: ['uptime', 'calcU']
}
