const Discord = require('discord.js')

exports.run = async (bot, message, args ) => {
let razon = args.join(' ');
let msg = args.join(' ')
var snekfetch = require('snekfetch');

  let [title, contents] = args.join(' ').split(" | ")
  if(!contents) {
    [title, contents] = ["Achievement Get!", title];
  }
  let rnd = Math.floor((Math.random() * 39) + 1);
  if(args.join(' ').toLowerCase().includes("burn")) rnd = 38;
  if(args.join(' ').toLowerCase().includes("cookie")) rnd = 21;
  if(args.join(' ').toLowerCase().includes("cake")) rnd = 10;

  if (!args.join(' ')) {
      message.channel.send('Porfavor pon algo para transformarlo a un achievement');
      return
      }
  if(title.length > 22 || contents.length > 22) return message.channel.send("Max Length: 22 Characters. Soz.").then(message.delete.bind(message), 2000);
  const url = `https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`;
  snekfetch.get(url)
   .then(r=>message.channel.send("", {files:[{attachment: r.body}]}));
  message.delete();

}
exports.config = {
  command: "mc",
  aliases: ['mcc', 'Achievement'],
  category: "fun",
  description: "creas un Achievement de maincraft",
  usage: "Yu!mc cookie"
};