const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const config = require('../../config.js')

module.exports = {
  name: "play",
  description: "To play songs :D",
  usage: "<song_name>",
  aliases: ["p"],

  run: async function(client, message, args) {
    const channel = message.member.voice.channel;
    if (!channel) {
      message.channel.send("<:info22:945071907454210188> ・ You need to be in a voice channel!");
    }

    if (!message.guild.me.hasPermission("CONNECT")) {
      message.channel.send({
        embed: {
          color: config.embedcolor,
          description:
            "<:info22:945071907454210188> ・ I don't have permission to connect your vc!"
        }
      });
    }
    if (!message.guild.me.hasPermission("SPEAK")) {
      message.channel.send({
        embed: {
          color: config.embedcolor,
          description:
            "<:info22:945071907454210188> ・ I need speak permission for playing music!"
        }
      });
    }
    var searchString = args.join(" ");
    if (!searchString) {
      message.channel.send("<:info22:945071907454210188> ・ Provide a song name or a link!");
    }

    var serverQueue = message.client.queue.get(message.guild.id);

    var searched = await yts.search(searchString);
    if (searched.videos.length === 0) {
      message.channel.send("<:info22:945071907454210188> ・ I can't find that song!");
    }
    var songInfo = searched.videos[0];

    const song = {
      title: Util.escapeMarkdown(songInfo.title),
      views: String(songInfo.views).padStart(10, " "),
      url: songInfo.url,
      ago: songInfo.ago,
      duration: songInfo.duration.toString(),
      img: songInfo.image,
      req: message.author
    };

    if (serverQueue) {
      serverQueue.songs.push(song);
      let thing = new MessageEmbed()
        .setTitle("Added to a queue <:beta:945072686244167701>")
        .setImage(song.img)
        .setColor(config.embedcolor)
        .addFields(
          {
            name: 'Song title',
            value: `[${song.title}](${song.url})`,
            inline: true
          },
          {
            name: 'Duration',
            value: `${song.duration}`,
            inline: true
          },
          {
            name: 'Requested by',
            value: `${message.author}`,
            inline: true
          }
        )
      return message.channel.send(thing);
    }

    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: channel,
      connection: null,
      songs: [],
      volume: 3.5,
      playing: true
    };
    message.client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    const play = async song => {
      const queue = message.client.queue.get(message.guild.id);
      if (!song) {
         message.client.queue.delete(message.guild.id);
        return;
      }

      const dispatcher = queue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
          queue.songs.shift();
          play(queue.songs[0]);
        })
        .on("error", error => console.error(error));
      dispatcher.setVolumeLogarithmic(queue.volume / 5);
      let thing = new MessageEmbed()
        .setTitle(`Started playing <:beta:945072686244167701>`)
        .addFields(
          {
            name: 'Song title',
            value: `[${song.title}](${song.url})`,
            inline: true
          },
          {
            name: 'Duration',
            value: `${song.duration}`,
            inline: true
          },
          {
            name: 'Requested by',
            value: `${message.author}`,
            inline: true
          }
        )
        .setImage(song.img)
        .setColor(config.embedcolor)
      queue.textChannel.send(thing);
    };

    try {
      const connection = await channel.join();
      queueConstruct.connection = connection;
      channel.guild.voice.setSelfDeaf(true);
      play(queueConstruct.songs[0]);
    } catch (error) {
      console.error(`<:info22:945071907454210188> ・ I could not join the voice channel!`);
      message.client.queue.delete(message.guild.id);
      //await channel.leave();
      return console.log(
        `<:info22:945071907454210188> ・ I could not join the voice channel!`,
        message.channel
      )
    }
  }
}