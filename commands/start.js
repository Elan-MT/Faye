const Discord = require("discord.js");
const ms = require("ms");
const messages = require("../utils/messages");

module.exports = {
  description: "建立一個抽獎活動",

  options: [
    {
      name: "duration",
      description:
        "設定時間多久? 示範圖: 1m, 1h, 1d",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "winners",
      description: "獲勝者幾人",
      type: Discord.ApplicationCommandOptionType.Integer,
      required: true,
    },
    {
      name: "prize",
      description: "標題",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "channel",
      description: "頻道",
      type: Discord.ApplicationCommandOptionType.Channel,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    // If the member doesn't have enough permissions
    if (
      !interaction.member.permissions.has("MANAGE_MESSAGES") &&
      !interaction.member.roles.cache.some((r) => r.name === "Giveaways")
    ) {
      return interaction.reply({
        content:
          "其實你知道你沒有開權限給我嗎?",
        ephemeral: true,
      });
    }

    const giveawayChannel = interaction.options.getChannel("channel");
    const giveawayDuration = interaction.options.getString("duration");
    const giveawayWinnerCount = interaction.options.getInteger("winners");
    const giveawayPrize = interaction.options.getString("prize");

    if (!giveawayChannel.isTextBased()) {
      return interaction.reply({
        content: "頻道必須是Text頻道",
        ephemeral: true,
      });
    }

    // Start the giveaway
    client.giveawaysManager.start(giveawayChannel, {
      // The giveaway duration
      duration: ms(giveawayDuration),
      // The giveaway prize
      prize: giveawayPrize,
      // The giveaway winner count
      winnerCount: giveawayWinnerCount,
      // Who hosts this giveaway
      hostedBy: client.config.hostedBy ? interaction.user : null,
      // Messages
      messages,
    });

    interaction.reply(`已建立在 >> ${giveawayChannel}!`);
  },
};
