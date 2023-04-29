import { Message, Client } from "discord.js";

const data = {
  name: "messageCreate",
  execute: async (message: Message, client: Client) => {
    // If a bot ran a command
    if (message.author.bot) return;

    // If the command was sent in DM
    if (!message.guild) return;
  },
};

export = data;
