const Discord = require('discord.js');
const client = new Discord.Client({ autoReconnect: true });

const config = require('./config.js')
const fs = require('fs');

const { Player } = require('discord-player');
global.player = new Player(client, config.opt.discordPlayer);

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.queue = new Map();

const Categories = ["Music", "General"];

Categories.forEach(async function(Category) { //
    fs.readdir(`./commands/${Category}`, async function(error, files) {
      if (error) throw new Error(`Error In Command - Command Handler\n${error}`);
      files.forEach(async function(file) {
        if (!file.endsWith(".js")) throw new Error(`A File Does Not Ends With .js - Command Handler!`);
        let command = require(`./commands/${Category}/${file}`);
   
        if (!command.name || !command.aliases) throw new Error(`No Command Name & Command Aliases In A File - Command Handler!`);
        if (command.name) client.commands.set(command.name, command);
        if (command.aliases) command.aliases.forEach(aliase => client.aliases.set(aliase, command.name));
        if (command.aliases.length === 0) command.aliases = null;
      });
    })
});

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

client.on("message", async message => {
  let Prefix = config.prefix
  if (message.author.bot || !message.guild || message.webhookID) return;

  if (!message.content.startsWith(Prefix)) return;
  let args = message.content.slice(Prefix.length).trim().split(/ +/g);
  let cmd = args.shift().toLowerCase();

  let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  if (!command) return console.log(`No Command Found!`);

  if (command) {
    command.run(client, message, args);
  }
});


client.on("ready", () => {
  console.log(`Logged to the client ${client.user.username}\n-> Ready on ${client.guilds.cache.size} servers for a total of ${client.users.cache.size} users`)
  
  client.user.setActivity(`Beta v0.1.0 | ${client.guilds.cache.size} guilds`, {
    type: "STREAMING",
    url: "https://www.twitch.tv/nateales"
  })
});

client.on("guildCreate", guild => {
  let channelID;
  let channels = guild.channels.cache;

  channelLoop:
  for (let key in channels) {
    let c = channels[key];
    if (c[1].type === "text") {
      channelID = c[0];
      break channelLoop;
    }
  }
  let channel = guild.channels.cache.get(guild.systemChannelID || channelID);
  const miffie = new Discord.MessageEmbed()
    .setColor(config.embedcolor)
    .setTitle('<a:glitcheart:934912286714376232> | Thank you for choosing **Miffie**!')
    .setDescription('⭐ Miffie is a new and modern musical tool for your server. Miffie contains many features that will help you enjoy your favorite music')
    .addField('To list all available bot commands use `m/help`', `[Support Server](https://discord.gg/2VySt2C588) • [VK Page](https://vk.com/nateales) • [Website](https://miffie.natedev.tk) • [GitHub](https://github.com/delicacystudios/miffiev2)`)
    .setThumbnail(config.avatar)

  channel.send(miffie);
});


client.on("message", message => {
    if (message.author.bot) return false;

    if (message.content.includes("@here") || message.content.includes("@everyone")) return false;

    if (message.mentions.has(client.user.id)) {
        const mention = new Discord.MessageEmbed()
          .setTitle('My prefix is `m/`')
          .setColor(config.embedcolor)
        message.channel.send(mention);
    };
});

/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////

var http = require('http');

const PORT=8080; 

fs.readFile('./pages/index.html', function (err, html) {

    if (err) throw err;    

    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(PORT);
});

client.on('ready', () => {
  console.log('Website has been started')
})
////////////

client.login(config.token)