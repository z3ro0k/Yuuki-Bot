

exports.run  = async (client, message, args, queue) => {
  
      const Canvas = require('canvas');
      const pixelUtil = require('pixel-util');
      var emoji;
      var mensagem;
      var porcentagem;
      var prc = Math.round(Math.random() * 100);
      
      function getDesenporc(por) {
        let desen = '[..........]'
        por = Math.round(por / 10)
        
        
        for (var i = 0; i < 10; i++) {
          if (i < por) {
            desen = desen.replace('.', '█')
          }
        }
        return desen
      }
      
      if (prc <= 10) {
        emoji = 'https://i.imgur.com/t9Jd3K9.png';
        porcentagem = "[█..........]";
        mensagem = `**No son nada compatible. Ni siquiera para amigos ... **`;
      } else  if (prc <= 20) {
        emoji = 'https://i.imgur.com/t9Jd3K9.png';
        porcentagem = "[██.........]";
        mensagem = `**No parece ser muy compatibles ustedes. Quizás una simple amistad basta.**`;
      } else if (prc <= 40) {
        emoji = 'https://i.imgur.com/Y7GwywE.png';   
        porcentagem = "[████.......]";
        mensagem = `**Normal. Es más probable que se queden como amigos.**`;
      } else if (prc <= 60) {
        emoji = 'https://i.imgur.com/Y7GwywE.png';   
        porcentagem = "[██████.....]";
        mensagem = `**Podría surgir algo entre ustedes. Pero es posible que queden como mejores amigos.**`;
      } else if (prc <= 80) {
        emoji = 'https://i.imgur.com/ycSpTIh.png';  
        porcentagem = "[████████...]";
        mensagem = `**Son compatibles, en verdad es casi seguro que surga algo entre ustedes.**`;
      } else if (prc <= 99) {
        emoji = 'https://i.imgur.com/Y7GwywE.png';   
        porcentagem = "[██████████.]";
        mensagem = `**Perfectamente ustedes podrían ser novios. Inténtelo.**`;
      } else {
        emoji = 'https://i.imgur.com/Fv8Irk0.png';
        porcentagem = "[███████████]";
        mensagem = `**¡Relación perfecta! Son altamente compatibles y es seguro que terminarán casados en un futuro.**`;
      }
      
      
      
      if (message.author.bot) return
      if (message.mentions.users.size < 1) return message.reply('Debes mencionar a 2 usuarios para calcular el porcentaje de amor entre ellos.');
      if (message.mentions.users.array().length < 2) {
        var user1 = message.author, user2 = message.mentions.users.array()[0]
      } else {
        var user1 = message.mentions.users.array()[1], user2 = message.mentions.users.array()[0]
      }
      
      var Image = Canvas.Image,
            canvas = new Canvas(660, 220),
            ctx = canvas.getContext('2d');
      
      canvas.jpegStream({
        quality: 100
      });
      
      pixelUtil.createBuffer(user1.displayAvatarURL()).then(img1 => {
        let img = new Image;
        img.src = img1;
        ctx.drawImage(img1, 0, 0, 220, 220);
        
        pixelUtil.createBuffer(emoji).then(img1 => {
          let img = new Image;
          img.src = img1;
          ctx.drawImage(img1, 240, 20, 180, 180);
          
          pixelUtil.createBuffer(user2.displayAvatarURL()).then(img1 => {
            let img = new Image;
            img.src = img1;
            ctx.drawImage(img1, 440, 0, 220, 220);    
    
            message.channel.send(`${message.author} \nㅤ\n**${prc}** % ${porcentagem} \n${mensagem}`, {file: {attachment: canvas.toBuffer(), name: 'ship.png'}})
          })
        })
      })
}

module.exports.config = {
    command: "ship",
    aliases: ["ship"],
    description: " ",
    usage: " ",
    category: 'Fun'
}