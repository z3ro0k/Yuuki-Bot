const cfg = require("../botconfig.js");
const Discord = require("discord.js");
const key = ('AIzaSyDkW5hixZ8W3nS59aFw52-qk0V_wc00Dis');

const fs = require("fs");
const moment = require('moment');
const yt = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(key);
const opus = require("opusscript");
const gyp = require("node-gyp");

exports.run = async (clint, message, args, queue) => {
    const args1 = message.content.split(' ');
    const searchString = args1.slice(1).join(' ');
    const url = args1[1] ? args1[1].replace(/<(.+)>/g, '$1') : '';
    const serverQueue = queue.get(message.guild.id);

    if (!serverQueue) return message.channel.send("¡No hay nada tocando!");

    var songN
    if(serverQueue >= 1) songN = `[${serverQueue.songs[1].title}](${serverQueue.songs[1].url})\nRequest: ${serverQueue.songs[1].request}`
    else songN = 'Nothing'
  
    const np = new Discord.MessageEmbed()
        .setAuthor(`Reproduciendo ahora`, message.guild.iconURL)
        .addField('Tocando ahora', `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`)
        .addField('Duracion', "00:00/" + `${serverQueue.songs[0].durationh}:${serverQueue.songs[0].durationm}:${serverQueue.songs[0].durations}`, true)
        .addField('Request', serverQueue.songs[0].request, true)
        .addField('Up next:', songN)
        .setImage(serverQueue.songs[0].thumbnail)
        .setColor(0x36393e)

    message.channel.send(np)

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
            thumbnail: video.thumbnails.maxres.url
        };
        if (!serverQueue) {
            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                skippers: [],
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
                return message.channel.send(`I could not join the voice channel: ${error}`);
            }
        } else {
            serverQueue.songs.push(song);
            console.log(serverQueue.songs);
            if (playlist) return undefined;
            else return message.channel.send(`<:trust:436717162632052753> **${song.title}** foi adicionado à fila por ${message.author.username} `);
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

        const dispatcher = serverQueue.connection.playStream(yt(song.url))
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

        serverQueue.textChannel.send(`<a:on:436709383255359498> Começando a tocar: **${song.title}**`);
    }
}

exports.config = {
    command: "np",
    aliases: ["now-playing", "np"],
    description: "Shows the music that is playing",
    usage: "Yu!np",
    category: "music"
}