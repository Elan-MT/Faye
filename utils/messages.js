const config = require("../config.json");

module.exports = {
  giveaway:
    (config.everyoneMention ? "@everyone\n\n" : "") + "🎉🎉 **抽獎活動** 🎉🎉",
  giveawayEnded:
    (config.everyoneMention ? "@everyone\n\n" : "") +
    "🎉🎉 **活動已結束** 🎉🎉",
  inviteToParticipate: "請點擊 🎉 下方表情符號視同加入",
  dropMessage: "成為第一個做出反應的人 🎉 !",
  drawing: "剩餘時間 : {timestamp}",
  winMessage: "恭喜, {winners}!獲得 >> **{this.prize}**!",
  embedFooter: "Faye",
  noWinner: "活動已取消! 無人加入",
  hostedBy: "建立者 : {this.hostedBy}",
  winners: "秒",
  endedAt: "結束於",
};
