const Discord = require("discord.js");
const apis = require("./data/apis.json");
const config = require("./botconfig");

const bot = new Discord.Client({
  owner: config.IdOwner,
  disableEveryone: true,
  invite: config.supportServer,
  author: config.ownerName
});

const idioticApi = require("idiotic-api");
const db = require("quick.db");

/*global Set, Map*/
const queue = new Map();

bot.config = require("./botconfig");

bot.tools = require("./functions.js");

bot.tools.loadCmds(bot);
bot.tools.eventsLoad(bot);

bot.ownerID = config.IdOwner;
bot.color = 0xfcc7fb;
bot.idiotAPI = new idioticApi.Client(apis.idioticApi, { dev: true });

bot.on("message", async message => {
  if (message.channel.type != "text") return;

  var prefixx = await bot.tools.GuildPrefix(message.guild);

  const mentionPrefix = new RegExp(`^<@!?${bot.user.id}> `).exec(message.content);
  const prefixes = ["yuuki ", `${mentionPrefix}`, prefixx];
  let prefix = false;

  for (const i of prefixes) {
    if (message.content.startsWith(i)) prefix = i;
  }

  if (!prefix) return;

  var sender = message.author;
  var msg = message.content.toLowerCase();

  var cont = message.content.slice(prefix.length).split(" ");
  var args = cont.slice(1);

  if (!message.content.startsWith(prefix)) return;
  
  var cmd = bot.commands.get(cont[0].toLowerCase()) || bot.commands.get(bot.aliases.get(cont[0].toLowerCase()));
  if (cmd) cmd.run(bot, message, args, queue);
  
});

bot.login(bot.config.token);

