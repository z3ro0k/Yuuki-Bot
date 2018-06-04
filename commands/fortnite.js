const Discord = require('discord.js')
const key = require('../data/apis.json')
const Client = require('fortnite')
const fortnite = new Client(key.FORTNITE)

exports.run = async (bot, message, args) => {
  await message.delete();
  if(message.author.id != "322203879208910849") return;
  let username = args[0];
  let platform = args[1] || "pc";
  
  if(!username) return message.reply('**please provide a username.**')
  
  let data = fortnite.user(username, platform).then(data => {
    
    let stats = data.stats;
    let lifetime = stats.lifetime;
    console.log(lifetime)
    let top3 = lifetime[0]['Top 3'];
    let top5s = lifetime[1]['Top 5s'];
    let top6s = lifetime[3]['Top 6s'];
    let top12s = lifetime[4]['Top 12s'];
    let top25s = lifetime[5]['Top 25s'];
    let Score = lifetime[6]['Score'];
    let Mplayed = lifetime[7]['Matches Played'];
    let Wins = lifetime[8]['Wins'];
    let winsperm = lifetime[9]['Win%'];
    let kills = lifetime[10]['Kills']; 
    let Ratio = lifetime[11]['K/d']
    
    const embed = new Discord.MessageEmbed()
        .setColor(0x36393e)
        .setTitle(`Stats for ${data.username}`)
        .setDescription(`**Top Placement**\n\n\`\`\`tex Top 3s: ${top3}\nTop 5s: ${top5s}\nTop 6s: ${top6s}\nTop 12s: ${top12s}\nTop 25s: ${top25s}\`\`\``, true)
        .setThumbnail("https://vignette.wikia.nocookie.net/fortnite/images/d/d8/Icon_Founders_Badge.png")
        
        .addField('Total Score', Score, true)
        .addField('Matches Played', Mplayed, true)
        .addField('Wins', Wins, true)
        .addField('Win Percentage', winsperm, true)
        .addField('Kills', kills, true)
        .addField('K/D Ratio', Ratio, true)

        
        message.channel.send({embed: embed})
    
  });
  
};
exports.config = {
  command: "fortnite",
  aliases: ["fortnite", "fort"]
};