const osu = require("node-osu");
const osuApi = new osu.Api('73c795727fcbb1169f1df8ed8b3f7c51c2282a08');
const Discord = require('discord.js')
exports.run = async (bot, message, args) => {
    function numberWithCommas(x) {
        const parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }
  
    osuApi.getUser({u: args.join(" ")}).then(user => {
        const pais = user.country;
        message.channel.startTyping();
        const embed = new Discord.MessageEmbed()
   .setAuthor( user.name + " profile", "https://a.ppy.sh/"+ user.id)
   .setThumbnail("https://a.ppy.sh/"+ user.id)     
   .addField("Global Ranking", "#"+user.pp.rank, true)
   .addField("Local Ranking", "#"+user.pp.countryRank+" :flag_"+pais.toLowerCase()+":", true)
   .addField("Performance Points", Math.round(user.pp.raw)+"pp", true)
   .addField("Ranks", ":regional_indicator_s::regional_indicator_s: "+user.counts.SS+" :regional_indicator_s: "+user.counts.S+" :regional_indicator_a: "+user.counts.A, true)
   .addField("Ranked Points", numberWithCommas(user.scores.ranked), true)
   .addField("Total Points", numberWithCommas(user.scores.total), true)
   .addField("Level", Math.round(user.level), true)
   .addField("Play Counts",  user.counts.plays, true)
   .addField("Aim", user.accuracyFormatted, true)
   .setColor(0x36393e)   
   .setImage(`https://lemmmy.pw/osusig/sig.php?colour=hexff66aa&uname=${user.name}&pp=1&countryrank&onlineindicator=undefined&xpbar`)
        message.channel.send({ embed: embed })
        
        message.channel.stopTyping()
        
    }).catch (error => {
        message.channel.send({
            embed: {
                title: "ERROR!",
                color: 0xE50000,
                description: `The username **${args[0]}** was not found`
            }
        })
    });
  
}
module.exports.config = {
  command: "osu",
  aliases: ['osuser']
}