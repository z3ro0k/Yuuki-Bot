const google = require("google");
const Discord = require("discord.js");
const blacklist = require('../utils/blacklist.json');

exports.run = (bot, message, args) => {
    if (blacklist[message.author.id]) {
        message.channel.send("Im sorry, but you are blacklisted from using this command due to searching up pornography!")
        return;
    }
    
    google.resultsPerPage = 25
    let object = args;
    google.protocol = 'https';
    
    const args2 = message.content.split(' ').slice(1).join(' ');
    
    if(!args2) {
            var embed = new Discord.RichEmbed()
             		.setTitle("ERROR!")
             		.setColor(0x36393e)
             		.setDescription("No term(s) was found for me to search!")
             		.setFooter("Powered By Google", "http://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1000px-Google_%22G%22_Logo.svg.png")
             		
             		message.channel.send({embed : embed});
             		    return;
        }

        
    google(object, function (err, res){
        if (err) console.error(err)
        
        
        var link = res.links[1];
        var link2 = res.links[2];
        var link3 = res.links[3];
        var link4 = res.links[4];
        let test = `${link.title}\n${link.href}`;
        let test2 = `${link2.title}\n${link2.href}`;
        let test3 = `${link3.title}\n${link3.href}`;
        let test4 = `${link4.title}\n${link4.href}`
        
        if(!link.title || link.title == undefined || link.title == null) {
            test = "Nothing Found, Sorry";
        }
        
        if(!link2.title || link2.title == undefined || link2.title == null) {
            test2 = "Nothing Found, Sorry";
        }
        
        if(!link3.title || link3.title == undefined || link3.title == null) {
            test3 = "Nothing Found, Sorry";
        }
        
        if(link.link == null) {
            test = "Nothing Found, Sorry";
        }
        
        if(link2.link == null) {
            test2 = "Nothing Found, Sorry";
        }
        
        if(link3.link == null) {
            test3 = "Nothing Found, Sorry";
        }
      if(link4.link == null) {
            test4 = "Nothing Found, Sorry";
        }
        const log = bot.channels.get("417156325995315211")
                var blacklisted = ["porn", "sex", "gay porn", "pussy", "dick", "vagina", "penis", "incest", "loli", "lesbian porn", "pornhub", "xxvideos", "xrated", "exclipt", "x-rated", "moan", "masturbat", "condom", "dildo", "fingering", "tribbing", "oraljob", "blowjob", "anal", "fuck", "hentai", "rule34", "r34", "shit", "sh1t", "knobend", "knob end", "cock", "blow job", "boob", "cunt", "labia", "nigger", "nigga", "twat", "whore"]
        if (blacklisted.some(word => args2.toLowerCase().includes(word) && !message.channel.nsfw)) {
            message.delete()
            const embed = new Discord.MessageEmbed()
            .setColor(0x36393e)
            .setFooter("This was sent into your DM's cause it included a blacklisted word, if you searched up something that doesn't seem like it should be blacklisted and does NOT include any blacklisted words, Ex. `Analysis` includes `Anal`, please let us know")
            .setAuthor("Search Results", `http://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1000px-Google_%22G%22_Logo.svg.png`)
            .addField("Result 1", test)
            .addField("Result 2", test2)
            .addField("Result 3", test3)
            .addField("Result 4", test4)
            .setTimestamp()
            .setThumbnail('https://cdn3.iconfinder.com/data/icons/picons-social/57/09-google-128.png')
            message.author.send({embed});
            
            const embed2 = new Discord.MessageEmbed()
            .setTitle(":warning: Google Command DANGER! :warning:")
            .setColor(0x36393e)
            .setTimestamp()
            .addField(":eyes: Someone used the Google Command to search up something bad! :eyes:", "Hopefully this was a mis-understanding!")
            .addField(":mag: What they searched up :mag:", `***__${args2}__***`)
            .addField(":man: Message Author :woman:", `***__${message.author.tag}__***`)
            .addField(":id: User ID :id:", `***__${message.author.id}__***`)
            .addField("👥 Guild They sent it In 👥", `***__${message.guild.name}__***`)
            .addField(":prince: Guild Owner :princess:", `***__${message.guild.owner.user.tag}__***`)
            .addField("If they did this too many times...", "Do pr!gblacklist [ID] to blacklist them!")
            log.send({embed: embed2})
            return;
        } 
        
        const embed = new Discord.MessageEmbed()
           .setColor(0x36393e)
            .setAuthor("Search Results", `http://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1000px-Google_%22G%22_Logo.svg.png`)
            .addField("Result 1", test)
            .addField("Result 2", test2)
            .addField("Result 3", test3)
            .addField("Result 4", test4)
            .setTimestamp()
            .setThumbnail('https://cdn3.iconfinder.com/data/icons/picons-social/57/09-google-128.png')
            message.channel.send({embed})
            
            const embed2 = new Discord.MessageEmbed()
            .setTitle("Google Command")
            .setColor(0x36393e)
            .setTimestamp()
            .setThumbnail(message.author.displayAvatarURL())
            .addField(":eyes: Someone used the Google Command! :eyes:", "Sending this just to make sure they didnt bypass the filter!")
            .addField(":mag: What they searched up :mag:", `***__${args2}__***`)
            .addField(":man: Message Author :woman:", `***__${message.author.tag}__***`)
            .addField(":id: User ID :id:", `***__${message.author.id}__***`)
            .addField("👥 Guild They sent it In 👥", `***__${message.guild.name}__***`)
            .addField(":prince: Guild Owner :princess:", `***__${message.guild.owner.user.tag}__***`)
            log.send({embed : embed2})
    })
}
exports.config = {
  command: "google",
  aliases: ["google", "gsearch"]
}