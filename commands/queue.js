const cfg = require("../botconfig.js");
const Discord = require("discord.js");
const opus = require("opusscript");
const gyp = require("node-gyp");
const key = ('su api');

const fs = require("fs");
const moment = require('moment');
const yt = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(key),
    hastebin = require('hastebin-gen')

exports.run = async (client, message, args, queue) => {

    const args1 = message.content.split(' ');
    const searchString = args1.slice(1).join(' ');
    const url = args1[1] ? args1[1].replace(/<(.+)>/g, '$1') : '';
    const serverQueue = queue.get(message.guild.id);
    let index = 0;
    if (!serverQueue) return message.channel.send('¡No estoy tocando musica! Agregar algunas canciones para tocar usando: A!play `<Música>`');
    const dur = `${serverQueue.songs[0].durationh}:${serverQueue.songs[0].durationm}:${serverQueue.songs[0].durations}`
    const songs = `${serverQueue.songs.map(song => `${song.title} - request by: ${song.request}`).join('\n')}`;

    if (songs.length > 1024 || songs.length > 1024) {
        hastebin(`All queue Songs: \n\n${songs}`, "js").then(r => {
            const queue1024 = new Discord.MessageEmbed()
                .setTitle("Canciones en la cola")
                .setDescription(`[\`Queue List\`](${r})`)
                .addField('Tocando ahora:', serverQueue.songs[0].title + ' - Request: ' + serverQueue.songs[0].request + ' | Duration: ' + dur)
                .setFooter('Yuuki Music beta commands', 'https://cdn.discordapp.com/emojis/414841539978854425.png')
                .setColor(0x36393e)

            return message.channel.send({
                embed: queue1024
            });
        })
    } else {
     var songN
     if(serverQueue !== 1) songN = 'Nothing'
    else songN = `[${serverQueue.songs[1].title}](${serverQueue.songs[1].url})\nRequest: ${serverQueue.songs[1].request}`
       
    const queueInfo = new Discord.MessageEmbed()
    
            .setTitle("Canciones en la cola")
            .setDescription(`${serverQueue.songs.map(song => `[${song.title}](${serverQueue.songs[0].url}) - request by: ${serverQueue.songs[0].request} `).slice(1, 10).join('\n')}`)
            .addField('Tocando ahora:', serverQueue.songs[0].title + ' - Request:' + serverQueue.songs[0].request + ' | Duration: ' + dur)
            .addField('Siguiente canción', songN)
            .setFooter('Yuuki Music beta commands', 'https://cdn.discordapp.com/emojis/414841539978854425.png')
            .setColor(0x36393e)

        return message.channel.send({
            embed: queueInfo
        });
    }
    // > Functions

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
            thumbnail: video.thumbnails.maxres.url
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
                console.error(`No puedo entrar en el canal de voz: ${error}`);
                queue.delete(message.guild.id);
                return message.channel.send(`No puedo entrar en el canal de voz: ${error}`);
            }
        } else {
            serverQueue.songs.push(song);
            console.log(serverQueue.songs);
            if (playlist) return undefined;
            else return message.channel.send(`✅ **${song.title}** se agregó a la fila!`);
        }
        return undefined;
    }

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
                if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
                else console.log(reason);
                serverQueue.songs.shift();
                setTimeout(() => {
                    play(guild, serverQueue.songs[0]);
                }, 250);
            })
            .on('error', error => console.error(error));
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

        serverQueue.textChannel.send(`🎶 Comenzó a tocar: **${song.title}**`);
    }
}

exports.config = {
    command: "queue",
    aliases: ["queue", "list"],
    description: "Shows what music is in the queue",
    usage: "Yu!queue",
    note: "Have to be in a voiceChannel to call this command",
    category: 'music'
}