import { config } from "dotenv";
import mongoose from "mongoose";
import fs from "fs";
import Logger from "./utils/Logger";
require("./functions/handlers/AntiCrash");
import { Client, Collection, GatewayIntentBits, Partials } from "discord.js";
import { loadChannelsCache } from "./utils/chatBotUtils";
config();

(async () => {
  // setting the intents
  const client: any = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildEmojisAndStickers,
      GatewayIntentBits.GuildIntegrations,
      GatewayIntentBits.GuildWebhooks,
      GatewayIntentBits.GuildInvites,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildMessageTyping,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.DirectMessageReactions,
      GatewayIntentBits.DirectMessageTyping,
      GatewayIntentBits.MessageContent,
    ],
    shards: "auto",
    partials: [
      Partials.Message,
      Partials.Channel,
      Partials.GuildMember,
      Partials.Reaction,
      Partials.GuildScheduledEvent,
      Partials.User,
      Partials.ThreadMember,
    ],
  });

  // Initializing the client with an empty array and a new collection
  client.prefix = process.env.PREFIX; // Prefix for the bot
  client.commands = new Collection();
  client.cooldowns = new Collection();
  client.commandArray = [];
  client.log = new Logger();

  // Logging
  client.log.info("Logging in...")

  // looking up all of the folders where the handlers are
  const functionFolders = fs.readdirSync(`${__dirname}/functions`);
  for (const folder of functionFolders) {
    const functionFiles = fs
      .readdirSync(`${__dirname}/functions/${folder}`)
      .filter((file) => file.endsWith(".js"));
    for (const file of functionFiles) {
      require(`${__dirname}/functions/${folder}/${file}`)(client);
    }
  }

  // Starting the handlers and logging into discord with the token
  client.handleEvents();
  client.handleCommands();
  client.login(process.env.TOKEN);

  // Making a connection to the MongoDB servers for database support and synchronization
  (() => {
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.MONGO_URI!).catch();
  })();

  // Loading every AI Talk channel into the cache 
  await loadChannelsCache(client);
})();