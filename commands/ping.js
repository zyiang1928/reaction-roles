const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
  name: "ping",
  cooldown: 3,
  description: "Ping/pong commands",
  execute(message) {
    message.channel.send('Ping?').then(m => {
      const now = Date.now();
      const embed = new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle("🏓 Ping")
        .addField("Message Latency", `${ms(Date.now() - now)}ms`)
        .addField("Api Latency", `${message.createdTimestamp - m.createdTimestamp}ms`)
        .addField("Web Socket", `${Math.round(message.client.ws.ping)}ms`)
        .setTimestamp();
      m.edit('🏓 Pong', embed).catch(console.error);
    });
  }
};