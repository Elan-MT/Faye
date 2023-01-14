const fs = require("fs");

const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildMessageReactions,
  ],
});

const config = require("./config.json");
client.config = config;

const synchronizeSlashCommands = require("discord-sync-commands");

// Init discord giveaways
const { GiveawaysManager } = require("discord-giveaways");
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./giveaways.json",
  default: {
    botsCanWin: false,
    embedColor: "#FF0000",
    reaction: "🎉",
    lastChance: {
      enabled: true,
      content: "⚠️ **進入的最後機會 !** ⚠️",
      threshold: 10000,
      embedColor: "#FF0000",
    },
  },
});
// We now have a client.giveawaysManager property to manage our giveaways!

client.giveawaysManager.on(
  "giveawayReactionAdded",
  (giveaway, member, reaction) => {
    console.log(
      `${member.user.tag} 進入Giveaway活動 #${giveaway.messageId} (${reaction.emoji.name})`
    );
  }
);

client.giveawaysManager.on(
  "giveawayReactionRemoved",
  (giveaway, member, reaction) => {
    console.log(
      `${member.user.tag} 太慢了QwQ #${giveaway.messageId} (${reaction.emoji.name})`
    );
  }
);

client.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
  console.log(
    `Giveaway #${giveaway.messageId} 提早結束! Winners: ${winners
      .map((member) => member.user.username)
      .join(", ")}`
  );
});

/* Load all commands */
client.commands = new Discord.Collection();
fs.readdir("./commands/", (_err, files) => {
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, {
      name: commandName,
      ...props,
    });
    console.log(`👌 指令讀取: ${commandName}`);
  });
  synchronizeSlashCommands(
    client,
    client.commands.map((c) => ({
      name: c.name,
      description: c.description,
      options: c.options,
      type: Discord.ApplicationCommandType.ChatInput,
    })),
    {
      debug: true,
    }
  );
});

/* Load all events */
fs.readdir("./events/", (_err, files) => {
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`👌 其他讀取: ${eventName}`);
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

// Login
client.login(config.token);
