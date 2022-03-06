const Discord = require('discord.js');
const config = require('../../config.js')

module.exports = {
  name: "volume",
  aliases: ["v"],
  usage: "v <number>",
  description: "change the volume",
  
  run: async (client, message, args) => {
    const embed1 = new Discord.MessageEmbed()
      .setColor(config.embedcolor)
      .setDescription(`<:info22:945071907454210188> ・ You need to be in a voice channel`)
		const { channel } = message.member.voice;
    
		if (!channel) return message.channel.send(embed1);
		const serverQueue = message.client.queue.get(message.guild.id);
    
    const embed2 = new Discord.MessageEmbed()
      .setColor(config.embedcolor)
      .setDescription("<:info22:945071907454210188> ・ There is nothing playing right now")
		if (!serverQueue) return message.channel.send(embed2);
    
    const embed3 = new Discord.MessageEmbed()
      .setDescription(`<:info22:945071907454210188> ・ The current volume is: **${serverQueue.volume}**`)
		if (!args[0]) return message.channel.send(embed3);
		serverQueue.volume = args[0];
    
    if (parseInt(args[0], 10) > 10 || typeof(parseInt(args[0], 10)) !== "number") return message.channel.send(embed3) 
    const embed4 = new Discord.MessageEmbed()
      .setColor(config.embedcolor)
      .setDescription(`<:info22:945071907454210188> ・ I set the volume to: **${args[0]}**`)
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
		return message.channel.send(embed4);
  }
}