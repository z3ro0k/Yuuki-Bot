const cfg = require("../botconfig.js");
const Discord = require('discord.js');
const key = "AIzaSyDkW5hixZ8W3nS59aFw52-qk0V_wc00Dis";
const fs = require("fs");
const moment = require("moment");
const yt = require("ytdl-core");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube(key);
const opus = require("opusscript");
const gyp = require("node-gyp");
var fetchVideoInfo = require('youtube-info');

exports.run = async (music, message, args, queue) => {
    const args1 = message.content.split(' ');
    const searchString = args1.slice(1).join(' ');
    const url = args1[1] ? args1[1].replace(/<(.+)>/g, '$1') : '';

  const serverQueue = queue.get(message.guild.id);
    let o = message.mentions.users.first() ? message.mentions.users.first().username : message.author.username;
    let fotinha = message.mentions.users.first() ? message.mentions.users.first().avatarURL : message.author.avatarURL
    const voiceChannel = message.member.voice.channel;
  
    if (voiceChannel.id !== "516063964610822144") {
        message.channel.send("Solo puedes escuchar musica en el canal <#516063964610822144>")
      return;
    }
    if (!voiceChannel) return message.channel.send('Lo siento, pero usted necesita estar en un canal de voz para tocar la música!');
    if (searchString < 1) return message.reply("Usted no ha colocado el nombre de la canción o un url.");

    const permissions = voiceChannel.permissionsFor(music.user);
    if (!permissions.has('CONNECT')) {
        return message.channel.send('No puedo conectarme a su canal de voz, asegúrese de que tengo los permisos adecuados!');
    }
    if (!permissions.has('SPEAK')) {
        return message.channel.send('No puedo hablar en este canal de voz, asegúrese de que tengo los permisos adecuados!');
    }

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
        const playlist = await youtube.getPlaylist(url);
        const videos = await playlist.getVideos();
        for (const video of Object.values(videos)) {
            const video2 = await youtube.getVideoByID(video.id); 
            await handleVideo(video2, message, voiceChannel, true); 
        }
        return message.channel.send(`**${playlist.title}** se ha agregado a la lista por  ${message.author.username} `);
    } else {
        try {
            var video = await youtube.getVideo(url);
        } catch (error) {
            try {
                var videos = await youtube.searchVideos(searchString, 10);
                let index = 0;


                const embed = new Discord.MessageEmbed()
                    .setTitle("<:icon_yt:441980272267886592> Seleccione una canción <:icon_yt:441980272267886592>")
                    .setDescription(videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n'))
                    .setFooter("Define un valor para seleccionar la música entre 1 a 10!")
                    .setColor(0x36393e)

                let msgtoDelete = await message.channel.send({
                    embed: embed
                });
                // eslint-disable-next-line max-depth
                try {
                    var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11 || message2.content == "cancel", {
                        max: 1,
                        time: 20000,
                        errors: ['time']
                    });
                    msgtoDelete.delete();
                } catch (err) {
                    console.error(err);
       
                    const noPick = new Discord.MessageEmbed()
                        .setColor(0x36393e)
                        .setDescription("El tiempo ha caducado o el archivo no es válido! `Cancelando la selección de música.`")
                    message.channel.send({
                        embed: noPick
                    });
                    msgtoDelete.delete()
                    return;
                 
                }
                if(response.first().content == "cancel") {
                            const cancelPick = new Discord.MessageEmbed()
                        .setColor(0x36393e)
                        .setDescription("Se ha pedido cancelar. `Cancelando la selección de música.`")
                    message.channel.send({
                        embed: cancelPick
                    });
                    msgtoDelete.delete()
                    return;
                } 
                const videoIndex = parseInt(response.first().content);
                var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
            } catch (err) {
                console.error(err);
                return message.channel.send('🆘 No puede obtener ningún resultado.');
            }
        }
        return handleVideo(video, message, voiceChannel);
    }

    // Time for the functions

    async function handleVideo(video, message, voiceChannel, playlist = false) {

        const serverQueue = queue.get(message.guild.id);
        console.log(video);

        const song = {
            id: video.id,
            title: video.title,
            url: `https://www.youtube.com/watch?v=${video.id}`,
            durationh: video.duration.hours,
            durationm: video.duration.minutes,
            durations: video.duration.seconds,
            thumbnail: video.thumbnails.medium.url,
            request: message.author.username
        };
        if (!serverQueue) {
            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                voteSkip: [],
                songs: [],
                volume: 5,
                playing: true
            };

            queue.set(message.guild.id, queueConstruct);

            queueConstruct.songs.push(song);

            try {
                var connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                play(message.guild, queueConstruct.songs[0]);
            } catch (error) {
                console.error(`I could not join the voice channel: ${error}`);
                queue.delete(message.guild.id);
                return message.channel.send(`Eu não pude entrar no canal de voz: ${error}`);
            }
        } else {
            fetchVideoInfo(`${video.id}`).then(function(v) {

                serverQueue.songs.push(song);
                console.log(serverQueue.songs);
                if (playlist) return undefined;

                else return message.channel.send({
                    embed: {
                        color: 0x36393e,
                        description: `** [${v.title}](${v.url}) ** fue añanida por **${message.author.username} **`,
                        "thumbnail": {
                            "url": v.thumbnail
                        },
                    }
                })
            })

        }
        return undefined;


    }

    //funciones archivo principal 
    function play(guild, song) {
        const serverQueue = queue.get(guild.id);

        if (!song) {
            serverQueue.voiceChannel.leave();
            queue.delete(guild.id);
            return;
        }
        console.log(serverQueue.songs);

        const dispatcher = serverQueue.connection.play(yt(song.url))
            .on('end', reason => {
                if (reason === 'Stream is not generating quickly enough.') console.log('Queue ended, leaving voice channel!');
                else console.log('Queue ended, leaving voice channel!');
                serverQueue.songs.shift();
                setTimeout(() => {
                    play(guild, serverQueue.songs[0]);
                }, 250);
            })
            .on('error', error => console.error(error));
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

        //Modified playing messages that give you the song duration!
        fetchVideoInfo(`${song.id}`).then(function(v) {

            let durations = song.durations - 1
            var secondslength = Math.log(durations) * Math.LOG10E + 1 | 0;
            var mlength = Math.log(song.durationm) * Math.LOG10E + 1 | 0;
            if (song.durationh !== 0) {
                if (secondslength == 1 || secondslength == 0) {
                    if (mlength == 1 || mlength == 0) {
                        return serverQueue.textChannel.send(`<a:som:441980552967487498> Tocando: **[${song.title}](https://www.youtube.com/watch?v=${video.id})** (${song.durationh}:0${song.durationm}:0${durations})`);
                    }
                }
            }
            if (song.durationh !== 0) {
                if (secondslength == 1 || secondslength == 0) {
                    if (mlength !== 1 || mlength !== 0) {
                        const embed2 = new Discord.MessageEmbed()

                            .setAuthor(o, fotinha)
                            .setDescription(`<:icon_yt:441980272267886592> [${v.title}](${v.url})`)
                            .addField('Duración', "00:00/" + `${song.durationm}:${durations}`, true)
                            .addField('Vistas:', Number(v.views).toLocaleString(), true)
                            .addField('Likes', Number(v.likeCount).toLocaleString(), true)
                            .addField('Dislikes', Number(v.dislikeCount).toLocaleString(), true)
                            .addField("Comentarios:", Number(v.commentCount).toLocaleString(), true)
                            .addField("Request by:", serverQueue.songs[0].request, true)
                            .setThumbnail(v.thumbnailUrl)
                            .setTimestamp()
                            .setFooter(message.guild.name, message.guild.iconURL)
                            .setColor(0x36393e);

                        return serverQueue.textChannel.send(embed2);
                    }
                }
            };
            if (song.durationh !== 0) {
                if (mlength == 1 || mlength == 0) {
                    if (secondslength !== 1 || secondslength !== 0) {
                        const embed3 = new Discord.MessageEmbed()

                            .setAuthor(o, fotinha)
                            .setDescription(`<:icon_yt:441980272267886592> [${v.title}](${v.url})`)
                            .addField('Duración', "00:00/" + `${song.durationm}:${durations}`, true)
                            .addField('Vistas:', Number(v.views).toLocaleString(), true)
                            .addField('Likes', Number(v.likeCount).toLocaleString(), true)
                            .addField('Dislikes', Number(v.dislikeCount).toLocaleString(), true)
                            .addField("Comentarios:", Number(v.commentCount).toLocaleString(), true)
                            .addField("Request by:", serverQueue.songs[0].request, true)
                            .setThumbnail(v.thumbnailUrl)
                            .setTimestamp()
                            .setFooter(message.guild.name, message.guild.iconURL)
                            .setColor(0x36393e)

                        return serverQueue.textChannel.send(embed3);;
                    }
                }
            }
            if (song.durationh !== 0) {
                if (mlength !== 1 || mlength !== 0) {
                    if (secondslength !== 1 || secondslength !== 0) {
                        const embed4 = new Discord.MessageEmbed()

                            .setAuthor(o, fotinha)
                            .setDescription(`<:icon_yt:441980272267886592> [${v.title}](${v.url})`)
                            .addField('Duración', "00:00/" + `${song.durationm}:${durations}`, true)
                            .addField('Vistas:', Number(v.views).toLocaleString(), true)
                            .addField('Likes:', Number(v.likeCount).toLocaleString(), true)
                            .addField('Dislikes:', Number(v.dislikeCount).toLocaleString(), true)
                            .addField("Comentarios:", Number(v.commentCount).toLocaleString(), true)
                            .addField("Request by:", serverQueue.songs[0].request, true)
                            .setThumbnail(v.thumbnailUrl)
                            .setTimestamp()
                            .setFooter(message.guild.name, message.guild.iconURL)
                            .setColor(0x36393e)

                        return serverQueue.textChannel.send(embed4);
                    }
                }
            }
            if (song.durationh == 0 && song.durationm !== 0) {
                if (secondslength == 1 || secondslength == 0) {
                    const embed5 = new Discord.MessageEmbed()

                        .setAuthor(o, fotinha)
                        .setDescription(`<:icon_yt:441980272267886592> [${v.title}](${v.url})`)
                        .addField('Duración', "00:00/" + `${song.durationm}:${durations}`, true)
                        .addField('Vistas:', Number(v.views).toLocaleString(), true)
                        .addField('Likes:', Number(v.likeCount).toLocaleString(), true)
                        .addField('Dislikes', Number(v.dislikeCount).toLocaleString(), true)
                        .addField("Comentarios:", Number(v.commentCount).toLocaleString(), true)
                        .addField("Request by:", serverQueue.songs[0].request, true)
                        .setThumbnail(v.thumbnailUrl)
                        .setTimestamp()
                        .setFooter(message.guild.name, message.guild.iconURL)
                        .setColor(0x36393e)

                    return serverQueue.textChannel.send(embed5);
                }
            }
            if (song.durationh == 0 && song.durationm !== 0) {
                if (secondslength !== 1 || secondslength !== 0) {
                    const embed6 = new Discord.MessageEmbed()

                        .setAuthor(o, fotinha)
                        .setDescription(`<:icon_yt:441980272267886592> [${v.title}](${v.url})`)
                        .addField('Duración', "00:00/" + `${song.durationm}:${durations}`, true)
                        .addField('Vistas:', Number(v.views).toLocaleString(), true)
                        .addField('Likes:', Number(v.likeCount).toLocaleString(), true)
                        .addField('Dislikes', Number(v.dislikeCount).toLocaleString(), true)
                        .addField("Comentarios:", Number(v.commentCount).toLocaleString(), true)
                        .addField("Request by:", serverQueue.songs[0].request, true)
                        .setThumbnail(v.thumbnailUrl)
                        .setTimestamp()
                        .setFooter(message.guild.name, message.guild.iconURL)
                        .setColor(0x36393e)

                    return serverQueue.textChannel.send(embed6);
                }
            }
            if (song.durationh == 0 && song.durationm == 0 && song.durations !== 0) {
                const embed7 = new Discord.MessageEmbed()

                    .setAuthor(o, fotinha)
                    .setDescription(`<:icon_yt:441980272267886592> [${v.title}](${v.url})`)
                    .addField('Duración', "00:00/" + `${song.durationm}:${durations}`, true)
                    .addField('Vistas:', Number(v.views).toLocaleString(), true)
                    .addField('Likes', Number(v.likeCount).toLocaleString(), true)
                    .addField('Dislikes', Number(v.dislikeCount).toLocaleString(), true)
                    .addField("Comentarios:", Number(v.commentCount).toLocaleString())
                    .addField("Request by:", serverQueue.songs[0].request)
                    .setThumbnail(v.thumbnailUrl)
                    .setTimestamp()
                    .setFooter(message.guild.name, message.guild.iconURL)
                    .setColor(0x36393e)

                return serverQueue.textChannel.send(embed7);
            } else {
                const embed8 = new Discord.MessageEmbed()

                    .setAuthor(o, fotinha)
                    .setDescription(`<:icon_yt:441980272267886592> [${v.title}](${v.url})`)
                    .addField('Duración', "00:00/" + `${song.durationm}:${durations}`, true)
                    .addField('Vistas:', Number(v.views).toLocaleString(), true)
                    .addField('Likes:', Number(v.likeCount).toLocaleString(), true)
                    .addField('Dislikes:', Number(v.dislikeCount).toLocaleString(), true)
                    .addField("Comentarios:", Number(v.commentCount).toLocaleString(), true)
                    .addField("Request by:", serverQueue.songs[0].request, true)
                    .setThumbnail(v.thumbnailUrl)
                    .setTimestamp()
                    .setFooter(message.guild.name, message.guild.iconURL)
                    .setColor(0x36393e)

                return serverQueue.textChannel.send(embed8);

            }
        })
    }

}
exports.config = {
    command: "play",
    aliases: ["play", "add"],
    description: "Beta command",
    usage: "Yu!play [name] || [url] || [playlist-url]",
    category: 'music'
}