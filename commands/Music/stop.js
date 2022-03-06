const config = require('../../config.js')

module.exports = {
  name: 'stop',
  aliases: ["stp"],
  usage: "",
  description: "Stop the now-playing song",
        
  run: async (client, message, args) => {
    const { channel } = message.member.voice
    
    if (!channel) {
      const embed1 = new Discord.MessageEmbed()
        .setDescription("`<:info22:945071907454210188> ・ You need to be in a voice channel")
        .setColor(config.embedcolor)
      message.channel.send(embed1)
    }
    
    if (message.guild.me.voice.channel !== message.member.voice.channel) {
      const embed2 = new Discord.MessageEmbed()
        .setDescription("`<:info22:945071907454210188> ・ You need to be in the same voice channel")
        .setColor(config.embedcolor)
      return message.channel.send(embed2);
    }
    
    const serverQueue = client.queue.get(message.guild.id);
      try {
        if (serverQueue) {
          serverQueue.songs = [];
          serverQueue.connection.dispatcher.end()
          message.guild.me.voice.channel.leave();
        } else {
          channel.leave();
        }
        
        return message.channel.send({
          embed: {
            description: '<:info22:945071907454210188> ・ Disconnected from VC',
            color: config.embedcolor
          }
        })
      } catch {
          serverQueue.connection.dispatcher.end();
          await channel.leave();
          return message.channel.send("<:info22:945071907454210188> ・ Unknown error");
      }
  }
}