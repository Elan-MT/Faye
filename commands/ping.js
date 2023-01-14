const messages = require("../utils/messages");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  description: "延遲",
  run: async (client, interaction) => {
    // If the member doesn't have enough permissions
    if (!interaction.member.permissions.has("SEND_MESSAGES")) {
      return interaction.reply({
        content:
          "其實你知道你沒有開權限給我嗎?",
        ephemeral: true,
      });
    }

    let circles = {
      green: ":green_circle:",
      yellow: ":yellow_circle:",
      red: ":red_circle:",
    };

    let botping = new EmbedBuilder()
      .setTitle(`${client.user.username} - Ping指令`)
      .setColor("2f3136")
      .addFields({
        name: "Bot延遲:",
        value: `${
          client.ws?.ping <= 200
            ? circles.green
            : client.ws?.ping <= 400
            ? circles.yellow
            : circles.red
        } ${client.ws?.ping}ms`,
      })
      .setTimestamp();
    await interaction.reply({ embeds: [botping] });
  },
};
