const key = require('../data/apis.json')
const Client = require('fortnite')
const fortnite = new Client(key.FORTNITE)

exports.run = async (bot, message, args) => {
  await message.delete();
  if(message.author.id != "") return;
  let username = args[0];
  let platform = args[1] || "pc";
  
  if(!username) return message.reply('**please provide a username.**')
  
  let data = fortnite.user(username, platform).then(data => {
    console.log(data)
  });
  
};
exports.config = {
  command: "fortnite",
  aliases: ["fortnite", "Fort"]
};