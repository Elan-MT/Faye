const messages = require("../utils/messages");
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  name: "help",
  description: "指令資訊",
  run: async (client, interaction) => {
    let helpembed = new EmbedBuilder();
    helpembed.setAuthor({ name: `${client.user.username} - help指令` });
    helpembed.setColor("#2f3136");
    helpembed.setThumbnail(
      "https://cdn.discordapp.com/attachments/833753190859407411/910562424258715738/DisGiveaway-01-01.png"
    );
    client.commands.map((cmd) => {
      helpembed.addFields({
        name: `\`${cmd.name}\``,
        value: `${cmd.description}`,
      });
    });
    helpembed.setTimestamp();
    helpembed.setFooter({ text: `© Faye` });

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
      embeds: [helpembed],
      components: [row],
      ephemeral: true,
    });
  },
};
