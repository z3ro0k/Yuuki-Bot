module.exports.run = async (bot, message, args) => {

  message.channel.send({embed:{ 
      title: "Ping",
      description:"pong! **" + message.author.username + "**"
  }})
  
}

module.exports.config = {
  command: "ping"
}