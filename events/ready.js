const { Client } = require('discord.js');
const { PREFIX } = require('../config.json');
const client = new Client({ disableMentions: 'everyone' });
const rules = require('../structures/reaction-role.json');

module.exports = client => {
  console.log(`${client.user.username} is ready and working on the ${client.guilds.cache.size} with ${client.users.cache.size}!`);
  setInterval(() => {
    client.user.setPresence({
      activity: {
        name: `${PREFIX}help`,
        type: 2
      }
    })
  }, 20000);

  client.reactionRoleRules = {};
  for (const rule of rules) {
    client.reactionRoleRules[rule.messageId] = rule;
    const channel = await client.channels.fetch(rule.channelId);
    const message = await channel.messages.fetch(rule.messageId);

    Object.keys(rule.emojiRoleMap).forEach(
      async (emoji) => await message.react(emoji)
    );
  }
};