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

    if (serverQueue && serverQueue.playing) {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
        let embed = new Discord.MessageEmbed()
            .setDescription('<:paused:436720340379369483> Música pausada!')
            .setColor(0x4959e9)
        return message.channel.send(embed);
    }
    return message.channel.send('No hay música tocando');

    // Time for the functions

    async function handleVideo(video, message, voiceChannel, playlist = false) {
        const serverQueue = queue.get(message.guild.id);
        console.log(video);
        const song = {
            id: video.id,
            title: video.title,
            url: `https://www.youtube.com/watch?v=${video.id}`
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
                return message.channel.send(`Eu não pude entrar no canal de voz: ${error}`);
            }
        } else {
            serverQueue.songs.push(song);
            console.log(serverQueue.songs);
            if (playlist) return undefined;
            else return message.channel.send(`<:trust:436717162632052753> **${song.title}** foi adicionado à fila!`);
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

        serverQueue.textChannel.send(`<a:on:436709383255359498> Começou a tocar: **${song.title}**`);
    }
}

exports.config = {
    command: "pause",
    aliases: ["pausar", "pause"],
    description: "Pauses the music",
    usage: "Yu!pause",
    category: 'music'
}