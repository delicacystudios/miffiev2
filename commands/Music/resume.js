const Discord = require('discord.js');
const config = require('../../config.js');

module.exports = {
  name: "resume",
  aliases: ["r"],
  usage: "resume",
  description: "resume the song!",
  
  run: async (client, message, args) => {
    const embed1 = new Discord.MessageEmbed()
      .setColor(config.embedcolor)
      .setAuthor("<:info22:945071907454210188> ・ ▶ Resumed")
		const serverQueue = message.client.queue.get(message.guild.id);
		
    if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.send(embed1);
		}

    const embed2 = new Discord.MessageEmbed()
      .setColor(config.embedcolor)
      .setDescription("<:info22:945071907454210188> ・ There is nothing playing")
		return message.channel.send(embed2);
  }
}