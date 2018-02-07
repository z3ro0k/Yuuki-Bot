module.exports.run = async (bot, message, args) => {

  if (message.channel.id === '410604743296286731') {
    if (isNaN(message.content)){
        message.delete();
          message.author.send('Porfavor solo numeros manda en el canal <#410604743296286731>, Gracias!')      
        }
       
      }
  
}

module.exports.config = {
  command: "delete"
}