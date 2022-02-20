const Discord = require("discord.js");
const config = require('../../config.js');

module.exports = {
  name: "queue",
  aliases: ["q"],
  usage: "q <song>",
  description: "List of a queue",
  
  run: async (client, message, args) => {
    const embed1 = new Discord.MessageEmbed()
      .setColor(config.embedcolor)
      .setDescription("There is nothing playing.")
    const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send(embed1);
		
    const embed = new Discord.MessageEmbed()
      .setTitle("__**Song queue:**__")
      .setDescription(`${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}`)
      .addFields({
         name: "**Now playing:**",
        value: `${serverQueue.songs[0].title}`,
       })
      .setColor(config.embedcolor)
    return message.channel.send(embed)
  }
}