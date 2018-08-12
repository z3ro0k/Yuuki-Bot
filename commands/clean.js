const Discord = require('discord.js')
const db = require('quick.db')

const ImageRegex = /(?:([^:/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*\.(?:png|jpe?g|gifv?|webp|bmp|tiff|jfif))(?:\?([^#]*))?(?:#(.*))?/gi;
const LinkRegex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

exports.run = async (bot, message, args) => {
    var prefix =  await bot.tools.GuildPrefix(message.guild) 
    
let messageCount = parseInt(args.join(' '));

var perms = message.member.hasPermission("MANAGE_MESSAGES");
if(!perms) return message.channel.send(":x: |  No tienes permisos suficientes para ejecutar este comando.");

//const { count, type } = args.join(' ').sli
 let msg =  message.content.slice(prefix.length).trim().split(" ");
 let count = msg[0]
 let type = msg[1] || "all"
  
  if(!count) {
    message.channel.send(`Please provide me a set number of messages to prune!`)
    return;
  
  }
  
  if (['all', 'images', 'pics', 'image', 'bots', 'bot', 'codeblocks', 'code', 'attachments', 'attachment', 'files', 'file', 'embeds', 'embed', 'me', 'links', 'link'].includes(base.toLowerCase())) {
    message.channel.send(`Please provide me a set number of messages to prune!`)
    return;
  
  }
  
  
        if (type == 'all') {
            try {
                const messages = await message.channel.messages.fetch({ limit: count });
                await message.channel.bulkDelete(messages.size, true);
                return message.channel.send(`🍇 | **${message.author.username}**, successfully pruned ${messages.size} ${messages.size == 1 ? 'message!' : 'messages!'}`)

            } catch (err) {
                console.log(err)
                return message.channel.send('❎ | These messages are too old to be deleted! I can only delete messages within two weeks!');

            }
        }

        if (type == 'images' || type == 'pics' || type == 'image') {
            try {
                const messages = await message.channel.messages.fetch({
                    limit: count,
                    before: message.id
                })

                const attachments = messages.filter(m => ImageRegex.test(m.content))
                const urls = messages.filter(m => m.attachments.size > 0)

                const flushable = attachments.concat(urls)

                if (flushable.size == 0) return message.channel.send(`🍇 | **${message.author.username}**, there were no images to prune in the last ${count} messages!`);

                await message.channel.bulkDelete(flushable)

                const m = await message.channel.send(`🍇 | **${message.author.username}**, successfully pruned **${flushable.size}** ${flushable.size == 1 ? 'image!' : 'images!'}`);

                return null;
            } catch (err) {
                console.log(err)
                return message.channel.send('❎ | These messages are too old to be deleted! I can only delete messages within two weeks!');

            }

        }

        if (type == 'bots' || type == 'bot') {
            try {
                const messages = await message.channel.messages.fetch({
                    limit: count,
                    before: message.id
                })
                const flushable = messages.filter(m => m.author.bot)
                await message.channel.bulkDelete(flushable)
                if (flushable.size == 0) return message.channel.send(`🍇 | **${message.author.username}**, there were no bot messages to prune in the last ${count} messages!`)

                const m = await message.channel.send(`🍇 | **${message.author.username}**, successfully pruned **${flushable.size}** ${flushable.size == 1 ? 'bot message!' : 'bot messages!'}`);

                return null;

            } catch (err) {
                console.log(err)
                return message.channel.send('❎ | These messages are too old to be deleted! I can only delete messages within two weeks!');

            }
        }

        if (type == 'codeblocks' || type == 'code') {
            try {
                const messages = await message.channel.messages.fetch({
                    limit: count,
                    before: message.id
                })
                const flushable = messages.filter(m => m.content.startsWith('```'));

                if (flushable.size == 0) return message.channel.send(`🍇 | **${message.author.username}**, there were no codeblocks to prune in the last ${count} messages!`);

                await message.channel.bulkDelete(flushable)
                const m = await message.channel.send(`🍇 | **${message.author.username}**, successfully pruned **${flushable.size}** ${flushable.size == 1 ? 'codeblock!' : 'codeblocks!'}`);

                return null;

            } catch (err) {
                console.log(err)
                return message.channel.send('❎ | These messages are too old to be deleted! I can only delete messages within two weeks!');

            }
        }

        if (type == 'attachments' || type == 'attachment' || type == 'files' || type == 'file') {
            try {
                const messages = await message.channel.messages.fetch({
                    limit: count,
                    before: message.id
                })
                const flushable = messages.filter(m => m.attachments.length > 0)
                if (flushable.size == 0) return message.channel.send(`🍇 | **${message.author.username}**, there were no attachments to prune in the last ${count} messages!`);

                await message.channel.bulkDelete(flushable)
                const m = await message.channel.send(`🍇 | **${message.author.username}**, successfully pruned **${flushable.size}** ${flushable.size == 1 ? 'attachment!' : 'attachments!'}`);

                return null;

            } catch (err) {
                console.log(err)
                return message.channel.send('❎ | These messages are too old to be deleted! I can only delete messages within two weeks!');

            }
        }

        if (type == 'embeds' || type == 'embed') {
            try {
                const messages = await message.channel.messages.fetch({
                    limit: count,
                    before: message.id
                })
                const flushable = messages.filter(m => m.embeds.length > 0)
                if (flushable.size == 0) return message.channel.send(`🍇 | **${message.author.username}**, there were no embeds to prune in the last ${count} messages!`);

                await message.channel.bulkDelete(flushable)
                const m = await message.channel.send(`🍇 | **${message.author.username}**, successfully pruned **${flushable.size}** ${flushable.size == 1 ? 'embed!' : 'embeds!'}`);

                return null;

            } catch (err) {
                console.log(err)
                return message.channel.send('❎ | These messages are too old to be deleted! I can only delete messages within two weeks!');

            }
        }

        if (type == 'me') {
            try {
                const messages = await message.channel.messages.fetch({
                    limit: count,
                    before: message.id
                })
                const flushable = messages.filter(m => m.id == message.author.id)
                if (flushable.size == 0) return message.channel.send(`🍇 | **${message.author.username}**, there were no messages from you to prune in the last ${count} messages!`);

                await message.channel.bulkDelete(flushable)
                const m = await message.channel.send(`🍇 | **${message.author.username}**, successfully pruned **${flushable.size}** of your messages!`);

                return null;

            } catch (err) {
                console.log(err)
                return message.channel.send('❎ | These messages are too old to be deleted! I can only delete messages within two weeks!');

            }
        }

        if (type == 'link' || type == 'links') {
            try {
                const messages = await message.channel.messages.fetch({
                    limit: count,
                    before: message.id
                })
                const flushable = messages.filter(m => LinkRegex.test(m.content))
                if (flushable.size == 0) return message.channel.send(`🍇 | **${message.author.username}**, there were no links to prune in the last ${count} messages!`);

                await message.channel.bulkDelete(flushable)
                const m = await message.channel.send(`🍇 | **${message.author.username}**, successfully pruned **${flushable.size}** ${flushable.size == 1 ? 'link!' : 'links!'}`);

                return null;

            } catch (err) {
                console.log(err)
                return message.channel.send('❎ | These messages are too old to be deleted! I can only delete messages within two weeks!');

            }
        }
}

exports.config = {
  command: "clean",
  aliases: ["limpiar", "purgar"],
  category: "mod",
  description: "Limpia una cantidad de mensajes",
  usage: "Yu!clean"
};