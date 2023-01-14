const os = require("os");
const { EmbedBuilder } = require("discord.js");
const feroms = require("fero-ms");

module.exports = {
  name: "stats",
  description: "Bot狀態",
  run: async (client, interaction) => {
    let uptime = client.uptime;
    let shortUptime = feroms.ms(uptime);
    let model = os.cpus()[0].model;
    let cores = os.cpus().length;
    let platform = os.platform();
    let nodejs = process.version;
    let djs = require("discord.js").version;
    let botversion = require("../package.json").version;
    let server = client.guilds.cache.size;
    let user = client.users.cache.size;
    let channel = client.channels.cache.size;

    let statsembed = new EmbedBuilder()
      .addFields(
        {
          name: "我活了多久@@?",
          value: `\`\`\`${shortUptime}\`\`\``,
        },
        {
          name: "使用我的群組數量",
          value: `\`${server}\``,
          inline: true,
        },
        {
          name: "使用我的用戶數量",
          value: `\`${user}\``,
          inline: true,
        },
        {
          name: "使用我的頻道數量",
          value: `\`${channel}\``,
          inline: true,
        },
        {
          name: "Bot版本",
          value: `\`v${botversion}\``,
          inline: true,
        },
        {
          name: "數位",
          value: `\`${os.arch()}\``,
          inline: true,
        },
        {
          name: "系統",
          value: `\`${platform}\``,
          inline: true,
        },
        {
          name: "核心",
          value: `\`${cores}\``,
          inline: true,
        },
        {
          name: "Discord.js版本",
          value: `\`v${djs}\``,
          inline: true,
        },
        {
          name: "Node.js版本",
          value: `\`${nodejs}\``,
          inline: true,
        },
        {
          name: "記憶體",
          value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
            2
          )}MB/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``,
          inline: true,
        },
        {
          name: "CPU名稱",
          value: `\`\`\`${model}\`\`\``,
        }
      )
      .setTimestamp();
    await interaction.reply({ embeds: [statsembed] });
  },
};
