 const Discord = require('discord.js');
const math = require('math-expression-evaluator');


exports.run = (bot, message, args) => {
  let categories = []; // Lets define categories as an empty array so we can add to it.

          // We want to make it so that if the item is not specified it shows a list of items
          if (!args.join(" ")) { // Run if no item specified...

              // First, we need to fetch all of the categories.
              for (var i in items) { // We can do this by creating a for loop.

                  // Then, lets push the category to the array if it's not already in it.
                  if (!categories.includes(items[i].type)) {
                      categories.push(items[i].type)
                  }

              }

              // Now that we have the categories we can start the embed
              const embed = new Discord.RichEmbed()
                  .setDescription(`Available Items`)
                  .setColor(0xD4AF37)

              for (var i = 0; i < categories.length; i++) { // This runs off of how many categories there are. - MAKE SURE YOU DELETE THAT = IF YOU ADDED IT.

                  var tempDesc = '';

                  for (var c in items) {
                      if (categories[i] === items[c].type) {

                          tempDesc += `${items[c].name} - $${items[c].price} - ${items[c].desc}\n`; // Remember that \n means newline

                      }

                  }


                  embed.addField(categories[i], tempDesc);

              }

              return message.channel.send({
                  embed
              });

          }

          let itemName = '';
          let itemPrice = 0;
          let itemDesc = '';

          for (var i in items) {
              if (args.join(" ").trim().toUpperCase() === items[i].name.toUpperCase()) { // If item is found, run this...
                  itemName = items[i].name;
                  itemPrice = items[i].price;
                  itemDesc = items[i].desc;
              }
          }


          if (itemName === '') {
              return message.channel.send(`**Item ${args.join(" ").trim()} not found.**`)
          }


          economy.fetchBalance(message.author.id + message.guild.id).then((i) => { // Lets fix a few errors - If you use the unique guild thing, do this.
              if (i.money <= itemPrice) { // It's supposed to be like this instead...

                  return message.channel.send(`**You don't have enough money for this item.**`);
              }

              economy.updateBalance(message.author.id + message.guild.id, parseInt(`-${itemPrice}`)).then((i) => {

                  message.channel.send('**You bought ' + itemName + '!**');


                  if (itemName === 'support Role') {
                      message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", "support")); // For example, when they buy the support role it will give them the helper role.
                  }

              }) 