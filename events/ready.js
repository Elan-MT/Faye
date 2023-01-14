const { ActivityType } = require("discord.js");

module.exports = (client) => {
  console.log(
    `Faye 狀態\n已加入${client.channels.cache.size}個頻道 \n ${client.guilds.cache.size}個伺服器 \n ${client.users.cache.size}用戶使用`
  );

  const activities = [
    `總共有${client.guilds.cache.size}個群組正在使用`,
    "指令可查看/help",
    `總共有${client.users.cache.size}個用戶正在使用`,
    `${
      client.giveawaysManager.giveaways.filter((g) => !g.ended).length
    } 個群組正在舉行抽獎活動`,
  ];

  setInterval(() => {
    let activity = activities[Math.floor(Math.random() * activities.length)];
    client.user.setActivity(activity, { type: ActivityType.Watching });
  }, 20000);
};
