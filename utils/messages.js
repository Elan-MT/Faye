const config = require("../config.json");

module.exports = {
  giveaway:
    (config.everyoneMention ? "@everyone\n\n" : "") + "ππ **ζ½ηζ΄»ε** ππ",
  giveawayEnded:
    (config.everyoneMention ? "@everyone\n\n" : "") +
    "ππ **ζ΄»εε·²η΅ζ** ππ",
  inviteToParticipate: "θ«ι»ζ π δΈζΉθ‘¨ζη¬¦θθ¦εε ε₯",
  dropMessage: "ζηΊη¬¬δΈεεεΊεζηδΊΊ π !",
  drawing: "ε©ι€ζι : {timestamp}",
  winMessage: "ζ­ε, {winners}!η²εΎ >> **{this.prize}**!",
  embedFooter: "Faye",
  noWinner: "ζ΄»εε·²εζΆ! η‘δΊΊε ε₯",
  hostedBy: "ε»Ίη«θ : {this.hostedBy}",
  winners: "η§",
  endedAt: "η΅ζζΌ",
};
