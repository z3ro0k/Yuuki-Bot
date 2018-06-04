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
    console.log(top3)
    let Score
    
  });
  
};
exports.config = {
  command: "fortnite",
  aliases: ["fortnite", "fort"]
};