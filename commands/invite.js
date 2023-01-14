const messages = require("../utils/messages");
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  name: "invite",
  description: "邀請",
  run: async (client, interaction) => {
    let invite = new EmbedBuilder()
      .setTitle(`${client.user.username} - invite指令`)
      .setDescription("按下下方按鈕即可邀請")
      .setColor("#2f3136")
      .setFooter({ text: `© Faye` });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setEmoji("865572290065072128")
        .setLabel(`Invite ${client.user.username}`)
        .setURL(
          `https://discord.com/api/oauth2/authorize?client_id=1063593762313478154&permissions=1101927566448&scope=applications.commands%20bot`
        )
        .setStyle(ButtonStyle.Link)
    );

    await interaction.reply({
      embeds: [invite],
      components: [row],
      ephemeral: true,
    });
  },
};
