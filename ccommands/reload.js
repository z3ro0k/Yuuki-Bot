module.exports.run = async (bot, msg, args) => {

    if (msg.author.id !== bot.options.owner) return msg.channel.send('Sorry, only the owner can use this command.');

    try {
        if (!args. || args.size < 1) return msg.channel.send("Must provide a command name to reload.");
        let command = args[0]
        delete require.cache[require.resolve(`./${command}`)]; // delete
        const cmd = require(`./${command}`); // require
        bot.commands.delete(command); // delete from cache
        cmd.config.aliases.forEach(alias => {
            // delete aliases
            bot.aliases.delete(alias, cmd.config.command);
        });
        bot.commands.set(cmd.config.command, cmd); //set the thing
        cmd.conf.aliases.forEach(alias => {
            //set aliases
            bot.aliases.set(alias, cmd.config.command);
        });
    } catch (e) {
        return msg.channel.createMessage(`Unable to reload: ${args[0]} because ` + e);
    }

    msg.channel.createMessage(`Successfully reloaded: ${args[0]}`);

}
exports.config = {
  command: "reload",
  aliases: ["reload"],
  category: "dev",
  description: "reloads a command",
  usage: "reload [commmand]"
};