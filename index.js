const Discord = require('discord.js');
const client = new Discord.Client({ autoReconnect: true, ws: { properties: { $browser: "Discord iOS" }} });

const config = require('./config.js')
const fs = require('fs');


/* Find Commands */

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
    });
});


/* Reads Messages */

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


client.on('ready', () => {
  console.log('Logged in!')
})

client.on("ready", () => {
    client.user.setActivity("Beta 0.0.1", { type: "WATCHING"})
})


////////////
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Website for UptimeRobot is Ready!`));
////////////

client.login(config.token)