const Discord = require('discord.js')
const db = require('quick.db')

const ImageRegex = /(?:([^:/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*\.(?:png|jpe?g|gifv?|webp|bmp|tiff|jfif))(?:\?([^#]*))?(?:#(.*))?/gi;
const LinkRegex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

exports.run = async (bot, message, args) => {
    //var prefix =  await bot.tools.GuildPrefix(message.guild) 
    
var perms = message.member.hasPermission("MANAGE_MESSAGES");
if(!perms) return message.channel.send(":x: |  No tienes permisos suficientes para ejecutar este comando.");

 
	if(!message.content.split(" ")[1]) return false;
	if(!Number.isInteger(Number(message.content.split(" ")[1]))) return false;
	let count = Number(message.content.split(" ")[1]);
	if(count < 2) return false;
	if(count > 99) count = 99;
	message.delete();
	message.channel.bulkDelete(count + 1, true).then(
		//message.channel.send(`:ok_hand: ${message.content.split(" ")[1]} messages has been deleted.`)
    message.channel.send(`🍇 | **${message.author.username}**, successfully pruned ${message.content.split(" ")[1]} ${message.content.split(" ")[1] == 1 ? 'message!' : 'messages!'}`)
	).catch(err => {
		if(err.code === 10008) {
			return message.channel.send(":x: - Un bot sólo puede borrar mensajes que tengan menos de 14 días de antigüedad.");
		} else {
			return console.log(err, "error");
		}
	});
	return true;
};

exports.config = {
  command: "clean",
  aliases: ["limpiar", "purgar"],
  category: "mod",
  description: "Limpia una cantidad de mensajes",
  usage: "Yu!clean"
};