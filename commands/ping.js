module.exports.run = async (bot, message, args) => {

  message.channel.send({embed:{ 
      title: "Ping",
      description:"pong!",
      color: 0x12a589
  }})
  
}

module.exports.config = {
  command: "ping"
}