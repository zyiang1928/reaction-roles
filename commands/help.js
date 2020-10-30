const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "help",
  cooldown: 3,
  aliases: ["h"],
  description: "Display all commands",
  execute(message) {
    let commands = message.client.commands.array();

    let embed = new MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setThumbnail(message.client.user.displayAvatarURL())
      .setAuthor("Help Commands", message.client.user.displayAvatarURL())
      .setFooter(message.client.user.username)
      .setTimestamp();

    commands.forEach((cmd) => {
      embed.addField(
        `${message.client.prefix}${cmd.name} (${cmd.aliases ? cmd.aliases : "None Aliases"})`,
        `${cmd.description}`
      );
      return message.channel.send(embed).catch(console.error);
    });
  }
};
