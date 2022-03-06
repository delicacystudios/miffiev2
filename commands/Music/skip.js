const Discord = require("discord.js");
const config = require('../../config.js');

module.exports = {
  name: "skip",
  aliases: ["sk"],
  usage: "sk",
  description: "skip the song!",
  
  run: async (client, message, args) => {
	  const { channel } = message.member.voice;
    const embed1 = new Discord.MessageEmbed()
      .setDescription("<:info22:945071907454210188> ・ You need to be in a voice channel")
      .setColor(config.embedcolor)
		if (!channel) return message.channel.send(embed1);
		const serverQueue = message.client.queue.get(message.guild.id);
    
    const embed2 = new Discord.MessageEmbed()
      .setDescription('<:info22:945071907454210188> ・ There is nothing playing that I could skip for you')
      .setColor(config.embedcolor)
		if (!serverQueue) return message.channel.send(embed2);
		serverQueue.connection.dispatcher.end('Skip command has been used!');
  }
}