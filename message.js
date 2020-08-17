const Discord = require('discord.js');
const { PREFIX } = require('../config.json');

module.exports = message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.channel.type === "dm") return;

  let msg = message.content.toLowerCase();
  let sender = message.author;
  let client = message.client;

  if (sender.bot) return;
  if (msg.includes(`<@${client.user.id}>`) && msg.includes(`<@!${client.user.id}>`)) {
    return message.reply(`My current prefix is ${PREFIX}, Please type ${PREFIX}help jump to list all my commands`);
  };

  if (msg.startsWith(PREFIX)) {
    let args = message.content.slice(PREFIX.length).trim().split(" ");
    let commandName = args.shift().toLowerCase();

    let command =
      client.commands.get(commandName) ||
      client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 1) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => {
      timestamps.delete(message.author.id, cooldownAmount);
    });

    try {
      command.execute(message, args);
    } catch (error) {
      console.error(error);
    } finally {
      console.log(`Commands: ${PREFIX}${command.name} - Guild: ${message.guild.name} Id: ${message.guild.id}`);
    }
  }
};