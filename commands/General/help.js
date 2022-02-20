const config = require('../../config.js');
const Discord = require('discord.js');

module.exports = {
  name: "help",
  aliases: ["помощь"],
  usage: "",
  description: "The main command of the bot",
  
  run: async (client, message, args) => {
    if(!args[0]) {
      let embed = new Discord.MessageEmbed()
        .setTitle(`Miffie's commands list <:beta:945072686244167701>`)
        .setThumbnail(config.avatar)
        .setDescription(`Miffie is a new and modern musical tool for your server. Miffie contains many features that will help you enjoy your favorite music \n_ _`)
        .setColor(config.embedcolor)
        .addFields(
          {
            name: '`m/pause`', 
            value: 'Pauses now-playing song',
            inline: true
          },
          {
            name: '`m/play [Link]`', 
            value: 'Starts a song that you ordered',
            inline: true
          },
          {
            name: '`m/queue`', 
            value: 'Shows a queue of a server',
            inline: true
          },
          {
            name: '`m/resume`', 
            value: 'Resumes a song that you stopped',
            inline: true
          },
          {
            name: '`m/skip`', 
            value: 'Skips now-playing song',
            inline: true
          },
          {
            name: '`m/stop`', 
            value: 'Stops and disconnects bot from your VC',
            inline: true
          },
          {
            name: '`m/volume`', 
            value: `Changes Miffie's volume status`,
            inline: true
          },
          {
            name: '`m/help`', 
            value: 'Shows the list of available commands',
            inline: true
          },
          {
            name: '`m/info`', 
            value: 'See more information about Miffie',
            inline: true
          },
          {
            name: '```                             m/help (command)                             ```', 
            value: 'To see more information about the concrete command',
            inline: true
          }
        )
      message.channel.send(embed)
    }
  }
}