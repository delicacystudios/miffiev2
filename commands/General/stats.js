const { MessageEmbed } = require("discord.js");
require("moment-duration-format");
const cpuStat = require("cpu-stat");
const moment = require("moment");
const config = require('../../config.js')

module.exports = {
  name: "stats",
  description: "Get information about the bot",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["about", "ping", "info"],

  run: async (client, message) => {
    const { version } = require("discord.js");
    cpuStat.usagePercent(async function (err, percent, seconds) {
      if (err) {
        return console.log(err);
      }
      const duration = moment
        .duration(message.client.uptime)
        .format(" D[d], H[h], m[m]");

      const embed = new MessageEmbed();
      embed.setColor(config.embedcolor);
      embed.setTitle(`Miffie's Stats <:beta:945072686244167701>`);
      embed.setThumbnail(config.avatar)
      embed.addFields(
        {
          name: "<:booster:945070411647975465> Ping",
          value: `┕\`${Math.round(client.ws.ping)}ms\``,
          inline: true,
        },
        {
          name: "<:website:945070222912651325> Uptime",
          value: `┕\`${duration}\``,
          inline: true,
        },
        {
          name: "<:emoji:945070522243379210> Memory",
          value: `┕\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
            2
          )}mb\``,
          inline: true,
        }
      );

      embed.addFields(
        {
          name: "<:servers:945070013461700658> Servers",
          value: `┕\`${client.guilds.cache.size}\``,
          inline: true,
        },
        {
          name: "<:users:945070112195624981> Users",
          value: `┕\`${client.users.cache.size}\``,
          inline: true,
        },
        {
          name: "<:uptime:945070288993943612> API Latency",
          value: `┕\`${message.client.ws.ping}ms\``,
          inline: true,
        }
      );
      
      embed.addFields(
        {
          name: "<:plus:945070174715936879> Version",
          value: `┕\`v${require("../../package.json").version}\``,
          inline: true,
        },
        {
          name: "<:discord:945070458552844380> Discord.js",
          value: `┕\`v${version}\``,
          inline: true,
        },
        {
          name: "<:channel2:945070361635074068> Node",
          value: `┕\`${process.version}\``,
          inline: true,
        }
      );

      return message.channel.send(embed);
    })
  }
};