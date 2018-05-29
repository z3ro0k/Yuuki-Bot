exports.run = (bot, message, args, func) => {
   if(message.author.id !== '322203879208910849') return message.reply("I'm sorry, but this command is only for the developer.")

    if (!args.join(' ')) {
      message.channel.send(`:x: Provide a command name to reload.`);
      return;
    }
    delete require.cache[require.resolve(`./${args[0]}.js`)];
    message.channel.send(`<a:update:413263871365611520> The command \`${args[0]}\` has been reloaded!`).catch(e => {
    message.channels.send(`The command \`${args[0]}\` `)
    })
}
module.exports.config = {
  command: "r"
}