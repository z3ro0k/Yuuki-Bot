const Discord = require('discord.js');
 var request = require("request");
exports.run = async (client, msg) => {

 const dbotstoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM2NTk0OTc4ODgwNzc1NzgzNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTE0OTM5ODc3fQ.QFcaSEfNHj3l6VTegWbi5w7Vz52KqikAdt4KUlVvy4Y";
 const ms = require('ms');
 const channel = client.guilds.get('429454504639856664').channels.get('429468069769904139');
 const feedback = msg.content.split(' ').slice(1).join(' ');
 const avatar = client.users.get('322203879208910849').avatarURL({ format: 'png', size: 2048 });
 const user = client.users.get('322203879208910849').tag     
    var options = {
                method: 'GET',
                url: `https://discordbots.org/api/bots/${client.user.id}/votes?onlyids=1`,
                json: true,
                headers: {
                   Authorization: `${dbotstoken}`
                }
            };  
  request(options, function(error, response, body) {
   
  if (!feedback) return msg.channel.send(`Requiero retroalimentación. Por favor, di algo sobre mí :D`);
      
  var feedbackE = new Discord.MessageEmbed()
    .setTitle(msg.author.tag + ' suggested:')
    .setColor(0x36393E)
    .setThumbnail(msg.author.displayAvatarURL())
    .setDescription(feedback)
    .addField('User\'s ID:', `${msg.author.id}`)
    .addField('Server:', `${msg.guild.name} [${msg.guild.id}]`, true)
    .addField('Channel:', `${msg.channel.name} [${msg.channel.id}]`, true);
      
  var notUpvoter = new Discord.MessageEmbed()
    .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
    .setURL('https://discordbots.org/bot/365949788807757834')
    .setColor(0x36393E)
    .addField("No has subestimado al Bot de Yuuki!", "Mis desarrolladores lo han hecho para que sólo los votantes puedan usar la retroalimentación!")
    .addField("Vota Aqui:", "https://discordbots.org/bot/365949788807757834")
    .setFooter(`Mi desarollador principal es, ${user} hizo el deseo ejecutivo de hacer esto!!`, avatar);

let id = body.map(u => u.id)

  if (!id.includes(msg.author.id)) {
    msg.channel.send({embed: notUpvoter});
  } else {
    channel.send({embed: feedbackE}).then(msg.channel.send("Thank you for your Feedback!"));
  }
  //console.log(body)
  })
};

exports.conf = {
    name: 'feedback',
     aliases: [],
    description: "You can give the devs your feedback on the bot! And suggest new things for it! [upvoter only]",
    usage: "",
    usageDelim: ""
};

