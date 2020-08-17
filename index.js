/**
 * Module Imports
 **/
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log('Pinging!');
  response.sendStatus(200);
});

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const { Client, Collection } = require('discord.js');
const { join } = require('path');
const { readdirSync } = require('fs');
const { PREFIX, TOKEN } = require('./config.json');

const client = new Client({ disableMentions: 'everyone' });

client.login(TOKEN);
client.commands = new Collection();
client.aliases = new Collection();
client.prefix = PREFIX;
const cooldowns = new Collection();

/**
 * Client Events
 **/
require("./util/eventLoader.js")(client);
client.on("warn", info => console.log(info));
client.on("error", console.error);

/**
 * Import All commands
 **/
const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
};