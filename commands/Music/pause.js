const Discord = require('discord.js');
const config = require('../../config.js');

module.exports = {
  name: "pause",
  aliases: ["pa"],
  usage: "pause",
  description: "pause the song!",
  
  run: async (client, message, args) => {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();

      const embed1 = new Discord.MessageEmbed()
        .setColor(config.embedcolor)
        .setDescription("⏸ Paused the music for you!")
			return message.channel.send(embed1);
		}

    const embed2 = new Discord.MessageEmbed()
      .setColor(config.embedcolor)
      .setDescription("There is nothing playing!")
		return message.channel.send(embed2);
  }
}